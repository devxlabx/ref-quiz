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
import PrivateRoute from "./services/PrivateRoute";

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    return savedTheme || 'light'
  })

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
                    <Route path="/" element={<Navigate to="/main" replace />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Routes protégées */}
                    <Route
                        path="/main"
                        element={
                            <PrivateRoute>
                                <Main />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/topics"
                        element={
                            <PrivateRoute>
                                <QuizTopicsScreen />
                            </PrivateRoute>
                        }
                    />

                    {/* Redirection par défaut */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
          </Router>
        </QuizProvider>
      </ThemeProvider>
  )
}

export default App
