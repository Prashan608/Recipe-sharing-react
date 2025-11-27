import axios from 'axios'

// Fallback data
const INITIAL_RECIPES = [
  { 
    id: 1, 
    title: 'Spaghetti Carbonara', 
    summary: 'Creamy, quick pasta with eggs, cheese, and pancetta.', 
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    category: 'Dinner',
    prepTime: '20 mins',
    servings: '4',
    ingredients: ['400g spaghetti', '4 large eggs', '100g pancetta', '50g pecorino cheese', '50g parmesan'],
    instructions: '1. Boil pasta.\n2. Fry pancetta.\n3. Beat eggs and cheese.\n4. Mix everything while hot.' 
  },
];

const STORAGE_KEY = 'recipe_share_recipes_v5';

// Helper to transform MealDB data
const transformMeal = (meal) => {
  // Extract ingredients
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}`.trim())
    }
  }

  return {
    id: Number(meal.idMeal),
    title: meal.strMeal,
    summary: `${meal.strArea} ${meal.strCategory} dish. ${meal.strInstructions.substring(0, 100)}...`,
    image: meal.strMealThumb,
    category: meal.strCategory,
    prepTime: '30 mins', // Mock data as API doesn't provide this
    servings: '4', // Mock data
    ingredients,
    instructions: meal.strInstructions.replace(/\r\n/g, '<br />')
  }
}

export const recipeService = {
  getAll: async () => {
    // Try to get from local storage first to preserve user creations
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }

    // If no storage, fetch from API
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      const meals = response.data.meals || []
      const recipes = meals.map(transformMeal)
      
      // Save to storage so we can add to it later
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
      return recipes
    } catch (error) {
      console.error("Failed to fetch recipes", error)
      return INITIAL_RECIPES
    }
  },

  getById: async (id) => {
    const recipes = await recipeService.getAll()
    return recipes.find(r => r.id == id)
  },

  create: async (recipeData) => {
    const recipes = await recipeService.getAll()
    const newRecipe = {
      ...recipeData,
      id: Date.now(), 
      createdAt: new Date().toISOString()
    }
    const updatedRecipes = [newRecipe, ...recipes]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes))
    return newRecipe
  },

  search: async (query = '', category = '') => {
    let recipes = await recipeService.getAll()
    
    if (category) {
      recipes = recipes.filter(r => r.category?.toLowerCase().includes(category.toLowerCase()))
    }

    if (query) {
      const q = query.toLowerCase()
      recipes = recipes.filter(r => 
        r.title.toLowerCase().includes(q) || 
        r.summary.toLowerCase().includes(q)
      )
    }

    return recipes
  }
};
