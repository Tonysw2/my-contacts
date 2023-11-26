import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Header } from '../components/Header'
import { ToastContainer } from '../components/Toast/ToastContainer'
import { Routes } from '../routes/index.routes'
import { GlobalStyle } from '../styles/global'
import { light } from '../styles/themes/light'
import { Container } from './styles'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={light}>
        <GlobalStyle />
        <ToastContainer />

        <Container>
          <Header />
          <Routes />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}
