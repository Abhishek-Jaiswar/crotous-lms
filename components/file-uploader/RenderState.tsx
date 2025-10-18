import { cn } from '@/lib/utils'
import { CloudUploadIcon, ImageIcon, Loader, XIcon } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'


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
            <Button
                className='mt-4'>
                Retry File Selection
            </Button>
        </div>
    )
}

export const RenderUploadedState = ({
    previewUrl, isDeleting, handleRemoveFile
}: { previewUrl: string, isDeleting: boolean, handleRemoveFile: () => void }) => {
    return (
        <div className='text-center'>
            <Image
                src={previewUrl}
                alt='uploaded file'
                fill
                className='object-contain p-2'
            />

            <Button
                onClick={handleRemoveFile}
                disabled={isDeleting}
                type='button'
                variant='destructive'
                size='icon'
                className={cn(
                    'absolute top-4 right-4'
                )}
            >
                {isDeleting ? (
                    <>
                        <Loader className='size-4 animate-spin' />
                        Deleting...
                    </>
                ) : (
                    <XIcon className='size-4' />
                )}
            </Button>
        </div>
    )
}

export const RenderUploadingState = ({ progress, file }: { progress: number, file: File }) => {
    return (
        <div className='text-center flex items-center justify-center flex-col'>
            <p>{progress}</p>
            <p className='mt-2 text-sm font-medium text-foreground'>Uploading...</p>
            <p className='mt-1 text-xs text-muted-foreground truncate max-w-xs'>{file.name}</p>
        </div>
    )
}
