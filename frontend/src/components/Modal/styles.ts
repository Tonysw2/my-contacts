import styled from 'styled-components'

export const Overlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
`

type ContainerStyleProps = {
  $danger?: boolean
}

export const Container = styled.div<ContainerStyleProps>`
  width: 100%;
  max-width: 45rem;

  padding: 2.4rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: ${(props) => props.theme.radii.base};
  background-color: ${(props) => props.theme.colors.gray['100']};

  & > h1 {
    font-size: 2.2rem;
    color: ${(props) =>
      props.$danger
        ? props.theme.colors.danger.main
        : props.theme.colors.gray['500']};
  }

  .modal-body {
    margin-top: 1.6rem;
  }
`

export const Footer = styled.footer`
  margin-top: 3.2rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-btn {
    margin-right: 1.6rem;

    border: none;
    background-color: transparent;

    color: ${(props) => props.theme.colors.gray['300']};

    &:disabled {
      cursor: not-allowed;
    }
  }
`
