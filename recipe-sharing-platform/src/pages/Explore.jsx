import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { recipeService } from '../services/recipeService'

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  
  const category = searchParams.get('category') || ''

  useEffect(() => {
    const load = async () => {
      const results = await recipeService.search(searchTerm, category)
      setRecipes(results)
    }
    load()
  }, [searchTerm, category])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams({ q: searchTerm, ...(category ? { category } : {}) })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {category ? `${category} Recipes` : 'Explore Recipes'}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Discover new tastes and inspirations for your next meal.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Search
          </button>
        </form>

        {/* Category Filter Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button 
            onClick={() => setSearchParams({})}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}
          >
            All
          </button>
          {['Dessert', 'Vegetarian', 'Pasta', 'Seafood', 'Chicken', 'Beef', 'Side', 'Miscellaneous'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSearchParams({ category: cat })}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map(r => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-lg">No recipes found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setSearchParams({})}} className="mt-4 text-indigo-600 hover:text-indigo-500 font-medium">
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
