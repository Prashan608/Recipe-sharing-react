import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RichTextEditor from '../components/RichTextEditor'
import IngredientListEditor from '../components/IngredientListEditor'
import { recipeService } from '../services/recipeService'

export default function CreateRecipe() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [prepTime, setPrepTime] = useState('')
  const [servings, setServings] = useState('')
  const [category, setCategory] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState('')

  const handleSubmit = async () => {
    if (!title || ingredients.length === 0 || !instructions) {
      alert('Please fill in all required fields')
      return
    }

    const newRecipe = await recipeService.create({
      title,
      prepTime,
      servings,
      category,
      ingredients,
      instructions,
      summary: instructions.replace(/<[^>]+>/g, '').substring(0, 100) + '...', // Simple summary from HTML
      image: '' // Placeholder for now, or we could add image upload later
    })

    navigate(`/recipe/${newRecipe.id}`)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b pb-4 dark:border-gray-700">Create New Recipe</h1>
        <form className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recipe Title *</label>
            <input 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors text-lg" 
              placeholder="e.g., Grandmother's Apple Pie" 
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Category</option>
                  {['Breakfast', 'Dessert', 'Vegetarian', 'Pasta', 'Seafood', 'Chicken', 'Beef', 'Side', 'Miscellaneous'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prep Time</label>
                <input 
                  value={prepTime}
                  onChange={e => setPrepTime(e.target.value)}
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" 
                  placeholder="e.g. 20 mins" 
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Servings</label>
                <input 
                  value={servings}
                  onChange={e => setServings(e.target.value)}
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" 
                  placeholder="e.g. 4 people" 
                />
             </div>
          </div>

          <div className="space-y-2">
            <IngredientListEditor value={ingredients} onChange={setIngredients} />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Instructions & Details *</label>
            <div className="prose-editor">
              <RichTextEditor value={instructions} onChange={setInstructions} />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button type="button" onClick={() => navigate(-1)} className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">Cancel</button>
            <button type="button" onClick={handleSubmit} className="px-8 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md transition-colors">Publish Recipe</button>
          </div>
        </form>
      </div>
    </div>
  )
}
