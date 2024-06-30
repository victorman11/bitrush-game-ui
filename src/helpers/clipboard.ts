import { toast } from 'react-toastify'

const copyStringToClipboard = async (
  content: string,
  successMessage: string,
) => {
  try {
    await navigator.clipboard.writeText(content)
    toast.success(successMessage)
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

const copyStringFromClipboard = async () => {
  try {
    const response = await navigator.clipboard.readText()
    return response
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}

export { copyStringToClipboard, copyStringFromClipboard }
