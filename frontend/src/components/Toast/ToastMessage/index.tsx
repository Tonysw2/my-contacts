import { memo, useEffect } from 'react'

import CheckSVG from '../../../assets/icons/check-circle.svg'
import XCircleSVG from '../../../assets/icons/x-circle.svg'

import { ToastDTO } from '../../../dtos/ToastDTO'

import { Container } from './styles'

type Props = {
  message: ToastDTO
  isLeaving: boolean
  animatedRef: React.MutableRefObject<HTMLDivElement | null>
  onRemoveMessage: (id: string) => void
}

function ToastMessage({
  message,
  isLeaving,
  onRemoveMessage,
  animatedRef,
}: Props) {
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
      role="button"
      ref={animatedRef}
      $isLeaving={isLeaving}
      $variant={message.variant}
      onClick={handleRemoveToast}
    >
      {message.variant === 'success' && <img src={CheckSVG} />}
      {message.variant === 'danger' && <img src={XCircleSVG} />}
      <strong>{message.text}</strong>
    </Container>
  )
}

const MemoizedToastMessage = memo(ToastMessage)

export { MemoizedToastMessage as ToastMessage }
