import { Container } from './styles'

import MagnifySVG from '../../../../assets/magnifier-question.svg'

type Props = {
  searchTerm: string
}

export function SearchNotFound({ searchTerm }: Props) {
  return (
    <Container>
      <img src={MagnifySVG} alt="Magnify question" />
      <span>
        Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.
      </span>
    </Container>
  )
}
