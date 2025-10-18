import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldXIcon } from "lucide-react";
import Link from "next/link";

export default function NotAdminRoute() {
    return (
        <div className="min-h-screen flex items-center justify-center md:px-0 px-4">
            <Card className='max-w-md w-full'>
                <CardHeader className="text-center">
                    <div className="bg-destructive/10 rounded-full w-fit mx-auto p-4">
                        <ShieldXIcon className="size-16 text-destructive" />
                    </div>
                    <CardTitle className="text-xl text-destructive">Access Restricted</CardTitle>
                    <CardDescription>Hey man! You know you are not an admin, so you cannot create any courses or stuffs like that...</CardDescription>
                </CardHeader>
                <CardContent>
                    <Link
                        href='/'
                        className={buttonVariants({
                            className: 'w-full'
                        })}
                    >
                        <ArrowLeft className="mr-1 size-4" />
                        Back to Home
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}