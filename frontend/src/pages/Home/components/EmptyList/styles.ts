import styled from 'styled-components'

export const Container = styled.div`
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
