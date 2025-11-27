import React from 'react'
import { Link } from 'react-router-dom'
import BookmarkButton from './BookmarkButton'
import RatingStars from './RatingStars'

export default function RecipeCard({ recipe }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <Link to={`/recipe/${recipe.id}`} className="block relative group h-48 overflow-hidden">
        {recipe.image && !imageError ? (
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              console.error("Image failed to load:", recipe.image);
              e.target.onerror = null; 
              setImageError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/recipe/${recipe.id}`} className="block">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-1">{recipe.title}</h3>
          </Link>
          <BookmarkButton />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-1">{recipe.summary}</p>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <RatingStars value={3} />
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">25 mins</span>
        </div>
      </div>
    </article>
  )
}
