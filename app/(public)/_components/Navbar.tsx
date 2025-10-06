'use client'

import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { buttonVariants } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import Link from 'next/link'
import React from 'react'
import UserDropdown from './UserDropdown'
import Logo from '@/components/sidebar/Logo'

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
                <Logo />

                {/* Desktop navigation */}
                <nav className=' hidden md:flex  md:flex-1 md:items-center md:justify-between ml-10'>
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
                            <>
                                <UserDropdown
                                    email={session.user.email}
                                    name={session?.user.name && session.user.name.length > 0
                                        ? session.user.name
                                        : session?.user.email.split("@")[0]}
                                    image={session?.user.image ?? `https://avatar.vercel.sh/${session?.user.image}`}
                                />
                            </>
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