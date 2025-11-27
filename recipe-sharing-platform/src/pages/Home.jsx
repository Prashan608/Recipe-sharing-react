import React, { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import { Link } from 'react-router-dom'
import { recipeService } from '../services/recipeService'

export default function Home() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const loadRecipes = async () => {
      const allRecipes = await recipeService.getAll()
      // Show only the first 4 recipes as trending
      setRecipes(allRecipes.slice(0, 4))
    }
    loadRecipes()
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="absolute inset-0">
          <img 
            className="h-full w-full object-cover" 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
            alt="Cooking background" 
          />
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" />
        </div>
        <div className="relative px-6 py-16 sm:py-24 lg:py-32 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Share Your Culinary <br className="hidden sm:block" /> Masterpieces
          </h1>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Discover, share, and organize your favorite recipes with a community of food lovers.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/explore" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors">
              Explore Recipes
            </Link>
            <Link to="/create" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors">
              Share Recipe
            </Link>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trending Now</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Popular recipes from our community this week</p>
          </div>
          <Link to="/explore" className="text-indigo-600 hover:text-indigo-500 font-medium flex items-center gap-1">
            View all <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(r => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      </div>

      {/* Categories Preview */}
      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-8 sm:p-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Dessert', 'Vegetarian', 'Pasta', 'Seafood', 'Chicken', 'Beef', 'Side', 'Miscellaneous'].map((cat) => (
            <Link to={`/explore?category=${cat}`} key={cat} className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all text-center border border-gray-100 dark:border-gray-700">
              <span className="block text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
