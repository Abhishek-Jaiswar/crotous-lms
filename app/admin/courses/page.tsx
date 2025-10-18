import { adminGetCourses } from '@/app/data/admin/admin-get-courses'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import AdminCourseCard from './_components/AdminCourseCard'

const CoursePage = async () => {
  const data = await adminGetCourses()
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Your Courses</h1>
        <Link
          className={buttonVariants()}
          href={'/admin/courses/create'}>
          Create Course
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7'>
        {data.map((course) => (
          <AdminCourseCard
            key={course.id}
            data={course}
          />
        ))}
      </div>
    </>
  )
}

export default CoursePage