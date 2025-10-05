'use client'

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, Brain, Headphones, LucideIcon, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";

interface featureProps {
    id: number,
    title: string,
    description: string,
    icon: LucideIcon
}

const features: featureProps[] = [
    {
        id: 1,
        title: "Comprehensive Courses",
        description: "Access structured learning paths covering every topic step-by-step.",
        icon: BookOpen,
    },
    {
        id: 2,
        title: "AI-Powered Guidance",
        description: "Get real-time personalized feedback and study recommendations.",
        icon: Brain,
    },
    {
        id: 3,
        title: "Audio-Based Learning",
        description: "Listen, learn, and practice hands-free with our voice-first experience.",
        icon: Headphones,
    },
    {
        id: 4,
        title: "Gamified Progress",
        description: "Earn badges and milestones as you master new skills effortlessly.",
        icon: Sparkles,
    },
];

export default function Home() {
    const { data: session } = authClient.useSession()
    const router = useRouter()

    async function signOutHandler() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/")
                    toast.success("Logged out successfully.")
                }
            }
        })
    }

    return (
        <>
            <section className=" py-20 relative">

                <div className="flex flex-col items-center space-y-8">
                    <Badge
                        variant='outline'
                        className="text-xs"
                    >The Future of Online Education</Badge>
                    <h1 className="text-4xl text-center font-bold tracking-tight md:text-5xl ">
                        Elevate Your Learning Experience
                    </h1>
                    <p className="text-sm text-muted-foreground max-w-sm text-center md:max-w-xl">Discover a new way to learn with our modern, interactive learning management system. Access high-quality courses anytime, anywhere.</p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <Link
                            href="/courses"
                            className={buttonVariants({
                                size: 'lg'
                            })}
                        >
                            Explore Courses
                        </Link>
                        <Link
                            href="/sign-in"
                            className={buttonVariants({
                                size: 'lg',
                                variant: 'outline'
                            })}
                        >
                            Sign In
                        </Link>
                    </div>
                </div>

            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map(({ id, title, description, icon: Icon }) => (
                    <Card key={id} className=" hover:shadow-md transition-shadow duration-200">
                        <CardHeader>
                            <Icon className="size-10" />
                            <CardTitle>
                                <p className="text-lg text-neur">{title}</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{description}</p>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </>
    );
}
