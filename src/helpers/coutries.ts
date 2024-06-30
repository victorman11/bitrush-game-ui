/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { countries, getEmojiFlag } from 'countries-list'

type CountryType = {
  flag: string
  key: string
  name: string
  phone: string
}

const getAllCountries = () =>
  Object.keys(countries).map((key) => {
    const { name, phone } = countries[key]

    return {
      flag: getEmojiFlag(key),
      key,
      name,
      phone: phone[0],
    }
  })

export { getAllCountries }
export type { CountryType }
