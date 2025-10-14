'use client'

import React, { useCallback, useState } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { RenderEmptyState, RenderErrorState } from './RenderState'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: "image" | 'video'
}

const Uploader = () => {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    error: false,
    file: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: 'image'
  })

  const uploadFile = (file: File) => {
    setFileState((prev) => ({
      ...prev,
      uploading: true,
      progress: 0,
    }))

    try {
      
    } catch (error) {
      
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {


    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setFileState({
        file: file,
        uploading: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
        id: uuidv4(),
        isDeleting: false,
        fileType: "image"
      })
    }
  }, [])

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find((rejection) => rejection.errors[0].code === 'too-many-files')
      if (tooManyFiles) {
        toast.error('Too many files selected max is 1.')
      }

      const fileSizeTooBig = fileRejection.find((rejection) => rejection.errors[0].code === 'file-too-large')
      if (fileSizeTooBig) {
        toast.error("File size exeeds the limit.")
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024, // 5mb cal
    onDropRejected: rejectedFiles
  })
  return (
    <Card {...getRootProps()} className={cn('relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64', isDragActive ? "border-primary, bg-primary/20 border-solid" : "border-border hover:border-primary")}>
      <CardContent className='flex items-center justify-center w-full h-full'>
        <input {...getInputProps()} />
        <RenderEmptyState isDragActive={isDragActive} />

      </CardContent>
    </Card>
  )
}

export default Uploader