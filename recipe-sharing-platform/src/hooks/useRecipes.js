import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    api.get('/recipes').then(res => {
      if (!mounted) return
      setRecipes(res.data || [])
    }).catch(() => {}).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  return { recipes, setRecipes, loading }
}
