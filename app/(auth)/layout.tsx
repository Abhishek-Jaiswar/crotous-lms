import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <Link href="/" className={buttonVariants({
                variant: 'outline',
                className: 'absolute top-4 left-4'
            })}>
                <ArrowLeft className=" size-4" />
                Back
            </Link>

            <div className="w-full max-w-sm flex flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center text-xl font-bold">
                    CROTOUS
                </Link>
                {children}
                <div className="text-balance text-center text-xs text-muted-foreground">
                    By clicking continue, you agree to our&nbsp;
                    <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>
                    &nbsp;and&nbsp;
                    <Link href="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                </div>
            </div>
        </div>
    )
}