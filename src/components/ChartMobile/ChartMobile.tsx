import 'chart.js/auto'

import { AnimatePresence, motion } from 'framer-motion'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { useGameHistoryStore } from '@/commons/stores'

import { Card } from '../Card'
import { GameHistoryPreview } from '../GameHistoryPreview/GameHistoryPreview'
import { GameHistoryTable } from '../GameHistoryTable/GameHistoryTable'
import ResultDialog from '../ResultDialog/ResultDialog'
import useChart from './useChart'

const ChartMobile = () => {
  const {
    countdown,
    options,
    gameResults,
    gameStatus,
    gamePayout,
    gamePayoutColor,
    chartRef,
  } = useChart()

  const { setShowLastPayoutOverlay } = useGameHistoryStore()

  if (countdown >= 0) {
    return (
      // <Card.Container className="flex flex-col justify-between h-full relative overflow-y-scroll thin-scrollbar">
      <Card.Container className="thin-scrollbar relative flex flex-col justify-between overflow-y-scroll">
        <Card.Content>
          <div className="relative" id="charContainer">
            <HighchartsReact
              highcharts={Highcharts}
              ref={chartRef}
              options={{
                ...options,
                series: [
                  {
                    data: new Array(20).fill(0),
                  },
                ],
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center">
              <h1 className="typography-title text-center font-bold text-bitrush-neutral-0">
                Start
                <br />
                <span className="typography-titleLg text-bitrush-neutral-0">
                  {countdown}
                </span>
              </h1>
            </div>
          </div>
        </Card.Content>
        <Card.Footer>
          <GameHistoryPreview />
        </Card.Footer>

        <GameHistoryTable onClose={() => setShowLastPayoutOverlay(false)} />
      </Card.Container>
    )
  }
  return (
    // <Card.Container className="flex flex-col justify-between h-full relative overflow-y-scroll thin-scrollbar">
    <Card.Container className="thin-scrollbar relative flex flex-col justify-between overflow-y-scroll">
      <Card.Content>
        <div className="relative">
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartRef}
          />

          <AnimatePresence>
            <div className="absolute left-14 top-4">
              {gameResults?.bet && gameStatus === 'finished' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ResultDialog />
                </motion.div>
              )}
            </div>
          </AnimatePresence>

          <div className="absolute bottom-0 right-0">
            <div className="p-2">
              <p className={`typography-titleLg ${gamePayoutColor} font-bold`}>
                {gamePayout}x
              </p>
            </div>
          </div>
        </div>
      </Card.Content>
      <Card.Footer>
        <GameHistoryPreview />
      </Card.Footer>
      <GameHistoryTable onClose={() => setShowLastPayoutOverlay(false)} />
    </Card.Container>
  )
}

export { ChartMobile }
