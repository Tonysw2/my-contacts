import { Link } from 'react-router-dom'
import ArrowSVG from '../../assets/icons/arrow.svg'
import { Container } from './styles'

type Props = {
  title: string
}

export function PageHeader({ title }: Props) {
  return (
    <Container>
      <Link to="/">
        <img
          alt="Voltar"
          src={ArrowSVG}
        />
        <span>Voltar</span>
      </Link>
      <h1>{title}</h1>
    </Container>
  )
}
