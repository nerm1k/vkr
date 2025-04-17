import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout/Layout'

function App() {

  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/" element={<MainPage />} /> */}
          </Route>
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/logout" element={<LogoutPage />} /> */}
        </Routes>
      </Provider>
    </>
  )
}

export default App
