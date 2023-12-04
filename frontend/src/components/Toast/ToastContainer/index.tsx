import { useEffect } from 'react'

import { ToastDTO } from '../../../dtos/ToastDTO'

import { useAnimatedList } from '../../../hooks/useAnimatedList'

import { toastEventManager } from '../../../utils/toast'

import { ToastMessage } from '../ToastMessage'

import { Container } from './styles'

export function ToastContainer() {
  const {
    renderList,
    handleRemoveItem,
    setItems: setMessages,
  } = useAnimatedList<HTMLDivElement>()

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
  }, [setMessages])

  return (
    <Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
          onRemoveMessage={handleRemoveItem}
        />
      ))}
    </Container>
  )
}
