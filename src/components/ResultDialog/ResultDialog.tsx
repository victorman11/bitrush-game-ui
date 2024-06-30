import React from 'react'

import Card from '../Card/Card'
import useResultDialog from './useResultDialog'

const ResultDialog: React.FC = () => {
  const { data, borderColor, textColor, shadowColor } = useResultDialog()

  return (
    <div className="lg:w-80">
      <Card className={`border-${borderColor} px-2 py-2 lg:px-0 lg:py-1`}>
        <div className="flex flex-col items-center  justify-center  p-1 lg:p-2">
          <p
            className={`text-${textColor} ${shadowColor} typography-base mb-1 hidden text-center font-bold lg:block`}
          >
            {data.title}
          </p>

          <table className="border-separate border-spacing-x-4">
            <tbody>
              <tr>
                <td className="typography-xs text-right font-light">Bet</td>
                <td className={`text-${textColor} typography-xs font-bold`}>
                  {data.bet}
                </td>
              </tr>
              <tr>
                <td className="typography-xs text-right font-light">Payout</td>
                <td className={`text-${textColor} typography-xs font-bold`}>
                  {data.payout}
                </td>
              </tr>
              <tr>
                <td className="typography-xs text-right font-light">Result</td>
                <td className={`text-${textColor} typography-xs font-bold`}>
                  {data.result}
                </td>
              </tr>
              <tr>
                <td className="typography-xs text-right font-light">Profit</td>
                <td className={`text-${textColor} typography-xs font-bold`}>
                  {data.profit}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ResultDialog
