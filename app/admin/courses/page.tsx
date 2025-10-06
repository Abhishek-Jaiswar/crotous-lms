import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Your Courses</h1>
        <Link
          className={buttonVariants()}
          href={'/admin/courses'}>
          Create Course
        </Link>
      </div>
      <div>
        <p className='text-base text-muted-foreground'>Your courses will appear here.</p>
      </div>
    </>
  )
}

export default page