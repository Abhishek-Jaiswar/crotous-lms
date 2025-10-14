import { cn } from '@/lib/utils'
import { CloudUploadIcon, ImageIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'


export const RenderEmptyState = ({ isDragActive }: { isDragActive: boolean }) => {
    return (
        <div className='text-center'>
            <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-primary mb-4'>
                <CloudUploadIcon className={cn(
                    'size-6 text-muted',
                    isDragActive && "text-secondary")}
                />
            </div>
            <p className='text-base font-semibold text-foreground'>Drop your file here or <span className='text-primary font-bold cursor-pointer'>click to upload</span></p>
            <Button type='button' className='mt-4'>Select File</Button>
        </div>
    )
}

export const RenderErrorState = () => {
    return (
        <div className='text-center'>
            <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/10 mb-4'>
                <ImageIcon className={cn(
                    'size-6 text-destructive',)}
                />
            </div>
            <p className='text-base font-semibold text-muted-foreground'>Upload Failed</p>
            <p className='text-xs mt-1 font-semibold text-muted-foreground'>Someting went wrong</p>
            <Button type='button' className='mt-4'>
                Retry File Selection
            </Button>
        </div>
    )
}
