import React from 'react'

import userStore from '../store/user'

const ProfilePage = () => {
  const { user } = userStore()

  return (
    <div className="py-4">
      <h2>Profile</h2>
      <ul class="list-group">
        <li class="list-group-item">Name: { user.name }</li>
        <li class="list-group-item">E-mail: { user.email }</li>
      </ul>
    </div>
  )
}

export default ProfilePage