import {
  Header,
  HeaderCell,
  HeaderRow,
} from '@table-library/react-table-library/table'

type TableHeaderProps = {
  headers?: string[]
}

const TableHeader = ({ headers }: TableHeaderProps) => {
  if (!headers?.length) {
    return null
  }

  return (
    <Header>
      <HeaderRow className="!bg-bitrush-neutral-800">
        {headers.map((cell) => (
          <HeaderCell
            key={cell}
            className={`!typography-xs !px-2 !py-2 !font-light !text-bitrush-neutral-0 ${
              cell === 'Status' ? '!text-right' : ''
            }`}
          >
            {cell}
          </HeaderCell>
        ))}
      </HeaderRow>
    </Header>
  )
}

export { TableHeader }
