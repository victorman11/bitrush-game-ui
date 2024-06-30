import { PropsWithChildren } from 'react'

import { useGameHistoryStore } from '@/commons/stores'
import { UserGameHistoryType } from '@/commons/types/gameHistory'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

const GameHistoryPreview = (props: PropsWithChildren) => {
  const { userGameHistory, setShowLastPayoutOverlay } = useGameHistoryStore()
  const { isDesktop } = useDeviceWidth()

  const handleStyle = (game: UserGameHistoryType) => {
    try {
      const profitAsNum = Number(game.profit)

      if (profitAsNum < 0 || Number(game.bust) < 2) {
        return 'text-bitrush-red-500'
      }

      return 'text-bitrush-green-500'
    } catch (error) {
      return 'text-bitrush-neutral-500'
    }
  }

  return (
    <>
      {props.children}
      <div>
        <div
          className={
            'align-center flex flex-row flex-wrap justify-between rounded border border-bitrush-neutral-600 bg-bitrush-neutral-850 px-[1.2vh] py-[0.8vh]'
          }
        >
          <span className="text-bitrush-blue-0 typography-xs font-light">
            Last payouts
          </span>

          <div style={{ alignItems: 'flex-end', gap: 8, display: 'flex' }}>
            {userGameHistory.slice(0, isDesktop ? 8 : 3).map((game) => (
              <span
                key={game.uuid}
                className={`typography-xs ${handleStyle(game)}`}
              >
                {Number(game.bust).toFixed(2)}x
              </span>
            ))}
            <span
              className="typography-xs cursor-pointer text-bitrush-blue-600"
              onClick={() => setShowLastPayoutOverlay(true)}
            >
              See all
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export { GameHistoryPreview }
