import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import mergeStyles from '@/helpers/mergeStyles'

import { Label } from '../Label'

interface DropdownItem {
  key: string
  name: string
  flag?: string
}

interface DropdownProps {
  name: string
  options: DropdownItem[]
  placeholder?: string
  onOptionSelected: (option: DropdownItem) => void
  hasSearch?: boolean
  hasIcon?: boolean
  defaultOption?: string
}

const Dropdown: React.FC<DropdownProps> = ({
  name,
  options,
  onOptionSelected,
  hasSearch,
  hasIcon,
  defaultOption,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<
    DropdownItem | null | undefined
  >(
    defaultOption
      ? options.find(
          (option) => option.key.toLowerCase() === defaultOption.toLowerCase(),
        )
      : null,
  )
  const { register, setValue, getFieldState } = useFormContext()
  const [filter, setFilter] = useState('')

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleOptionClick = (option: DropdownItem) => {
    setSelectedOption(option)
    onOptionSelected(option)
    setValue(name, option.key)
    setIsOpen(false)
    setFilter('')
  }

  const invalidMergedStyles = mergeStyles(
    baseStyle,
    invalidStyles,
    invalidFocusedStyle,
    invalidHoverStyle,
  )

  const mergedStyles = mergeStyles(baseStyle, focusedStyle, hoverStyle)

  const handleClassName = () => {
    const { invalid } = getFieldState(name)

    if (invalid) {
      return invalidMergedStyles
    }

    return mergedStyles
  }

  const handleOnEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const filterCountries = () => {
    const regex = new RegExp(filter, 'i')
    return options.filter((country) => regex.test(country.name))
  }

  return (
    <div className={handleClassName()} onKeyDown={handleOnEscape}>
      <input {...register(name)} name={name} style={{ display: 'none' }} />

      {/* TODO MOVE TO A NEW COMPONENT */}
      <div
        className="flex h-full cursor-pointer items-center justify-between"
        onClick={toggleDropdown}
      >
        <div
          className={`flex h-full items-center pl-2 ${
            selectedOption ? 'text-bitrush-neutral-0' : 'text-bitrush-blue-800'
          }`}
        >
          {selectedOption
            ? hasIcon
              ? `${selectedOption?.flag} ${selectedOption?.name}`
              : selectedOption?.name
            : placeholder}
        </div>
        <img src="arrow-down-solid.svg" alt="arrow-down" />
      </div>

      {/* TODO MOVE TO A NEW COMPONENT */}
      {isOpen && (
        <div className="dropdown-list thin-scrollbar absolute inset-x-8 top-1/2 z-10 flex max-h-[85dvh] -translate-y-1/2 cursor-pointer flex-col overflow-y-scroll bg-bitrush-neutral-800 p-4 text-bitrush-neutral-0 shadow-glow-blue-hovered md:inset-x-0 md:top-auto md:max-h-80 md:translate-y-0">
          {/* TODO MOVE TO A NEW COMPONENT */}
          {hasSearch && (
            <div className="mb-4 flex">
              <Label>Search</Label>
              <input
                autoFocus
                value={filter}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFilter(event.target.value)
                }
                className={
                  'typography-xs h-8 min-h-8 w-full rounded-r border border-bitrush-blue-700 bg-transparent p-2 placeholder-bitrush-blue-800 outline-none  transition-shadow 3xl:h-[3vw] 3xl:max-h-12'
                }
              />
            </div>
          )}
          {/* TODO MOVE TO A NEW COMPONENT */}
          {filterCountries().map((option) => (
            <div
              key={option.key}
              className="p-2"
              onClick={() => handleOptionClick(option)}
            >
              {hasIcon && <span style={{ width: 100 }}>{option.flag}</span>}
              <span className="text-md"> {option.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown

const baseStyle =
  'md:relative w-full bg-transparent border outline-none border-bitrush-blue-700 transition-shadow h-8 min-h-8 3xl:h-[3vw] 3xl:max-h-12 pr-2 typography-xs rounded-r'

const focusedStyle =
  'focus:shadow-glow-blue-hovered  focus:placeholder-bitrush-blue-700'

const hoverStyle = 'hover:shadow-glow-blue-hovered  '

const invalidStyles =
  'bg-bitrush-neutral-500 border-bitrush-red-500 text-bitrush-red-400 placeholder-bitrush-red-500'

const invalidFocusedStyle =
  'focus:shadow-glow-red-hovered  focus:placeholder-bitrush-red-700'

const invalidHoverStyle = 'hover:shadow-glow-red-hovered  '
