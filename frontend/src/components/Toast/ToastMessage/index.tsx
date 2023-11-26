import { useEffect } from 'react'
import CheckSVG from '../../../assets/icons/check-circle.svg'
import XCircleSVG from '../../../assets/icons/x-circle.svg'
import { ToastDTO } from '../../../dtos/ToastDTO'
import { Container } from './styles'

type Props = {
  message: ToastDTO
  onRemoveMessage: (id: string) => void
}

export function ToastMessage({ message, onRemoveMessage }: Props) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 7000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [message, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    <Container
      $variant={message.variant}
      onClick={handleRemoveToast}
      role="button"
    >
      {message.variant === 'success' && <img src={CheckSVG} />}
      {message.variant === 'danger' && <img src={XCircleSVG} />}
      <strong>{message.text}</strong>
    </Container>
  )
}
