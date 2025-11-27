import React from 'react'

export default function RatingStars({ value = 0, onChange }) {
  const stars = [1,2,3,4,5]
  return (
    <div className="flex items-center">
      {stars.map(s => (
        <button key={s} type="button" onClick={() => onChange && onChange(s)} className={`px-1 ${s <= value ? 'text-yellow-400' : 'text-gray-300'}`}>
          ★
        </button>
      ))}
    </div>
  )
}
