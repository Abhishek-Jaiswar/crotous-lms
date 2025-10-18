import { getAdminCourse } from '@/app/data/admin/admin-get-course'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { EditCourseForm } from './_components/EditCourseForm'
import { CourseStructure } from './_components/CourseStructure'

type Params = Promise<{ id: string }>

const CourseEditPage = async ({ params }: { params: Params }) => {
    const { id } = await params
    const data = await getAdminCourse(id)
    return (
        <div className='w-full h-full'>
            <h1 className='text-3xl font-bold mb-8'>
                Edit course: {" "}
                <span className='text-primary underline'>{data.title}</span>
            </h1>
            <Tabs defaultValue='basic-info' className='w-full'>
                <TabsList className='grid grid-cols-2 w-full'>
                    <TabsTrigger value='basic-info'>
                        Basic Info
                    </TabsTrigger>
                    <TabsTrigger value='course-structure'>
                        Course Structure
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='basic-info'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Info</CardTitle>
                            <CardDescription>Edit basic information about the course</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <EditCourseForm data={data} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value='course-structure'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course structure</CardTitle>
                            <CardDescription>Here you can update your course structure</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <CourseStructure data={data} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default CourseEditPage