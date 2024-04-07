import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'


export default function LoadingButton() {
  return (
    <Button disabled>
        <Loader2 className='m-2 h-2 w-4 animate-spin'/>
        Loading...
    </Button>
  )
}