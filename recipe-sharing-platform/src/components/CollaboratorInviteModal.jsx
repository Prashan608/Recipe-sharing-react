import React, { useState } from 'react'

export default function CollaboratorInviteModal({ open, onClose, onInvite }) {
  const [email, setEmail] = useState('')
  if (!open) return null

  const invite = () => {
    if (onInvite) onInvite(email)
    setEmail('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-4 rounded w-full max-w-md">
        <h3 className="font-semibold">Invite Collaborator</h3>
        <input className="w-full p-2 border rounded mt-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1" onClick={onClose}>Cancel</button>
          <button className="px-3 py-1 bg-indigo-600 text-white rounded" onClick={invite}>Invite</button>
        </div>
      </div>
    </div>
  )
}
