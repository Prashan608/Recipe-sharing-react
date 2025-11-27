import axios from 'axios'

const API_URL = 'https://api.edamam.com/api/nutrition-details'
const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY

const MOCK_NUTRITION = {
  calories: 450,
  totalNutrients: {
    PROCNT: { quantity: 25 },
    FAT: { quantity: 15 },
    CHOCDF: { quantity: 55 }
  }
}

export const analyzeNutrition = async (recipe) => {
  if (!APP_ID || !APP_KEY) {
    console.warn('Edamam API credentials missing, returning mock data')
    // Return mock data instead of throwing error to allow UI to "work" for demo
    return new Promise(resolve => setTimeout(() => resolve(MOCK_NUTRITION), 1000))
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        title: recipe.title,
        ingr: recipe.ingredients,
      },
      {
        params: {
          app_id: APP_ID,
          app_key: APP_KEY,
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Nutrition analysis failed:', error)
    if (error.response && error.response.status === 555) {
        throw new Error('Low quality inputs. Please provide more detailed ingredient quantities.')
    }
    throw error
  }
}
