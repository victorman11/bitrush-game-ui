import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library/table'

import { useGameHistoryStore } from '@/commons/stores'
import { UserGameHistoryType } from '@/commons/types/gameHistory'
import { copyStringToClipboard } from '@/helpers/clipboard'
import { cn } from '@/helpers/tailwindMerge'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import CustomIcon from '../CustomIcon/CustomIcon'

const headerCellBaseStyle =
  '!typography-xs !text-bitrush-neutral-100 !px-2 !py-2'
const cellBaseStyle = '!typography-xs !px-2 !py-2 text-bitrush-neutral-100'

const headerRows = ['Crash', 'Payout', 'Bet', 'Profit', 'Hash']

const handleProfitField = (profit: number) => {
  if (profit === 0) {
    return '-'
  }

  if (profit > 0) {
    return `+${profit.toFixed(2)}`
  }

  return profit.toFixed(2)
}

const handleCellValue = (value: string, suffix = '', fractionDigits = 2) => {
  try {
    const valueAsNum = Number(value)

    if (!valueAsNum || valueAsNum === 0) {
      return '-'
    }

    return `${valueAsNum.toFixed(fractionDigits)}${suffix}`
  } catch (error) {
    return '-'
  }
}

const handleClassName = (profit: string) => {
  const profitAsNum = Number(profit)
  if (profitAsNum > 0) {
    return 'text-bitrush-green-500 font-bold'
  }

  if (profitAsNum < 0) {
    return 'text-bitrush-red-500 font-bold'
  }

  return ''
}

const handleClassNameBust = (bust: string) => {
  try {
    const bustAsNum = Number(bust)

    return bustAsNum < 2
      ? bustAsNum === 0
        ? 'text-bitrush-neutral-100'
        : 'text-bitrush-red-500'
      : 'text-bitrush-green-500'
  } catch (error) {
    return 'text-bitrush-green-500'
  }
}

type GameHistoryTableProps = {
  onClose: () => void
}

const GameHistoryTable = ({ onClose }: GameHistoryTableProps) => {
  const { userGameHistory, showLastPayoutOverlay } = useGameHistoryStore()
  const { isDesktop } = useDeviceWidth()

  const handleCopyHashGame = (hash: string) => {
    copyStringToClipboard(hash, 'Hash Game has been copied')
  }

  if (!userGameHistory.length || showLastPayoutOverlay === false) {
    return null
  }

  if (!isDesktop) {
    return (
      <div className="absolute left-0 right-0 top-0 z-50 flex h-full flex-col rounded bg-bitrush-neutral-850 p-4">
        <div className="mb-5 flex flex-row items-center justify-between">
          <CustomIcon.ArrowBack
            className="h-5 w-6 fill-bitrush-neutral-0"
            onClick={onClose}
          />
          <h1 className="typography-h1 text-bitrush-neutral-0 ">
            Last payouts
          </h1>
          <div className="h-5 w-6" />
        </div>
        <div className="thin-scrollbar overflow-y-auto">
          <Table
            data={{ nodes: userGameHistory }}
            layout={{ fixedHeader: true }}
          >
            {(tableList: UserGameHistoryType[]) => (
              <>
                <Header>
                  <HeaderRow className="!bg-bitrush-neutral-800">
                    {headerRows.map((cell, index) => (
                      <HeaderCell key={index} className={headerCellBaseStyle}>
                        {cell}
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item: UserGameHistoryType) => (
                    <Row
                      key={item.uuid}
                      item={{ ...item, id: item.uuid }}
                      className={`!bg-transparent`}
                    >
                      <Cell
                        className={cn(
                          cellBaseStyle,
                          handleClassNameBust(item.bust),
                        )}
                      >
                        {handleCellValue(item.bust, 'x')}
                      </Cell>
                      <Cell className={`${cellBaseStyle}`}>
                        {handleCellValue(item.payout, 'x')}
                      </Cell>

                      <Cell className={`${cellBaseStyle}`}>
                        {handleCellValue(item.bet)}
                      </Cell>

                      <Cell
                        className={cn(
                          cellBaseStyle,
                          handleClassName(item.profit),
                        )}
                      >
                        {handleProfitField(Number(item.profit))}
                      </Cell>
                      <Cell
                        className={cn(cellBaseStyle, 'cursor-pointer')}
                        onClick={() => {
                          handleCopyHashGame(item.hash)
                        }}
                      >
                        <img src="copy-icon.svg" alt="copy" />
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute left-0 right-0 top-0 z-50 flex max-h-full flex-col rounded bg-bitrush-neutral-900 p-[2.4vh]">
      <div className="mb-5 flex flex-row items-center gap-8">
        <CustomIcon.ArrowBack
          className="h-5 w-6 fill-bitrush-neutral-0"
          onClick={onClose}
        />
        <h1 className="typography-h1 text-bitrush-neutral-0 ">Last payouts</h1>
      </div>
      <div className="thin-scrollbar overflow-y-auto">
        <Table data={{ nodes: userGameHistory }} layout={{ fixedHeader: true }}>
          {(tableList: UserGameHistoryType[]) => (
            <>
              <Header>
                <HeaderRow className="!bg-bitrush-neutral-850">
                  {headerRows.map((cell, index) => (
                    <HeaderCell key={index} className={headerCellBaseStyle}>
                      {cell}
                    </HeaderCell>
                  ))}
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item: UserGameHistoryType) => (
                  <Row
                    key={item.uuid}
                    item={{ ...item, id: item.uuid }}
                    className={`!bg-transparent`}
                  >
                    <Cell
                      className={cn(
                        cellBaseStyle,
                        handleClassNameBust(item.bust),
                      )}
                    >
                      {handleCellValue(item.bust, 'x')}
                    </Cell>
                    <Cell className={`${cellBaseStyle}`}>
                      {handleCellValue(item.payout, 'x')}
                    </Cell>

                    <Cell className={`${cellBaseStyle}`}>
                      {handleCellValue(item.bet)}
                    </Cell>

                    <Cell
                      className={cn(
                        cellBaseStyle,
                        handleClassName(item.profit),
                      )}
                    >
                      {handleProfitField(Number(item.profit))}
                    </Cell>
                    <Cell
                      className={cn(cellBaseStyle, 'cursor-pointer')}
                      onClick={() => {
                        handleCopyHashGame(item.hash)
                      }}
                    >
                      <img src="copy-icon.svg" alt="copy" />
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </div>
  )
}

export { GameHistoryTable }
