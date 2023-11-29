import { Container } from './styles'

import SadSVG from '../../../../assets/sad.svg'

import { Button } from '../../../../components/Button'

type Props = {
  onTryAgain: () => void
}

export function ErrorStatus({ onTryAgain }: Props) {
  return (
    <Container>
      <img src={SadSVG} alt="Sad" />

      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  )
}
