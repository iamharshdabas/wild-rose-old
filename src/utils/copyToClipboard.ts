import toast from 'react-hot-toast'

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success('Copied to clipboard!'))
}

export default copyToClipboard
