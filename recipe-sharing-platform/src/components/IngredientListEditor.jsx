import React, { useState } from 'react'

export default function IngredientListEditor({ value = [], onChange }) {
  const [items, setItems] = useState(value)

  const add = () => setItems(a => [...a, ''])
  const setAt = (idx, v) => setItems(a => a.map((it, i) => i === idx ? v : it))
  const remove = idx => setItems(a => a.filter((_, i) => i !== idx))

  React.useEffect(() => {
    if (onChange) onChange(items)
  }, [items, onChange])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Ingredients</label>
      {items.map((it, i) => (
        <div key={i} className="flex gap-2">
          <input className="flex-1 p-2 border rounded" value={it} onChange={e => setAt(i, e.target.value)} />
          <button type="button" className="px-2 bg-red-500 text-white rounded" onClick={() => remove(i)}>Remove</button>
        </div>
      ))}
      <button type="button" className="px-3 py-1 bg-green-600 text-white rounded" onClick={add}>Add Ingredient</button>
    </div>
  )
}
