import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/Registration'
import CompleteProfilePage from './pages/CompleteProfilePage.jsx'
import ProfilePage from './pages/ProfilePage'
import ExplorePage from './pages/ExplorePage.jsx'
import CommunityPage from './pages/CommunityPage.jsx'



const router = createBrowserRouter([
  { path : '/', element: <App />,
    children: [ 
      {path: '/', element: <HomePage/>},
      {path: '/signup', element: <RegistrationPage/>},
      {path: '/login', element: <h1>Login Page</h1>},
      {path: '/explore', element: <ExplorePage/>},
      {path: '/communities', element:<CommunityPage/> },
      {path: '/complete-profile', element: <CompleteProfilePage/>},
      {path: '/profile', element: <ProfilePage/>}
   ],
  }
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />,
 
);
