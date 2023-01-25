import {
  faCheck,
  faExternalLink,
  faPencil,
  faPenToSquare,
  faSeedling,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { createRef, useEffect } from 'react'

import {
  editCodeAndResetProgress,
  forceRerender,
  setShowImpressum,
  setShowPrivacy,
} from '../lib/commands/mode'
import { setOverviewScroll, startQuest } from '../lib/commands/quest'
import { questDeps } from '../lib/data/dependencies'
import { categories } from '../lib/data/overview'
import { questData } from '../lib/data/quests'
import {
  getQuestSessionData,
  isQuestDone,
  isQuestStarted,
} from '../lib/helper/session'
import { useCore } from '../lib/state/core'
import { QuestSessionData } from '../lib/state/types'
import { FaIcon } from './FaIcon'
import { ImpressumModal } from './ImpressumModal'
import { PrivacyModal } from './PrivacyModal'
import { View } from './View'

export function Overview() {
  const core = useCore()

  const overviewContainer = createRef<HTMLDivElement>()

  useEffect(() => {
    if (overviewContainer.current && core.ws.ui.overviewScroll > 0) {
      overviewContainer.current.scrollTop = core.ws.ui.overviewScroll
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className=" h-full overflow-auto" ref={overviewContainer}>
      <div className="bg-yellow-200 flex flex-col relative min-h-full">
        <div className="flex justify-center">
          <div
            className={clsx(
              'flex mt-6 items-center rounded-xl',
              'p-4 px-12 bg-yellow-100',
              'border-l-4 border-r-red-500 border-r-4 border-l-blue-600'
            )}
          >
            <img
              src="/robotE.png"
              alt="Bild von Robot Karol"
              className="mr-8"
              height={71}
              width={40}
            />
            <h1 className="text-5xl whitespace-nowrap">Robot Karol Online</h1>
          </div>
        </div>
        <div className="flex justify-center mt-8 z-10">
          <a
            className="px-2 py-0.5 bg-green-400 hover:bg-green-500 rounded"
            href={
              window.location.protocol +
              '//' +
              window.location.host +
              '/?id=Z9xO1rVGj'
            }
          >
            <FaIcon icon={faSeedling} className="mr-1" />
            Spielwiese
          </a>{' '}
          <a
            href="/#editor"
            className="px-2 py-0.5 bg-blue-300 hover:bg-blue-400 rounded ml-8"
          >
            <FaIcon icon={faPenToSquare} className="mr-1" />
            Aufgaben-Editor
          </a>
          <span className="ml-8 cursor-pointer hover:underline font-bold">
            Anmelden
          </span>
        </div>
        {core.ws.ui.isAnalyze && (
          <div className="bg-white px-16 pb-8 mt-4">
            <p className="my-6">
              Daten ab {core.ws.analyze.cutoff}, insgesamt{' '}
              {core.ws.analyze.count} Einträge
            </p>
            <h2 className="mt-6 mb-4 text-lg">Freigegebene Aufgaben</h2>
            {core.ws.analyze.published.map((entry, i) => (
              <p key={i} className="my-2">
                <a
                  href={`/#${entry.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {entry.id}
                </a>{' '}
                - {entry.date}
              </p>
            ))}
            <p className="mt-6 mb-4">
              {core.ws.analyze.showEditor} mal Editor angezeigt,{' '}
              {core.ws.analyze.showPlayground} mal Spielwiese,{' '}
              {core.ws.analyze.showDemo} mal Demo,{' '}
              {core.ws.analyze.showStructogram} mal Struktogramm
            </p>
            <h2 className="mt-6 mb-4 text-lg">Bearbeitungen</h2>
            {core.ws.analyze.customQuests.map((entry, i) => (
              <p key={i} className="my-2">
                <a
                  href={`/#${entry.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {entry.id}
                </a>{' '}
                - {entry.start} mal gestartet, {entry.complete} mal
                abgeschlossen
              </p>
            ))}
            <h2 className="mt-6 mb-4 text-lg">Legacy</h2>{' '}
            {Object.entries(core.ws.analyze.legacy).map((entry, i) => (
              <p key={i} className="my-2">
                <a
                  href={`/?id=${entry[0]}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {entry[0]}
                </a>{' '}
                - {entry[1].count} mal gestartet
              </p>
            ))}
          </div>
        )}
        <div className="mx-12 lg:mx-16 xl:mx-24 flex-auto overflow-hidden -mt-8">
          {categories.map(
            (cat, i) =>
              cat.quests.some(isQuestVisible) && (
                <div key={i} className="my-8 mt-24">
                  <h2 className="ml-7 -mb-4 text-xl">{cat.name}</h2>
                  <div
                    className={clsx(
                      'mt-6 mb-4 rounded-lg overflow-auto',
                      'flex flex-wrap'
                    )}
                  >
                    {cat.quests.map(renderQuest)}
                  </div>
                </div>
              )
          )}
        </div>
        {isQuestDone(1) &&
          !sessionStorage.getItem('robot_karol_online_hide_save_message') && (
            <div className="text-sm text-right mr-4 mt-1 mb-3 text-gray-600">
              Beim Schließen des Tabs wird dein Fortschritt zurückgesetzt. Eine
              Speicherfunktion ist in Arbeit.{' '}
              <button
                onClick={() => {
                  sessionStorage.setItem(
                    'robot_karol_online_hide_save_message',
                    '1'
                  )
                  forceRerender(core)
                }}
              >
                <FaIcon
                  icon={faTimes}
                  className="inline-block px-1 bg-white hover:bg-gray-100"
                />
              </button>
            </div>
          )}
        <div className="text-center mb-2 mt-10">
          Version: Januar 2023 |{' '}
          <button
            className="hover:underline"
            onClick={() => {
              setShowImpressum(core, true)
            }}
          >
            Impressum
          </button>{' '}
          |{' '}
          <button
            className="hover:underline"
            onClick={() => {
              setShowPrivacy(core, true)
            }}
          >
            Datenschutz
          </button>{' '}
          |{' '}
          {renderExternalLink(
            'Infos',
            'https://github.com/Entkenntnis/robot-karol-online#readme'
          )}
        </div>
        {core.ws.ui.showImpressum && <ImpressumModal />}
        {core.ws.ui.showPrivacy && <PrivacyModal />}
      </div>
    </div>
  )

  function renderExternalLink(title: string, href: string) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        <span className="hover:underline">{title}</span>{' '}
        <FaIcon icon={faExternalLink} className="text-xs" />
      </a>
    )
  }

  function isQuestVisible(id: number) {
    return (
      core.ws.ui.isDemo ||
      core.ws.ui.isAnalyze ||
      questDeps[id].length == 0 ||
      questDeps[id].some(isQuestDone)
    )
  }

  function renderQuest(index: number, i: number) {
    if (index == -1) {
      return <div className="basis-full h-8" key={`spacer_${i}`}></div>
    }

    // check for deps, empty deps -> always visible
    if (!isQuestVisible(index)) {
      return null
    }

    const data = questData[index]
    const sessionData: QuestSessionData | null = getQuestSessionData(index)

    const questDone = core.ws.ui.isAnalyze ? false : isQuestDone(index)

    const reachableCount = core.ws.analyze.reachable[index]

    const task = questData[index].tasks[0]

    return (
      <div
        className={clsx(
          'm-4 mr-6 p-3 bg-white rounded-md',
          'w-[290px]',
          !questDone &&
            'border-2 border-blue-500 hover:bg-blue-50 cursor-pointer'
        )}
        tabIndex={0}
        key={index}
        onClick={() => {
          setOverviewScroll(core, overviewContainer.current?.scrollTop ?? -1)
          startQuest(core, index)
        }}
      >
        <div className="">
          <div>
            <span
              className={clsx('py-1 inline-block', !questDone && 'font-bold')}
            >
              {data.title}
              {core.ws.ui.isAnalyze && <small>&nbsp;({index})</small>}
            </span>
          </div>
        </div>
        {core.ws.ui.isAnalyze && (
          <div>Deps: [{questDeps[index].join(', ')}]</div>
        )}
        <div className="text-gray-700 text-sml mt-2">
          &nbsp;
          {questDone && (
            <span className="text-green-600">
              {' '}
              <FaIcon icon={faCheck} /> abgeschlossen
            </span>
          )}
          {isQuestStarted(index) && (
            <span className="text-yellow-600">
              {' '}
              <FaIcon icon={faPencil} /> in Bearbeitung
            </span>
          )}
          {core.ws.ui.isAnalyze &&
            (() => {
              const entry = core.ws.analyze.quests[index]
              if (index == 1) {
                return <span>{entry.complete} Spieler*innen</span>
              }
              if (entry) {
                return (
                  <span>
                    {reachableCount} / {entry.start} / {entry.complete} /{' '}
                    <strong>
                      {Math.round((entry.complete / reachableCount) * 100)}%
                    </strong>
                  </span>
                )
              } else {
                return null
              }
            })()}
          <div className="overflow-hidden -mt-8">
            <View
              world={questDone ? task.target! : task.start}
              preview={
                task.target === null
                  ? undefined
                  : { track: [], world: task.target }
              }
              hideKarol={questDone}
              wireframe={false}
              className={clsx(
                'block mx-auto  max-h-[240px]',
                questDone && 'opacity-30'
              )}
            />
          </div>
        </div>
      </div>
    )
  }
}
