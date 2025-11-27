import React from 'react'

export default function RichTextEditor({ value = '', onChange }) {
  return (
    <div>
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg min-h-[200px] dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Write your detailed instructions here..."
      />
      <p className="text-xs text-gray-500 mt-1">Rich text formatting is currently disabled.</p>
    </div>
  )
}
