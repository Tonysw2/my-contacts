import { ReactNode } from 'react'
import { Container } from './styles'

type Props = {
  children: ReactNode
  errorMessage?: string
}

export function FormGroup({ children, errorMessage }: Props) {
  return (
    <Container>
      {children}
      {errorMessage && <small>{errorMessage}</small>}
    </Container>
  )
}
