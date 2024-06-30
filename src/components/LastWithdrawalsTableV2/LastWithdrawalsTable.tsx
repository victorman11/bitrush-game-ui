/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Cell,
  Row,
  Table,
} from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'

import { formatDateDMY, formatDateHours } from '@/helpers/converter'
import { addEllipses } from '@/helpers/stringHelpers'
import { cn } from '@/helpers/tailwindMerge'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import { Withdrawal } from '@/pages/Cashier/types/apiResponse'
import {
  CashierHistory,
  CashierHistoryService,
} from '@/pages/CashierV2/components/cashierHistoryTable'

import RenderIf from '../RenderIf/RenderIf'
import useLastWithdrawalsTable from './useLastWithdrawalsTable'

const cellBaseStyle = '!typography-xs !px-2 !py-2'
const headers = ['Date', 'Address', 'Deposit ID', 'Amount', 'Status']

const LastWithdrawalsTable = () => {
  const { states, functions } = useLastWithdrawalsTable()
  const { isMobile } = useDeviceWidth()
  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
      `,
  })

  return (
    <RenderIf isTrue={!!states.withdrawals?.length}>
      <div className="mt-8">
        <CashierHistory.Title>Withdrawal history</CashierHistory.Title>
        <CashierHistory.HeaderBalance
          title="Total Withdrawn"
          amount={states.totalWithdraws}
        />
        <Table
          data={{ nodes: states.withdrawals }}
          theme={theme}
          layout={{ fixedHeader: true, custom: true }}
        >
          {(tableList: any) => (
            <>
              <CashierHistory.Header headers={headers} />
              <Body>
                {tableList.map((item: Withdrawal) => (
                  <Row key={item.id} item={item} className="!bg-transparent">
                    <Cell
                      className={`${cellBaseStyle} text-bitrush-neutral-100`}
                    >
                      <div className="flex flex-col">
                        <span className="font-normal">
                          {formatDateDMY(item.createdAt)}
                        </span>
                        <span className="font-light text-bitrush-neutral-100">
                          {formatDateHours(item.createdAt)}
                        </span>
                      </div>
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} cursor-pointer text-bitrush-neutral-100`}
                      onClick={() =>
                        CashierHistoryService.copyAddress(item.address)
                      }
                    >
                      <div className="flex gap-2">
                        <RenderIf isTrue={!isMobile}>
                          <>{addEllipses(item.address)}</>
                        </RenderIf>
                        <img src="copy-icon.svg" alt="copy" />
                      </div>
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} cursor-pointer text-bitrush-neutral-100`}
                      onClick={() =>
                        CashierHistoryService.copyToClipboard(
                          item.id,
                          'Deposit ID has been copied',
                        )
                      }
                    >
                      <div className="flex gap-2">
                        <RenderIf isTrue={!isMobile}>
                          <>{addEllipses(item.id)}</>
                        </RenderIf>
                        <img src="copy-icon.svg" alt="copy" />
                      </div>
                    </Cell>
                    <Cell className={`${cellBaseStyle} text-bitrush-neutral-0`}>
                      <div className="flex flex-col">
                        <span
                          className={cn(
                            `font-light`,
                            item.currency !== 'usdc'
                              ? 'text-bitrush-neutral-200'
                              : '',
                          )}
                        >
                          {CashierHistoryService.formatAmount(
                            item.asset.amount,
                          )}
                        </span>
                        <RenderIf isTrue={item.currency !== 'usdc'}>
                          <span className="font-normal">
                            {CashierHistoryService.formatAmount(
                              item.asset.converted,
                            )}
                          </span>
                        </RenderIf>
                      </div>
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} ${CashierHistoryService.getStatusColor(
                        item.status,
                      )} text-right !font-semibold`}
                    >
                      {CashierHistoryService.getStatusName(item.status)}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        {states.withdrawalsHasMoreRows ? (
          <CashierHistory.LoadMore onClick={functions.getMoreRows} />
        ) : null}
      </div>
    </RenderIf>
  )
}

export default LastWithdrawalsTable
