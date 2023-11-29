import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`
const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`

type AnimationProps = {
  $isLeaving: boolean
}

export const Overlay = styled.div<AnimationProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  inset: 0;
  background-color: rgba(246, 245, 252, 0.7);

  animation: ${(props) => (props.$isLeaving ? fadeOut : fadeIn)} 0.3s forwards;
`
