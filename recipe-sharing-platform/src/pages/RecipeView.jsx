import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RatingStars from '../components/RatingStars'
import Comments from '../components/Comments'
import { recipeService } from '../services/recipeService'
import { analyzeNutrition } from '../services/nutritionService'

export default function RecipeView() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [nutrition, setNutrition] = useState(null)
  const [loadingNutrition, setLoadingNutrition] = useState(false)
  const [nutritionError, setNutritionError] = useState(null)

  useEffect(() => {
    const load = async () => {
      const r = await recipeService.getById(id)
      setRecipe(r)
    }
    load()
  }, [id])

  const handleAnalyzeNutrition = async () => {
    if (!recipe) return
    setLoadingNutrition(true)
    setNutritionError(null)
    try {
      const data = await analyzeNutrition(recipe)
      setNutrition(data)
    } catch (err) {
      setNutritionError(err.message || 'Failed to analyze nutrition')
    } finally {
      setLoadingNutrition(false)
    }
  }

  if (!recipe) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      {recipe.image && (
        <div className="h-64 sm:h-80 w-full relative">
          <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold shadow-sm">{recipe.title}</h1>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8">
        {!recipe.image && <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{recipe.title}</h1>}

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 mb-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Prep Time:</span> {recipe.prepTime || 'N/A'}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Servings:</span> {recipe.servings || 'N/A'}
          </div>
          <div className="flex items-center gap-2">
            <RatingStars value={4} />
            <span>(24 reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-8">
             <div>
               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                 <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                 Ingredients
               </h2>
               <ul className="space-y-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                 {recipe.ingredients && recipe.ingredients.map((ing, i) => (
                   <li key={i} className="flex items-start gap-2">
                     <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 shrink-0" />
                     <span>{ing}</span>
                   </li>
                 ))}
               </ul>
             </div>

             {/* Nutrition Section */}
             <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
               <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                 <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                 Nutrition
               </h2>
               
               {!nutrition && !loadingNutrition && (
                 <button 
                   onClick={handleAnalyzeNutrition}
                   className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium"
                 >
                   Calculate Nutrition
                 </button>
               )}

               {loadingNutrition && (
                 <div className="text-center py-2 text-gray-500 text-sm">Analyzing...</div>
               )}

               {nutritionError && (
                 <div className="text-red-500 text-sm mt-2">{nutritionError}</div>
               )}

               {nutrition && (
                 <div className="space-y-3">
                   <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-2">
                     <span className="font-bold text-gray-700 dark:text-gray-200">Calories</span>
                     <span className="font-bold text-gray-900 dark:text-white">{Math.round(nutrition.calories)}</span>
                   </div>
                   <div className="space-y-1 text-sm">
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Protein</span>
                       <span className="font-medium">{Math.round(nutrition.totalNutrients.PROCNT.quantity)}g</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Fat</span>
                       <span className="font-medium">{Math.round(nutrition.totalNutrients.FAT.quantity)}g</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-gray-600 dark:text-gray-400">Carbs</span>
                       <span className="font-medium">{Math.round(nutrition.totalNutrients.CHOCDF.quantity)}g</span>
                     </div>
                   </div>
                   <div className="text-xs text-gray-500 mt-2 text-center">
                     Powered by Edamam
                   </div>
                 </div>
               )}
             </div>
          </div>

          <div className="md:col-span-2">
             <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
               <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               Instructions
             </h2>
             <div 
               className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
               dangerouslySetInnerHTML={{ __html: recipe.instructions }}
             />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Comments & Reviews</h2>
          <Comments />
        </div>
      </div>
    </div>
  )
}
