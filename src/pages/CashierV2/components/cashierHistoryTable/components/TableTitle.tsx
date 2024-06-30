import { PropsWithChildren } from 'react'

const TableTitle = ({ children }: PropsWithChildren) => {
  if (!children) {
    return null
  }
  return (
    <div className="mb-4 flex flex-row justify-between">
      <h1 className="typography-h1 text-bitrush-neutral-0 ">{children}</h1>
    </div>
  )
}

export { TableTitle }
