import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import SignUp from './pages/SignUp.tsx'
import Home from './pages/Home.tsx'
import Studio from './pages/Studio.tsx'
import Course from './pages/Course.tsx'
import Watch from './pages/Watch.tsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/register',
    element : <SignUp/>
  },
  {
    path:'/dashboard',
    element : <Home/>
  },
  {
    path:'/studio',
    element : <Studio/>
  },
  {
    path:'/course/:courseId',
    element:<Course/>
  },
  {
    path:'/watch/:videoId',
    element : <Watch/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <RouterProvider router={router} />
  </React.StrictMode>,
)
