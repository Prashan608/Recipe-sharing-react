import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Explore from './pages/Explore'
import RecipeView from './pages/RecipeView'
import CreateRecipe from './pages/CreateRecipe'
import EditRecipe from './pages/EditRecipe'
import Planner from './pages/Planner'
import Analytics from './pages/Analytics'
import Forum from './pages/Forum'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/recipe/:id" element={<RecipeView />} />
          <Route path="/create" element={<CreateRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/planner" element={<Planner />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
