import { useGetMyUser, useUpdateMyUser } from '@/apis/users'
import UserProfileForm from '@/forms/UserProfileForm'
import React from 'react'


export default function UserProfilePage() {
  const {currentUser,isLoading:isGetLoading} = useGetMyUser()
  const {updateUser,isLoading:isUpdateLoading} = useUpdateMyUser()

  if(isGetLoading){
    return <div>Loading...</div>
  }
  if(!currentUser){
    return <span>Unable to load user profile</span>
  }
  return (
    <UserProfileForm currentUser={currentUser}  onSave={updateUser} isLoading={isUpdateLoading}/>
  )
}