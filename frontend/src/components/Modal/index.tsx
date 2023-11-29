import { ReactNode } from 'react'

import { useAnimatedUnmount } from '../../hooks/useAnimatedUnmount'

import { Button } from '../Button'
import { ReactPortal } from '../ReactPortal'

import { Container, Footer, Overlay } from './styles'

type Props = {
  title: string
  danger?: boolean
  visible: boolean
  isLoading?: boolean
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel: () => void
  onConfirm: () => void
}

export function Modal({
  title,
  danger,
  visible,
  children,
  isLoading,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Confirmar',
  onCancel,
  onConfirm,
}: Props) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount<HTMLDivElement>(visible)

  if (!shouldRender) {
    return null
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay ref={animatedElementRef} $isLeaving={!visible}>
        <Container $isLeaving={!visible} $danger={danger}>
          <h1>{title}</h1>

          <div className="modal-body">{children}</div>

          <Footer>
            <button
              type="button"
              onClick={onCancel}
              disabled={isLoading}
              className="cancel-btn"
            >
              {cancelLabel}
            </button>

            <Button
              type="button"
              $danger={danger}
              isLoading={isLoading}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  )
}
