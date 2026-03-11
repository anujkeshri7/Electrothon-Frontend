import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home.jsx'

const router = createBrowserRouter([
  { path : '/', element: <App />,
    children: [
      {path: '/', element: <Home/>},
      {path: 'about', element: <div>About</div>},
   ],
  }
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />,
 
);
