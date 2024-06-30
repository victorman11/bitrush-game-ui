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
import { Deposit } from '@/pages/Cashier/types/apiResponse'

import RenderIf from '../RenderIf/RenderIf'
import useLastDepositsTable from './useLastDepositsTable'

const headerCellBaseStyle =
  '!typography-xs !text-bitrush-neutral-0 !px-2 !py-2 !font-light'
const cellBaseStyle = '!typography-xs !px-2 !py-2 !font-semibold'

const headerRows = ['Date', 'Amount', 'Invoice', 'Status']

const statusColor = {
  pending: '!text-bitrush-yellow-500',
  failed: '!text-bitrush-red-500',
  completed: '!text-bitrush-green-500',
}

type LastDepositsTableProps = {
  headerRight?: React.ReactNode
  headerBottom?: React.ReactNode
}

function getStatusColor(status: string) {
  const useStatus = status.toLowerCase()
  if (!statusColor[useStatus as keyof typeof statusColor]) {
    return '!text-bitrush-neutral-0'
  }
  return statusColor[useStatus as keyof typeof statusColor]
}

const LastDepositsTable = ({
  headerRight = null,
  headerBottom = null,
}: LastDepositsTableProps) => {
  const { states, functions } = useLastDepositsTable()

  return (
    <RenderIf isTrue={states.deposits?.length > 0}>
      <div>
        <div className="mb-4 flex flex-row justify-between">
          <h1 className="typography-h1 text-bitrush-neutral-0 ">
            Deposit history
          </h1>
          {headerRight}
        </div>
        {headerBottom && <div>{headerBottom}</div>}
        <Table
          data={{ nodes: states.deposits }}
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
                {tableList.map((item: Deposit) => (
                  <Row
                    key={item.invoice_id}
                    item={item}
                    className="!bg-transparent"
                  >
                    <Cell className={`${cellBaseStyle} text-bitrush-neutral-0`}>
                      {formatDateDMY(item.createdAt)}
                    </Cell>
                    <Cell className={`${cellBaseStyle} text-bitrush-neutral-0`}>
                      {item.value} {item.currency}
                    </Cell>
                    <Cell
                      className={`${cellBaseStyle} text-bitrush-neutral-0`}
                      onClick={() => functions.copy(item.invoice_id)}
                    >
                      {item.invoice_id}
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
        {states.depositsHasMoreRows && (
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

export default LastDepositsTable
