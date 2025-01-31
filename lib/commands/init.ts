import { isAfter } from 'date-fns'
import { backend } from '../../backend'
import { questList } from '../data/overview'
import { questData } from '../data/quests'
import { submit_event } from '../helper/submit'
import { Core } from '../state/core'
import { loadLegacyProject, loadQuest } from './load'
import { switchToPage } from './page'
import { getAppearance } from '../storage/storage'
import { isSetName } from '../helper/events'
import { mapData } from '../data/map'

export async function initClient(core: Core) {
  const parameterList = new URLSearchParams(window.location.search)

  const id = parameterList.get('id')

  if (id) {
    await loadLegacyProject(core, id)
    switchToPage(core, 'imported')
    return
  }

  const appearance = getAppearance()
  if (appearance) {
    core.mutateWs((ws) => {
      ws.appearance = appearance
    })
  }

  const hash = window.location.hash.toUpperCase()

  if (hash == '#ANALYZE' /* && window.location.hostname == 'localhost'*/) {
    try {
      const cutoff = new Date('2023-11-22')

      const storedPW = sessionStorage.getItem('karol_stored_pw')
      const password = storedPW ?? prompt('Zugangspasswort:') ?? ''
      const response = await fetch(backend.analyzeEndpoint, {
        method: 'POST',
        body: new URLSearchParams({
          password,
          ts: cutoff.getTime().toString(),
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      const data = (await response.json()) as {
        userId: string
        event: string
        createdAt: string
      }[]
      const responseSol = await fetch(backend.solutionAnalyzeEndpoint, {
        method: 'POST',
        body: new URLSearchParams({
          password,
          ts: cutoff.getTime().toString(),
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      const dataSol = (await responseSol.json()) as {
        questId: number
        solution: string
        createdAt: string
        userId: string
      }[]

      if (data.length > 0) {
        sessionStorage.setItem('karol_stored_pw', password)
      }

      core.mutateWs((ws) => {
        ws.analyze.cutoff = cutoff.toLocaleString()
      })

      // pass 1: collect some basic information and build user data
      const userRawData: {
        [userId: string]: {
          quests: { [id: string]: { solvedAt: number } }
          nameSetAt: number
        }
      } = {}
      const dedup: { [key: string]: boolean } = {}
      core.mutateWs((ws) => {
        for (const entry of data) {
          if (isAfter(new Date(entry.createdAt), cutoff)) {
            const ts = new Date(entry.createdAt).getTime()
            const key = entry.userId + entry.event
            if (dedup[key]) {
              continue
            } else {
              dedup[key] = true
            }

            ws.analyze.count++

            if (entry.event == 'show_editor') {
              ws.analyze.showEditor++
              continue
            }
            if (entry.event == 'load_id_Z9xO1rVGj') {
              ws.analyze.showPlayground++
              continue
            }
            if (entry.event == 'show_demo') {
              ws.analyze.showDemo++
              continue
            }
            if (entry.event == 'show_structogram') {
              ws.analyze.showStructogram++
              continue
            }
            if (entry.event == 'persist_progress') {
              ws.analyze.usePersist++
              continue
            }
            if (entry.event == 'use_java') {
              ws.analyze.useJava++
              continue
            }
            if (entry.event == 'use_python') {
              ws.analyze.usePython++
              continue
            }
            if (entry.event == 'play_snake') {
              ws.analyze.playSnake++
              continue
            }
            const publish = /publish_custom_quest_(.+)/.exec(entry.event)
            if (publish) {
              ws.analyze.published.push({
                id: publish[1],
                date: new Date(entry.createdAt).toLocaleString(),
              })
              continue
            }
            const startCustom = /load_custom_quest_(.+)/.exec(entry.event)
            if (startCustom) {
              const id = startCustom[1]
              if (!ws.analyze.customQuests[id]) {
                ws.analyze.customQuests[id] = { start: 0, complete: 0 }
              }
              ws.analyze.customQuests[id].start++
              continue
            }
            const completeCustom = /custom_quest_complete_(.+)/.exec(
              entry.event
            )
            if (completeCustom) {
              const id = completeCustom[1]
              if (!ws.analyze.customQuests[id]) {
                ws.analyze.customQuests[id] = { start: 0, complete: 0 }
              }
              ws.analyze.customQuests[id].complete++
              continue
            }
            const loadLegacy = /load_id_(.+)/.exec(entry.event)
            if (loadLegacy) {
              const id = loadLegacy[1]
              if (!ws.analyze.legacy[id]) {
                ws.analyze.legacy[id] = { count: 0 }
              }
              ws.analyze.legacy[id].count++
              continue
            }

            const completeQuest = /^quest_complete_(.+)/.exec(entry.event)

            if (completeQuest) {
              const id = completeQuest[1]
              if (!userRawData[entry.userId]) {
                userRawData[entry.userId] = { quests: {}, nameSetAt: -1 }
              }

              if (!userRawData[entry.userId].quests[id]) {
                userRawData[entry.userId].quests[id] = { solvedAt: ts }
              }
              if (ts < userRawData[entry.userId].quests[id].solvedAt) {
                userRawData[entry.userId].quests[id].solvedAt = ts
              }
            }

            if (isSetName(entry.event)) {
              if (!userRawData[entry.userId]) {
                userRawData[entry.userId] = { quests: {}, nameSetAt: -1 }
              }
              userRawData[entry.userId].nameSetAt = ts
            }

            const appearance = /^select_appearance_(.+)/.exec(entry.event)

            if (appearance) {
              const id = appearance[1]
              if (!ws.analyze.appearance[id]) {
                ws.analyze.appearance[id] = { count: 0 }
              }
              ws.analyze.appearance[id].count++
              continue
            }

            const rating = /^rate_quest_([\d]+)_(.+)/.exec(entry.event)

            if (rating) {
              const id = parseInt(rating[1])
              const value = parseInt(rating[2])

              const entry = (ws.analyze.ratings[id] = ws.analyze.ratings[
                id
              ] ?? { average: 0, count: 0, values: [] })
              const previousSum = entry.average * entry.count
              entry.average =
                (entry.average * entry.count + value) / (entry.count + 1)
              entry.count++
              entry.values.push(value)
            }
          }
        }
      })

      // prepare: populate quest data and generate deps
      core.mutateWs((ws) => {
        for (const index in questData) {
          ws.analyze.quests[index] = { reachable: 0, complete: 0 }
        }
      })

      const deps = mapData

      // pass 2: collect relevant information for quests
      core.mutateWs((ws) => {
        for (const userId in userRawData) {
          const data = userRawData[userId]
          if (!data.quests[1]) {
            continue
          }
          if (data.quests[1].solvedAt < cutoff.getTime()) {
            continue
          }
          const times = Object.values(data.quests).map((q) => q.solvedAt)
          if (data.nameSetAt > 0) {
            times.push(data.nameSetAt)
          }
          const max = Math.max(...times)
          const min = Math.min(...times)
          ws.analyze.userTimes.push(max - min)
          // these are relevant users
          for (const index in questData) {
            if (!questList.includes(parseInt(index))) {
              continue
            }
            if (data.quests[index]) ws.analyze.quests[index].complete++
            if (deps[index].deps.some((i) => data.quests[i] !== undefined)) {
              ws.analyze.quests[index].reachable++
            }
          }
        }
        ws.analyze.userTimes.sort((a, b) => b - a)
      })

      // pass 3: process solution data
      core.mutateWs((ws) => {
        for (const entry of dataSol) {
          if (isAfter(new Date(entry.createdAt), cutoff)) {
            if (!ws.analyze.solutions[entry.userId]) {
              ws.analyze.solutions[entry.userId] = []
            }
            let currentSolution = entry.solution.trim()
            let isCode = false
            if (currentSolution.startsWith('//code-tab\n')) {
              currentSolution = currentSolution
                .replace('//code-tab\n', '')
                .trim()
              isCode = true
            }
            let isAttempt = false
            if (currentSolution.endsWith('// attempt //')) {
              currentSolution = currentSolution
                .replace('// attempt //', '')
                .trim()
              isAttempt = true
            }
            /*const hasEntry = ws.analyze.solutions[entry.questId].find(
              (x) => x.solution == currentSolution && x.isCode == isCode
            )
            if (hasEntry) {
              hasEntry.count++
            } else {*/
            ws.analyze.solutions[entry.userId].push({
              solution: currentSolution,
              isCode,
              isAttempt,
              createdAt: isAttempt
                ? entry.createdAt
                : new Date(
                    new Date(entry.createdAt).getTime() - 1000
                  ).toISOString(),
            })
            //}
          }
        }
        /*for (const questId in ws.analyze.solutions) {
          ws.analyze.solutions[questId].sort((a, b) =>
            a.count == b.count
              ? a.solution.split('\n').length - b.solution.split('\n').length
              : b.count - a.count
          )
        }*/
      })

      // completely raw user-data
      const userEvents = data.reduce((res, obj) => {
        const key = obj.userId
        const entry = (res[key] = res[key] || { events: [] })
        entry.events.push(obj)
        return res
      }, {} as { [key: string]: { events: (typeof data)[number][] } })
      core.mutateWs((ws) => {
        ws.analyze.userEvents = userEvents
      })
      switchToPage(core, 'analyze')
      return
    } catch (e) {
      console.log(e)
    }
  }

  if (hash == '#EDITOR') {
    switchToPage(core, 'editor')
    return
  }

  if (hash == '#DEMO') {
    submit_event('show_demo', core)
    switchToPage(core, 'demo')
    return
  } else if (hash.length == 5) {
    await loadQuest(core, hash.substring(1))
    switchToPage(core, 'shared')
    return
  }

  switchToPage(core, 'overview')
}
