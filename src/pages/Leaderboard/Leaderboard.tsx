import {
  Body,
  Cell,
  Header,
  HeaderCell,
  HeaderRow,
  Row,
  Table,
} from '@table-library/react-table-library/table'
import { useTheme } from '@table-library/react-table-library/theme'
import BigNumber from 'bignumber.js'
import { FormProvider } from 'react-hook-form'

import { ConditionalRenderer } from '@/components/ConditionalRenderer/ConditionalRenderer'
import { Form } from '@/components/Form'
import Dropdown from '@/components/Form/Dropdown/Dropdown.tsx'
import { formatCurrency, formatNumber } from '@/helpers/numbers'
import { useDeviceWidth } from '@/hooks/useDeviceWidth'
import useLeaderboard from '@/pages/Leaderboard/hooks/useLeaderboard.ts'
import { LeaderboardItem } from '@/pages/Leaderboard/types.ts'

const headerRows = ['#', 'Player', 'Wagered', 'Profit (ATH)', 'Profit (ATL)']
const cellBaseStyle = '!typography-xs !px-2 !py-2'
const commonCellStyle = 'text-bitrush-neutral-100'

function Leaderboard() {
  const {
    states: { leaderboard, userId, filters },
    actions: { setFilter },
    form,
  } = useLeaderboard()
  const { isMobile } = useDeviceWidth()

  const theme = useTheme([
    {
      Table: `
      --data-table-library_grid-template-columns:  50px 1fr minmax(120px, 1fr) minmax(120px, 1fr) minmax(120px, 1fr);
      `,
    },
  ])

  return (
    <div className="w-full">
      <div className="mx-auto max-w-xl md:max-w-2xl">
        <h1 className="typography-h1 mb-7 hidden text-bitrush-neutral-0 lg:block">
          Leaderboard
        </h1>
        <FormProvider {...form}>
          <form className="flex w-full flex-col gap-6">
            <Form.Container>
              <Form.Field>
                <Form.Label htmlFor="filter">Filter</Form.Label>
                <Dropdown
                  name="filter"
                  defaultOption={filters[0].key}
                  options={filters}
                  onOptionSelected={(option) => setFilter(parseInt(option.key))}
                />
              </Form.Field>
            </Form.Container>
          </form>
        </FormProvider>
        <div className="mb-4">
          <Table
            data={{ nodes: leaderboard }}
            layout={{ fixedHeader: true, custom: true }}
            theme={theme}
          >
            {(tableList: Array<LeaderboardItem>) => (
              <>
                <Header>
                  <HeaderRow className="!bg-bitrush-neutral-850">
                    {headerRows.map((cell) => (
                      <HeaderCell
                        className="!typography-xs !px-2 !py-2 !text-bitrush-neutral-100"
                        key={cell}
                      >
                        {cell}
                      </HeaderCell>
                    ))}
                  </HeaderRow>
                </Header>
                <Body>
                  {tableList.map((item: LeaderboardItem, index: number) => (
                    <Row
                      key={item.id}
                      item={item}
                      className={`!bg-transparent`}
                    >
                      <Cell className={`${cellBaseStyle} ${commonCellStyle}`}>
                        {index + 1}
                      </Cell>
                      <Cell
                        className={`${cellBaseStyle} ${item.id === userId ? 'font-bold text-bitrush-yellow-500' : 'text-bitrush-purple-500'}`}
                      >
                        {item.userName}
                      </Cell>
                      <Cell className={`${cellBaseStyle} ${commonCellStyle}`}>
                        <ConditionalRenderer
                          condition={isMobile}
                          whenTrue={
                            formatCurrency(item.wagered, true) + ' RUSH'
                          }
                          whenFalse={formatNumber(
                            new BigNumber(item.wagered),
                            0,
                            2,
                            ' RUSH',
                          )}
                        />
                      </Cell>
                      <Cell className={`${cellBaseStyle}  ${commonCellStyle}`}>
                        <ConditionalRenderer
                          condition={isMobile}
                          whenTrue={
                            formatCurrency(item.profitAth, true) + ' RUSH'
                          }
                          whenFalse={formatNumber(
                            new BigNumber(item.profitAth),
                            0,
                            2,
                            ' RUSH',
                          )}
                        />
                      </Cell>
                      <Cell className={`${cellBaseStyle} ${commonCellStyle}`}>
                        <ConditionalRenderer
                          condition={isMobile}
                          whenTrue={
                            formatCurrency(item.profitAtl, true) + ' RUSH'
                          }
                          whenFalse={formatNumber(
                            new BigNumber(item.profitAtl),
                            0,
                            2,
                            ' RUSH',
                          )}
                        />
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard
