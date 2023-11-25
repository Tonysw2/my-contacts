import styled, { keyframes } from 'styled-components'

export const Container = styled.div``

type HeaderStyleProps = {
  $justifyContent: string
}

export const Header = styled.header<HeaderStyleProps>`
  margin-top: 3.2rem;
  padding-bottom: 1.6rem;

  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justifyContent};

  border-bottom: 2px solid ${(props) => props.theme.colors.gray['300']};

  & > strong {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.gray['500']};
  }

  & > a {
    padding: 0.8rem 1.6rem;

    text-decoration: none;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary.main};

    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    border-radius: ${({ theme }) => theme.radii.base};

    transition: all 0.2s ease-in;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray['100']};
    }
  }
`

export const ErrorContainer = styled.div`
  margin-top: 1.6rem;

  display: flex;
  align-items: center;

  .details {
    margin-left: 2.4rem;

    & > strong {
      margin-bottom: 0.8rem;
      display: block;
      font-size: 2.2rem;
      color: ${(props) => props.theme.colors.danger.main};
    }
  }
`

type ListContainerStyleProps = {
  $orderBy: 'asc' | 'desc'
}

export const ListContainer = styled.div<ListContainerStyleProps>`
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

export const EmptyListContainer = styled.div`
  margin-top: 1.6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  & > p {
    text-align: center;
    color: ${(props) => props.theme.colors.gray['300']};

    & > strong {
      color: ${(props) => props.theme.colors.primary.main};
    }
  }
`

export const SearchNotFoundContainer = styled.div`
  margin-top: 1.6rem;
  display: flex;
  align-items: flex-start;

  & > span {
    margin-left: 2.4rem;
    word-break: break-word;
    color: ${(props) => props.theme.colors.gray['300']};
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
