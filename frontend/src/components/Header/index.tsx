import { ComponentProps } from 'react'
import LogoSVG from '../../assets/logo.svg'
import { Container } from './styles'

type Props = ComponentProps<'header'>

export function Header(props: Props) {
  return (
    <Container {...props}>
      <img
        src={LogoSVG}
        alt="Logo MyContacts"
        width={201}
      />
    </Container>
  )
}
