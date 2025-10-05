"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, Loader, Send } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
    const [githubPending, startGithubPending] = useTransition()
    const [emailPending, startEmailTransition] = useTransition()
    const [googlePending, startGoogleTransition] = useTransition()
    const [email, setEmail] = useState('')

    const router = useRouter()

    async function signInWithGihub() {
        startGithubPending(async () => {
            await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Signed in with GitHub, you will be redirected...")
                    },
                    onError: () => {
                        toast.error("Internal server error")
                    }
                }
            })
        })
    }

    async function SignInWithGoogle() {
        startGoogleTransition(async () => {
            await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in successfully")
                        router.push("/")
                    },
                    onError: () => {
                        toast.error("Failed to login with google!")
                    }
                }
            })
        })
    }

    function SignInWithEmail() {
        startEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email: email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email sent")
                        router.push(`/verify-request?email=${email}`)
                    },
                    onError: () => {
                        toast.error("Error sending email")
                    }
                }
            })
        })
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Welcome Back!</CardTitle>
                <CardDescription>Login with your Email or GitHub Account</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <Button
                    disabled={googlePending}
                    onClick={SignInWithGoogle}
                    className="w-full" variant="outline">
                    {googlePending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <span>Signing with google...</span>
                        </>
                    ) : (
                        <>
                            <FcGoogle className="size-4" />
                            Sign in with Google
                        </>
                    )}
                </Button>
                <Button
                    disabled={githubPending}
                    onClick={signInWithGihub}
                    className="w-full" variant="outline">
                    {githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin" />
                            <span>Signing with GitHub...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />
                            Sign in with GitHub
                        </>
                    )}
                </Button>

                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-card px-2 text-muted-foreground ">Or continue with</span>
                </div>

                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="crotous@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        disabled={emailPending}
                        onClick={SignInWithEmail}
                    >
                        {emailPending ? (
                            <>
                                <Loader className='size-4 animate-spin' />
                                <span>Signing with email...</span>
                            </>
                        ) : (
                            <>
                                <Send className='size-4' />
                                <span>Continue with Email</span>
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginForm