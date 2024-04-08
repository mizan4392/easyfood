import { useUpdateMyUser } from '@/apis/users'
import UserProfileForm from '@/forms/UserProfileForm'
import React from 'react'


export default function UserProfilePage() {
  const {updateUser,isLoading} = useUpdateMyUser()
  return (
    <UserProfileForm onSave={updateUser} isLoading={isLoading}/>
  )
}