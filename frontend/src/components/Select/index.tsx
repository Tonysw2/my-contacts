import styled from 'styled-components'

export const Select = styled.select`
  appearance: none;

  height: 5rem;
  width: 100%;
  padding: 0 1.6rem;

  display: flex;
  align-items: center;

  font-family: 'Sora', sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.gray['500']};

  outline: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid transparent;
  border-radius: ${({ theme }) => theme.radii.base};

  transition: border-color 0.2s ease-in;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray['300']};
  }

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
  }

  option {
    background-color: #fff;
  }
`
