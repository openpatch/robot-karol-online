import { EditorView } from '@codemirror/view'
import { useEffect, useRef } from 'react'
import {
  faArrowRight,
  faArrowTurnUp,
  faCircleExclamation,
  faInfo,
  faInfoCircle,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { forceLinting } from '@codemirror/lint'

import { setEditable } from '../../lib/codemirror/basicSetup'
import { useCore } from '../../lib/state/core'
import { FaIcon } from '../helper/FaIcon'
import { Editor } from './Editor'
import { textRefreshDone } from '../../lib/commands/json'
import { BlockEditor } from './BlockEditor'

export function EditArea() {
  const core = useCore()

  const codeState = core.ws.ui.state

  const view = useRef<EditorView>()

  core.view = view

  useEffect(() => {
    if (core.ws.ui.needsTextRefresh && view.current) {
      view.current.dispatch({
        changes: {
          from: 0,
          to: view.current.state.doc.length,
          insert: core.ws.code,
        },
      })
      forceLinting(view.current)
      textRefreshDone(core)
    }

    // yeah, I don't know how to do this with react so here is my own logic
    if (!document.getElementById('my-execution-marker')) {
      const gutter = document.getElementsByClassName('my-gutter')[0]
      if (gutter) {
        const innerDiv = document.createElement('div')
        innerDiv.className = `absolute h-5 w-5 text-blue-500 left-3`
        innerDiv.id = 'my-execution-marker'
        innerDiv.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 448 512" aria-hidden="true"' +
          ' focusable="false" class="jsx-151747aa6e04d21e fa-icon"><path fill="currentColor" ' +
          'd="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5' +
          ' 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5' +
          ' 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" class="jsx-151747aa6e04d21e"></path></svg>'
        gutter.appendChild(innerDiv)
      }
    }
    const marker = document.getElementById('my-execution-marker')
    if (marker) {
      marker.style.top = `${4 + (core.ws.ui.gutter - 1) * 22.4}px`
      marker.style.display =
        (codeState == 'running' || core.ws.ui.karolCrashMessage) &&
        core.ws.ui.gutter > 0
          ? 'block'
          : 'none'
    }
  })

  useEffect(() => {
    if (codeState == 'ready' && !core.ws.quest.testerHandler) {
      setEditable(view.current, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeState])

  if (core.ws.settings.mode == 'code') {
    return (
      <div className="h-full flex flex-col overflow-y-auto">
        {renderEditor()}
        {core.ws.ui.state == 'error' && (
          <div className="w-full overflow-auto min-h-[47px] max-h-[200px] flex-grow flex-shrink-0 bg-red-50">
            <div className="flex justify-between mt-[9px]">
              <div className="px-3 pb-1 pt-0">
                <p className="mb-2">
                  <FaIcon
                    icon={faCircleExclamation}
                    className="text-red-600 mr-2"
                  />
                  Beim Einlesen des Programms sind folgende Probleme
                  aufgetreten:
                </p>
                {core.ws.ui.errorMessages.map((err, i) => (
                  <p className="mb-2" key={err + i.toString()}>
                    {err}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return <BlockEditor />

  // TODO for later stage: readd text editor
  function renderEditor() {
    return (
      <div className="flex h-full overflow-y-auto relative flex-shrink">
        <div className="w-full overflow-auto h-full flex">
          <div className="w-full h-full flex flex-col relative">
            <Editor innerRef={view} />
          </div>
        </div>
      </div>
    )
  }
}
