import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import Error from './Pages/Error/Error.jsx';
import Login from './Pages/Login/Login.jsx';
import Register from './Pages/Register/Register.jsx';
import AllRecipes from './Pages/AllRecipes/AllRecipes.jsx'
import AddRecipe from './Pages/AddRecipe/AddRecipe.jsx'
import Home from './Pages/Home/Home.jsx';
import MyRecipes from './Pages/MyRecipes/MyRecipes.jsx';
import RecipeDetails from './Pages/RecipeDetails/RecipeDetails.jsx'
import PrivateRoute from './routes/PrivateRoute.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import Hero from './Pages/Hero/Hero.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
    {
      path: "/",
      element: <Hero></Hero>
    },
    {
      path: "/all-recipes",
      element: <AllRecipes></AllRecipes>
    },
    {
      path:"/add-recipe",
      element: <PrivateRoute> <AddRecipe></AddRecipe> </PrivateRoute>
    },
    {
      path:"/my-recipes",
      element: <PrivateRoute> <MyRecipes></MyRecipes> </PrivateRoute>
    },
    {
      path:"/recipe/:id",
      element: <PrivateRoute> <RecipeDetails></RecipeDetails> </PrivateRoute>
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
    },
  ]
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/*",
    element: <Error></Error>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,
)
