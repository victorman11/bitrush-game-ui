export default function mergeStylesmergeStyles(
  ...args: (string | undefined)[]
) {
  // Filter out undefined values
  const validArgs = args.filter((arg) => arg !== undefined)

  // Join the valid arguments with a space
  const result = validArgs.join(' ')

  return result
}
