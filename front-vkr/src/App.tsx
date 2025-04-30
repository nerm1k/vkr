import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'
import MainPage from './pages/MainPage/MainPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LoginPage from './pages/LoginPage/LoginPage'
import Logout from './components/Logout/Logout'
import SignUpPage from './pages/SignUpPage/SignUpPage'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
