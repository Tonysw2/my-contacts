import { ReactNode } from 'react'
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
  if (!visible) {
    return null
  }

  let container = document.getElementById('modal-root')

  if (!container) {
    container = document.createElement('div')
    container.setAttribute('id', 'modal-root')
    document.body.appendChild(container)
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container $danger={danger}>
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
