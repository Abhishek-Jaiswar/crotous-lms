'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import React from 'react'

const navigationItems = [
    { id: 1, name: "Home", path: '/home' },
    { id: 2, name: "Courses", path: '/courses' },
    { id: 3, name: "Dashboard", path: '/dashboard' },
]

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession()
    return (
        <div className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60'>
            <div className=' container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8'>
                <Link
                    href={'/'}
                    className='text-lg font-bold mr-8 '
                >
                    CROTOUS
                </Link>

                {/* Desktop navigation */}
                <nav className=' hidden md:flex  md:flex-1 md:items-center md:justify-between'>
                    <div className='flex items-center space-x-2'>
                        {navigationItems.map((items) => (
                            <Link
                                key={items.id}
                                href={items.path}
                                className='text-sm font-medium transition-colors hover:text-primary'
                            >
                                {items.name}
                            </Link>
                        ))}
                    </div>
                    <div className='flex items-center space-x-4'>
                        <ThemeToggle />

                        {isPending ? null : session ? (
                            <p>logged in</p>
                        ) : (
                            <>
                                <Link
                                    href={"/sign-in"}
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: 'secondary',
                                        className: "text-xs"
                                    })}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={"/sign-in"}
                                    className={buttonVariants({
                                        size: 'sm',
                                        className: "text-xs"

                                    })}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar