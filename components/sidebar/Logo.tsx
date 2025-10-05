import { BirdIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href='/' className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-primary-foreground border border-border flex items-center justify-center rounded-md'>
                <BirdIcon className="!size-7" />
            </div>
            <span className="text-lg font-bold">CROTOUS</span>
        </Link>
    )
}

export default Logo