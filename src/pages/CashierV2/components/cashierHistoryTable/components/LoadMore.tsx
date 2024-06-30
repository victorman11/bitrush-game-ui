import Button from '@/components/Button/Button'

type LoadMoreDataProps = {
  onClick: () => void
}

const LoadMoreData = ({ onClick }: LoadMoreDataProps) => (
  <Button onClick={onClick} label="Load more" />
)

export { LoadMoreData }
