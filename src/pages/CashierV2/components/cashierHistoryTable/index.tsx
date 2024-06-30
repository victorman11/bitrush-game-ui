import { BalanceHeader } from './components/BalanceHeader'
import { LoadMoreData } from './components/LoadMore'
import { TableHeader } from './components/TableHeader'
import { TableTitle } from './components/TableTitle'
import * as CashierHistoryService from './services'

const CashierHistory = {
  Header: TableHeader,
  HeaderBalance: BalanceHeader,
  LoadMore: LoadMoreData,
  Title: TableTitle,
}

export { CashierHistory, CashierHistoryService }
