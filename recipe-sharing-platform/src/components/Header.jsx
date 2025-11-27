import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-indigo-600 dark:text-indigo-400">RecipeShare</Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Home</Link>
          <Link to="/explore" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Explore</Link>
          {user && (
            <>
              <Link to="/planner" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Meal Planner</Link>
              <Link to="/forum" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Community</Link>
              <Link to="/analytics" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Analytics</Link>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/create" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                Share Recipe
              </Link>
              <div className="flex items-center gap-2">
                <Link to="/profile" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">{user.name?.[0] || 'U'}</span>
                  </div>
                </Link>
                <button onClick={logout} className="text-sm text-red-600 hover:text-red-800">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
