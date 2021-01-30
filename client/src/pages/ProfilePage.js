import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

import userStore from '../store/user'

const ProfilePage = () => {
  const { user } = userStore()
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)

  useEffect(() => {
    const token = Cookies.get('token')

    if (token != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  if (isLoggedIn != undefined && !isLoggedIn) {
    console.log('hello')
    return <Redirect to='/' />
  }

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