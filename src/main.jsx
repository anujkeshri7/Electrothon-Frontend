import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/Registration'


const router = createBrowserRouter([
  { path : '/', element: <App />,
    children: [
      {path: '/', element: <HomePage/>},
      {path: '/signup', element: <RegistrationPage/>},
   ],
  }
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />,
 
);
