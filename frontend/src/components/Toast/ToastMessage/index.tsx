import CheckSVG from '../../../assets/icons/check-circle.svg'
import XCircleSVG from '../../../assets/icons/x-circle.svg'
import { Container, ContainerStyleProps } from './styles'

type Props = ContainerStyleProps & {
  text: string
}

export function ToastMessage({ text, $variant = 'default' }: Props) {
  return (
    <Container $variant={$variant}>
      {$variant === 'success' && <img src={CheckSVG} />}
      {$variant === 'danger' && <img src={XCircleSVG} />}
      <strong>{text}</strong>
    </Container>
  )
}
