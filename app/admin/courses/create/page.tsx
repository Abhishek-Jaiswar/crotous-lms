'use client'

import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { courseSchema, CourseSchemaType } from '@/lib/zodSchema'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'

const CourseCreatingPage = () => {
    const form = useForm<CourseSchemaType>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            title: "",
            description: "",
            fileKey: "",
            price: 0,
            duration: 0,
            level: "Beginner",
            category: "",
            status: "Draft",
            slug: "",
            smallDescription: "",
        }
    })

    const onSubmit = (values: CourseSchemaType) => {
        console.log(values);

    }
    return (
        <>
            <div className='flex items-center gap-4'>
                <Link
                    className={buttonVariants({
                        size: "icon",
                        variant: "outline"
                    })}
                    href={'/admin/courses'} >
                    <ArrowLeftIcon />
                </Link>
                <h1 className='text-2xl font-bold'>Create Courses</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                        Provide basic information of the course
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>


                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    )
}

export default CourseCreatingPage