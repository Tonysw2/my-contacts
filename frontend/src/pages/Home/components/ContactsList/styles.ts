import styled, { keyframes } from 'styled-components'

type ListContainerStyleProps = {
  $orderBy: 'asc' | 'desc'
}

export const Container = styled.div<ListContainerStyleProps>`
  margin-top: 2.4rem;
  padding-bottom: 2.4rem;

  & > header > button[type='button'] {
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    gap: 0.8rem;

    & > span {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    & > img {
      animation: ${(props) =>
          props.$orderBy === 'desc' ? rotateAndBounce : rotateAndBounceBack}
        0.2s forwards;
    }
  }
`

export const List = styled.ul`
  margin-top: 0.8rem;

  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`

export const Card = styled.div`
  padding: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
  border-radius: ${({ theme }) => theme.radii.base};
  background-color: ${({ theme }) => theme.colors.gray['100']};

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    .contact-name {
      display: flex;
      align-items: center;
      gap: 0.8rem;

      & > strong {
        color: ${({ theme }) => theme.colors.gray['500']};
      }

      & > small {
        padding: 0.2rem 0.6rem;

        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};

        border-radius: ${({ theme }) => theme.radii.base};
        background-color: ${({ theme }) => theme.colors.primary.lightest};
      }
    }

    & > span {
      display: block;

      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.gray['300']};
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    & > button[type='button'] {
      border: none;
      background-color: transparent;
    }
  }
`

const rotateAndBounce = keyframes`
  0% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(180deg);
  }
  85% {
    transform: rotate(200deg);
  }
  100% {
    transform: rotate(180deg);
  }
`

const rotateAndBounceBack = keyframes`
  0% {
    transform: rotate(180deg);
  }
  70% {
    transform: rotate(0deg);
  }
  85% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
`
