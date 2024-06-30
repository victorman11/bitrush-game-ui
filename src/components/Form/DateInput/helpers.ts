import { differenceInYears, parse } from 'date-fns'

function isBelowEighteen(date: string) {
  const dateOfBirth = parse(date, 'dd/MM/yyyy', new Date())

  const age = differenceInYears(new Date(), dateOfBirth)

  if (age < 18) return true

  return false
}

export { isBelowEighteen }
