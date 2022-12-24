import {
  faCheck,
  faExclamationTriangle,
  faPersonWalking,
  faStop,
} from '@fortawesome/free-solid-svg-icons'
import clsx from 'clsx'
import { useCore } from '../lib/state/core'
import { FaIcon } from './FaIcon'

export function TaskRunnerOverview() {
  const core = useCore()

  const currentIndex = core.ws.quest.lastStartedTask!

  return (
    <div className="px-5 pb-3 pt-2 bg-gray-100">
      <div className="ml-9 mb-3">Aufträge:</div>
      {core.ws.quest.tasks.map((task, index) => {
        return (
          <div key={index} className="my-1.5">
            <span className="w-9 inline-block pl-2">
              {(() => {
                if (index < currentIndex) {
                  return <FaIcon icon={faCheck} className="text-green-500" />
                }
                if (index == currentIndex) {
                  if (core.ws.ui.state == 'running') {
                    return <FaIcon icon={faPersonWalking} />
                  }
                  if (core.ws.ui.karolCrashMessage) {
                    return (
                      <FaIcon
                        icon={faExclamationTriangle}
                        className="text-red-600"
                      />
                    )
                  }
                  if (core.ws.ui.isManualAbort) {
                    return <FaIcon icon={faStop} />
                  }
                  if (core.ws.ui.isEndOfRun) {
                    return <FaIcon icon={faCheck} className="text-green-500" />
                  }
                }
                return null
              })()}
            </span>
            <span className={clsx(index == currentIndex && 'font-bold')}>
              {task.title}
            </span>
          </div>
        )
      })}
    </div>
  )
}