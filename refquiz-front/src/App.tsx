import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import Main from './features/Main'
import ToggleTheme from './components/ToggleTheme'
import QuizProvider from './context/QuizProvider'
import './index.css'
import { GlobalStyles } from './styles/Global'
import { themes } from './styles/Theme'
import LoginPage from "./pages/LoginPage";
import QuizTopicsScreen from "./features/QuizTopicsScreen";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const authToken = Cookies.get('authToken')
    setIsAuthenticated(!!authToken)
  }, [])

  const toggleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setCurrentTheme(checked ? 'dark' : 'light')
    localStorage.setItem('theme', checked ? 'dark' : 'light')
  }

  const theme = currentTheme === 'light' ? themes.light : themes.dark

  return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QuizProvider>
          <Router>
            <ToggleTheme
                onChange={toggleTheme}
                currentTheme={currentTheme}
                checked={currentTheme === 'dark'}
                id="toggleTheme"
                value="theme"
            />
            <Routes>
              {/* Route principale avec redirection basée sur l'état d'authentification */}
              <Route
                  path="/"
                  element={
                    isAuthenticated ? (
                        <Navigate to="/main" replace />
                    ) : (
                        <Navigate to="/login" replace />
                    )
                  }
              />

              {/* Route vers la page de connexion */}
              <Route path="/login" element={<LoginPage />} />
                {/* Route vers la page de création d'un compte */}
               <Route path="/register" element={<RegisterPage />} />

              {/* Route principale après connexion */}
              <Route path="/main" element={<Main />} />

              {/* Route vers l'écran des sujets de quiz */}
              <Route path="/topics" element={<QuizTopicsScreen />} />

              {/* Route par défaut pour les pages non trouvées */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

          </Router>
        </QuizProvider>
      </ThemeProvider>
  )
}

export default App
