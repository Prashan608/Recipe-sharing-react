import React, { useState } from 'react'

export default function Comments({ initial = [] }) {
  const [comments, setComments] = useState(initial)
  const [text, setText] = useState('')

  const add = () => {
    if (!text.trim()) return
    setComments(c => [...c, { id: Date.now(), text }])
    setText('')
  }

  return (
    <section className="mt-8">
      <h3 className="font-semibold">Comments</h3>
      <div className="mt-2 space-y-2">
        {comments.map(c => (
          <div key={c.id} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">{c.text}</div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input className="flex-1 p-2 border rounded" value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment..." />
        <button type="button" className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={add}>Post</button>
      </div>
    </section>
  )
}
