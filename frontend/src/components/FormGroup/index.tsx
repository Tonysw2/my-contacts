import { ReactNode } from 'react'
import { Container } from './styles'
import { Spinner } from '../Spinner'

type Props = {
  children: ReactNode
  isLoading?: boolean
  errorMessage?: string
}

export function FormGroup({
  children,
  errorMessage,
  isLoading = false,
}: Props) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {isLoading && (
          <div className="loader">
            <Spinner $size={16} />
          </div>
        )}
      </div>

      {errorMessage && <small>{errorMessage}</small>}
    </Container>
  )
}
