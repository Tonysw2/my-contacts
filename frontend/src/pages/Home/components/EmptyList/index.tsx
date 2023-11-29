import EmptyBoxSVG from '../../../../assets/empty-box.svg'

import { Container } from './styles'

export function EmptyList() {
  return (
    <Container>
      <img src={EmptyBoxSVG} alt="Empty box" />
      <p>
        Você ainda não tem nenhum contato cadastrado! <br /> Clique no botão
        <strong> ”Novo contato”</strong> à cima para <br /> cadastrar o seu
        primeiro!
      </p>
    </Container>
  )
}
