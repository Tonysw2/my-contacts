import styled from 'styled-components'

export const Container = styled.div`
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
