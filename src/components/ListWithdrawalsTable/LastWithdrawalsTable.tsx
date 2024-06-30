/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library/table'
import React from 'react'

import { formatDateDMY } from '@/helpers/converter'
import { capitalizeFirstLetter } from '@/helpers/strings.ts'
import { Withdrawal } from '@/pages/Cashier/types/apiResponse'

import RenderIf from '../RenderIf/RenderIf'
import useLastWithdrawalsTable from './useLastWithdrawalsTable'

const headerCellBaseStyle =
  '!typography-xs !text-bitrush-neutral-100 !px-2 !py-2'
const cellBaseStyle = '!typography-xs !px-2 !py-2 !font-semibold'

const headerRows = ['Date', 'Amount', 'Address', 'Status']

const statusColor = {
  new: 'text-bitrush-yellow-500',
  unconfirmed: 'text-bitrush-yellow-500',
  confirmed: 'text-bitrush-green-500',
  replaced: 'text-bitrush-red-500',
  failed: 'text-bitrush-red-500',
}

type LastDepositsTableProps = {
  headerRight?: React.ReactNode
}

function getStatusColor(status: string) {
  const useStatus = status.toLowerCase()
  if (!statusColor[useStatus as keyof typeof statusColor]) {
    return 'text-bitrush-neutral-0'
  }
  return statusColor[useStatus as keyof typeof statusColor]
}

const LastWithdrawalsTable = ({
  headerRight = null,
}: LastDepositsTableProps) => {
  const { states, functions } = useLastWithdrawalsTable()

  return (
    <RenderIf isTrue={states.withdrawals?.length > 0}>
      <div>
        <div className="mb-4 flex flex-row justify-between">
          <h1 className="typography-h1 text-bitrush-neutral-0 ">
            Last Withdrawals
          </h1>
          {headerRight}
        </div>
        <div>
          <p className="typography-xs -mt-2 mb-4 text-bitrush-neutral-100">
            <span>Total withdrawed:</span>{' '}
            <span>
              <b>{states.withdrawalsTotal.bits} RUSH</b>
            </span>
          </p>
        </div>
        <Table
          data={{ nodes: states.withdrawals }}
          layout={{ fixedHeader: true }}
          className="-mx-2"
        >
          {(tableList: any) => (
            <>
              <Header>
                <HeaderRow className="!bg-transparent">
                  {headerRows.map((cell) => (
                    <HeaderCell className={headerCellBaseStyle} key={cell}>
                      {cell}
                    </HeaderCell>
                  ))}
                </HeaderRow>
              </Header>
              <Body>
                {tableList.map((item: Withdrawal) => (
                  <Row key={item.id} item={item} className="!bg-transparent">
                    <Cell className={`${cellBaseStyle} text-bitrush-neutral-0`}>
                      {formatDateDMY(item.createdAt)}
                    </Cell>
                    <Cell className={`${cellBaseStyle} text-bitrush-neutral-0`}>
                      {item.value} {item.currency}
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} text-bitrush-neutral-0`}
                      onClick={() => functions.copy(item.address)}
                    >
                      {item.address}
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} ${getStatusColor(
                        item.status,
                      )}`}
                    >
                      {capitalizeFirstLetter(item.status)}
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
        {states.withdrawalsHasMoreRows && (
          <button
            className="typography-xs font-bold text-bitrush-blue-500 hover:text-bitrush-blue-400 focus:outline-none"
            onClick={functions.getMoreRows}
          >
            Load more
          </button>
        )}
      </div>
    </RenderIf>
  )
}

export default LastWithdrawalsTable
