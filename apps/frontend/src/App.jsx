import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import LoginPage from './Pages/login/login-page'
import TodoPage from './Pages/to-do-list/todo-list-page'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/todos' element={<TodoPage />} />
      </Routes>
    </>
  )
}

export default App
