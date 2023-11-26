import { useCallback, useEffect, useState } from 'react'
import { ToastMessage } from '../ToastMessage'
import { Container } from './styles'
import { ToastDTO } from '../../../dtos/ToastDTO'
import { toastEventManager } from '../../../utils/toast'

export function ToastContainer() {
  const [messages, setMessages] = useState<ToastDTO[]>([])

  useEffect(() => {
    function handleAddToast(event: Omit<ToastDTO, 'id'>) {
      const { text, variant, duration } = event

      setMessages((state) => [
        ...state,
        { id: String(Math.random()), variant, text, duration },
      ])
    }

    toastEventManager.on('addToast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addToast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  )
}
