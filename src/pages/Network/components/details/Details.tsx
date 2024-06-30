import { Card } from '@/components/Card'

const Details = () => {
  return (
    <Card.Container className="thin-scrollbar flex h-full flex-col justify-between overflow-y-scroll p-2 py-4 lg:p-10">
      <Card.Header>
        <Card.Title className="w-full text-center">Details</Card.Title>
      </Card.Header>
      <Card.Content>{/*  */}</Card.Content>
    </Card.Container>
  )
}

export { Details }
