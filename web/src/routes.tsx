import { Home } from '@/pages/app/home'
import { Redirect } from '@/pages/app/redirect'
import { createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/app/404'

export const router = createBrowserRouter([
  {
    path: '/',
    // errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/:shortUrl', element: <Redirect /> },
      { path: '/404', element: <NotFound /> },
    ],
  },
])
