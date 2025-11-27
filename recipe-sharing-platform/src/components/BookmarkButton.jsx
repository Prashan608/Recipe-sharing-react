import React, { useState } from 'react'

export default function BookmarkButton({ initial = false }) {
  const [booked, setBooked] = useState(initial)
  return (
    <button type="button" onClick={() => setBooked(b => !b)} className={`px-2 py-1 rounded ${booked ? 'bg-yellow-400' : 'bg-gray-200 dark:bg-gray-700'}`}>
      {booked ? 'Bookmarked' : 'Save'}
    </button>
  )
}
