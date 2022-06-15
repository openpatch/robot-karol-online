import { EditorView } from '@codemirror/view'

import { compile } from '../language/compiler'
import { Core } from '../state/core'
import { execPreview, hidePreview } from './preview'
import { patch } from './vm'

export function lint(core: Core, view: EditorView) {
  if (core.ws.ui.state == 'running' || !view) {
    return [] // auto formatting, ignore
  }
  // good place to sync code with state
  const code = view.state.doc.sliceString(0)
  core.mutateWs((state) => {
    state.code = code
  })

  const { warnings, output } = compile(view)
  warnings.sort((a, b) => a.from - b.from)

  if (warnings.length == 0) {
    patch(core, output)
    setTimeout(() => {
      execPreview(core)
    }, 10)
  } else {
    core.mutateWs(({ vm, ui }) => {
      vm.bytecode = undefined
      vm.pc = 0
      ui.state = 'error'
      ui.errorMessages = warnings
        .map(
          (w) => `Zeile ${view.state.doc.lineAt(w.from).number}: ${w.message}`
        )
        .filter(function (item, i, arr) {
          return arr.indexOf(item) == i
        })
      //ui.preview = undefined
    })
  }
  return warnings
}

export function setLoading(core: Core) {
  if (core.ws.ui.state == 'running') {
    return // auto formatting, ignore
  }
  core.mutateWs(({ ui }) => {
    ui.state = 'loading'
  })
}

export function toggleHideKarol(core: Core) {
  if (window.location.hostname === 'localhost' && core.ws.type == 'free') {
    core.mutateWs((ws) => {
      ws.ui.hideKarol = !ws.ui.hideKarol
    })
    if (core.ws.ui.hideKarol) {
      hidePreview(core)
    }
  }
}