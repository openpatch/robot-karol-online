import {
  faArrowDown,
  faArrowUp,
  faExternalLink,
  faGear,
  faListCheck,
  faPencil,
  faPlus,
  faShareNodes,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { createRef, useEffect } from 'react'
import {
  addNewTask,
  deleteTask,
  editWorld,
  moveTaskDown,
  moveTaskUp,
  setTaskTitle,
} from '../lib/commands/editor'

import { showMenu, showQuestOverview } from '../lib/commands/mode'
import {
  openTask,
  setTaskScroll,
  startTesting,
  storeQuestToSession,
} from '../lib/commands/quest'
import { processMiniMarkdown } from '../lib/helper/processMiniMarkdown'
import { useCore } from '../lib/state/core'
import { QuestTask } from '../lib/state/types'
import { FaIcon } from './FaIcon'
import { QuestEditor } from './QuestEditor'
import { View } from './View'

export function Tasks() {
  const core = useCore()

  const taskContainer = createRef<HTMLDivElement>()

  useEffect(() => {
    if (taskContainer.current && core.ws.ui.taskScroll > 0) {
      taskContainer.current.scrollTop = core.ws.ui.taskScroll
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 px-7 flex-shrink-0 flex-grow-0 bg-yellow-100 relative">
        {core.ws.ui.isEditor ? (
          <QuestEditor />
        ) : (
          <>
            <h1 className="mb-2 text-xl font-bold mt-1">
              {core.ws.quest.title}
            </h1>
            {!core.ws.ui.isImportedProject && (
              <div className="mb-4">
                <button
                  className={clsx(
                    'text-blue-500 hover:text-blue-600 hover:underline'
                  )}
                  onClick={() => {
                    storeQuestToSession(core)
                    showQuestOverview(core)
                  }}
                >
                  zurück
                </button>
              </div>
            )}
            <div>{processMiniMarkdown(core.ws.quest.description)}</div>
          </>
        )}
      </div>
      <div
        className="flex-grow flex-shrink overflow-y-auto bg-gray-100"
        ref={taskContainer}
      >
        {core.ws.quest.tasks.map(renderTask)}
      </div>
      <div className="h-10 flex-shrink-0 flex-grow-0 flex bg-gray-100 py-1">
        <div className="flex justify-center relative items-center flex-grow">
          {core.ws.ui.isImportedProject ? (
            <p className="z-10">
              <a
                className="px-2 py-0.5 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white font-bold"
                href={window.location.protocol + '//' + window.location.host}
                target="_blank"
                rel="noreferrer"
              >
                Robot Karol Online öffnen <FaIcon icon={faExternalLink} />
              </a>
            </p>
          ) : core.ws.ui.isEditor ? (
            <p className="w-full ml-4">
              <button
                className="px-2 py-0.5 bg-green-300 hover:bg-green-400 rounded mr-4"
                onClick={() => {
                  addNewTask(core)
                }}
              >
                <FaIcon icon={faPlus} className="mr-2" />
                Auftrag hinzufügen
              </button>
              <button className="px-2 py-0.5 bg-yellow-300 hover:bg-yellow-400 rounded">
                <FaIcon icon={faShareNodes} className="mr-2" />
                Aufgabe freigeben
              </button>
            </p>
          ) : (
            !core.ws.ui.isTesting &&
            !core.ws.ui.isAlreadyCompleted && (
              <p className="z-10">
                <button
                  className="px-2 py-0.5 rounded-lg bg-yellow-300"
                  onClick={() => {
                    startTesting(core)
                  }}
                >
                  <FaIcon icon={faListCheck} className="mx-1" /> Überprüfung
                  starten
                </button>
              </p>
            )
          )}
        </div>
        <div className="flex-grow-0 flex-shrink-0">
          <button
            className="mx-2 mt-1 bg-gray-200 hover:bg-gray-300 px-2 rounded"
            onClick={() => {
              showMenu(core)
            }}
          >
            <FaIcon icon={faGear} className="mr-1" /> Optionen
          </button>
        </div>
      </div>
    </div>
  )

  function renderTask(task: QuestTask, index: number) {
    return (
      <div
        className={clsx(
          'm-3 rounded-xl bg-white flex justify-between',
          !core.ws.ui.isEditor && 'cursor-pointer hover:bg-gray-50'
        )}
        key={index}
        tabIndex={0}
        onClick={() => {
          setTaskScroll(core, taskContainer.current?.scrollTop ?? -1)
          if (core.ws.ui.isEditor) return
          openTask(core, index)
        }}
      >
        <div className="ml-4 mt-6">
          <h2 className="text-lg font-bold">
            {core.ws.ui.isEditor ? (
              <input
                value={task.title}
                className="bg-gray-100"
                onChange={(e) => {
                  setTaskTitle(core, index, e.target.value)
                }}
              />
            ) : (
              task.title
            )}
          </h2>
          {core.ws.ui.isEditor && (
            <>
              <p className="mt-4">
                <button
                  className="rounded px-2 py-0.5 bg-blue-100 hover:bg-blue-200"
                  onClick={() => {
                    editWorld(core, index)
                  }}
                >
                  <FaIcon icon={faPencil} className="mr-2" />
                  Welt bearbeiten
                </button>
              </p>
              <p className="mt-20 text-sm text-gray-700">
                <button
                  className="hover:text-black disabled:text-gray-200"
                  disabled={index == 0}
                  onClick={() => {
                    moveTaskUp(core, index)
                  }}
                >
                  <FaIcon icon={faArrowUp} /> hoch
                </button>
                <button
                  className="hover:text-black disabled:text-gray-200 ml-5"
                  disabled={index + 1 == core.ws.quest.tasks.length}
                  onClick={() => {
                    moveTaskDown(core, index)
                  }}
                >
                  <FaIcon icon={faArrowDown} /> runter
                </button>
                <button
                  className="hover:text-red-600 ml-5"
                  onClick={() => {
                    deleteTask(core, index)
                  }}
                >
                  <FaIcon icon={faTrashCan} /> Auftrag löschen
                </button>
              </p>
            </>
          )}
        </div>
        <div className="h-48 mb-6 mr-8">
          <View
            world={task.start}
            preview={
              task.target === null
                ? undefined
                : { track: [], world: task.target }
            }
            hideKarol={false}
            wireframe={false}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    )
  }
}
