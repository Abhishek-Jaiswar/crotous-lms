import { AdminCourseType } from '@/app/data/admin/admin-get-courses'
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'
import { useConstructUrl } from '@/hooks/use-construct-url';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ArrowRight, EyeIcon, MoreVertical, PencilIcon, School, TimerIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface iAppProps {
    data: AdminCourseType;
}

const AdminCourseCard = ({ data }: iAppProps) => {
    const thumbnailUrl = useConstructUrl(data.fileKey)
    return (
        <Card className='group relative py-0 gap-0'>
            {/* absolute dropdown */}
            <div className=' absolute top-2 right-2 z-10'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='secondary' size='icon'>
                            <MoreVertical className='size-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-28'>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/courses/${data.id}/edit`}
                                className='text-xs'
                            >
                                <PencilIcon className='size-3 mr-1' />
                                Edit Course
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/courses/${data.slug}`}
                                className='text-xs'
                            >
                                <EyeIcon className='size-3 mr-1' />
                                Preview
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link
                                href={`/admin/courses/${data.id}/delete`}
                                className='text-xs'
                            >
                                <Trash2Icon className='size-3 mr-1 text-destructive' />
                                Delete
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Image
                src={thumbnailUrl}
                alt='Thumbnail Url'
                width={600}
                height={400}
                className='w-full rounded-t-lg aspect-video h-full object-cover'
            />
            <CardContent className='p-4'>
                <Link
                    href={`/admin/courses/${data.id}/edit`}
                    className='font-medium text-lg line-clamp-2 hover:underline group-hover:text-primary transition-colors'
                >
                    {data.title}
                </Link>
                <p className='line-clamp-2 text-sm text-muted-foreground leading-tight'>{data.smallDescription}</p>

                <div className='mt-4 flex items-center gap-x-5'>
                    <div className='flex items-center gap-x-2'>
                        <TimerIcon className='size-6 p-1 rounded-md text-primary bg-primary/10' />
                        <p className='text-sm text-muted-foreground'> {data.duration}</p>
                    </div>
                    <div className='flex items-center gap-x-2'>
                        <School className='size-6 p-1 rounded-md text-primary bg-primary/10' />
                        <p className='text-sm text-muted-foreground'> {data.level}</p>
                    </div>
                </div>

                <Link
                    href={`/admin/courses/${data.id}/edit`}
                    className={buttonVariants({
                        className: 'w-full mt-4'
                    })}
                >
                    Edit Course
                    <ArrowRight className='size-4' />
                </Link>
            </CardContent>
        </Card>
    )
}

export default AdminCourseCard

