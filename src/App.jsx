import React from 'react'
import AppRoutes from './utils/AppRoutes'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
export const API_URL  = 'https://65d30847522627d50107dcf1.mockapi.io/blogs'

function App() {

  const router = createBrowserRouter(AppRoutes)
  return <>
    <RouterProvider router={router} />
  </>
}

export default App