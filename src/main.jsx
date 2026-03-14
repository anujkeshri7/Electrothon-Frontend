import { Children, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/Registration'
import CompleteProfilePage from './pages/CompleteProfilePage.jsx'
import ProfilePage from './pages/ProfilePage'
import CommunityPage from './pages/CommunityPage.jsx'
import SignInPage from './components/signin/index.jsx'
import SignIn from './components/signin/index.jsx'
import AIRecommendations from './components/AIRecommendations/index.jsx'



const router = createBrowserRouter([
  { path : '/', element: <App />,
    children: [ 
      {path: '/', element: <HomePage/>},
      {path: '/signup', element: <RegistrationPage/>},
      {path: '/login', element:<SignIn/>},
      {path: '/communities', element:<CommunityPage/> },
      {path: '/complete-profile/:studentId', element: <CompleteProfilePage/>},
      {path: '/profile/me', element: <ProfilePage/>},
      {path: '/ai-recommendations', element: <AIRecommendations/>}
   ],
  }
])

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />,
 
);
