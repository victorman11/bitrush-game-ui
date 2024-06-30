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

import { useAuthStore } from '@/commons/stores'
import { useWSBetStore } from '@/commons/stores/useWSBetStore'
import { WSBetType } from '@/commons/types/websocket'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'

import { Card } from '../Card'

const headerCellBaseStyle =
  '!typography-xs !text-bitrush-neutral-100 !px-2 !py-2'
const cellBaseStyle = '!typography-xs !px-2 !py-2'

const headerRows = ['Player', 'Bet', 'Payout', 'Profit']

type AcitivityTableProps = {
  headerRight?: React.ReactNode
}

const AcitivityTable = ({ headerRight = null }: AcitivityTableProps) => {
  const { user } = useAuthStore()
  const { bets } = useWSBetStore()
  const { isMobile } = useDeviceWidth()
  const data = { nodes: bets }

  function getContainerRatio() {
    if (window.innerHeight <= 680) {
      return 50.9 / 100
    }

    if (window.innerHeight <= 780) {
      return 47.9 / 100
    }

    return 47.9 / 100
  }

  // Color rules:
  // When the game is not started, the main player data (username, bet, payout and profit) should be yellow
  // When the game is not started, the other players username should be purple and the their data (bet, payout and profit) should be white
  // When the game is over, the main player username should keep in yellow and his data should be green if he wins or red if he loses
  // When the game is over, the other players data (username, bet, payout and profit) should be fully green if he wins or fully red if he loses

  const handleColorStyle = (item: WSBetType) => {
    if (item.win === null) {
      if (item.id === user?.id) {
        return 'text-bitrush-yellow-500'
      }

      return 'text-bitrush-white-800'
    }

    if (item.win === false) {
      return 'text-bitrush-red-500'
    }

    if (item.win === true) {
      return 'text-bitrush-green-500'
    }
  }

  const handleColorUsername = (item: WSBetType) => {
    if (item.id === user?.id) {
      return 'text-bitrush-yellow-500 font-bold'
    }

    if (item.win === false) {
      return 'text-bitrush-red-500'
    }

    if (item.win === true) {
      return 'text-bitrush-green-500'
    }

    return 'text-bitrush-purple-500'
  }

  const handleShowData = (value: string, item: WSBetType) => {
    if (item.id === user?.id) {
      return value
    }

    if (!item.win) {
      return '-'
    }

    return value
  }

  const HeaderRightComponent = () => headerRight

  return (
    <Card.Container
      borderless={isMobile}
      className="  lg:h-full lg:overflow-hidden"
      style={{
        height: isMobile ? window.innerHeight * getContainerRatio() : '',
      }}
    >
      <Card.Header headerRight={<HeaderRightComponent />}>
        <Card.Title>Activity</Card.Title>
      </Card.Header>
      <Card.Content className="thin-scrollbar h-full overflow-y-auto pb-6">
        <div>
          <Table data={data} layout={{ fixedHeader: true }}>
            {(tableList: any) => (
              <>
                <Header>
                  <HeaderRow className="!bg-bitrush-neutral-850">
                    {headerRows.map((cell) => (
                      <HeaderCell className={headerCellBaseStyle} key={cell}>
                        {cell}
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item: WSBetType) => (
                    <Row
                      key={item.socketClientId}
                      item={item}
                      className={`!bg-transparent ${handleColorStyle(item)}`}
                    >
                      <Cell
                        className={`${cellBaseStyle} ${handleColorUsername(
                          item,
                        )}`}
                      >
                        {item.userName}
                      </Cell>
                      <Cell className={`${cellBaseStyle}`}>{item.bet}</Cell>
                      <Cell className={cellBaseStyle}>
                        {handleShowData(`${item.payout}x`, item)}
                      </Cell>
                      <Cell className={`${cellBaseStyle} font-bold`}>
                        {handleShowData(
                          item.profit === 0 ? '-' : `${item.profit.toFixed(2)}`,
                          item,
                        )}
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </Card.Content>
    </Card.Container>
  )
}

export default AcitivityTable
