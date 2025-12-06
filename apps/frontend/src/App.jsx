import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import { ConfigProvider } from 'antd'
import LoginPage from './Pages/login/login-page'
import TodoPage from './Pages/to-do-list/todo-list-page'

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#efb100',
          },
        }}
      >
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/todos' element={<TodoPage />} />
        </Routes>
      </ConfigProvider>
    </>
  )
}

export default App
