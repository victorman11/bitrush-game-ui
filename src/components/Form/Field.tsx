import { HTMLAttributes } from 'react'

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field(props: FieldProps) {
  // TODO REMOVE COMMENTS AFTER VALIDATION
  // return <div className="flex flex-row mb-1" {...props} />;
  return <div className="flex flex-row" {...props} />
}
