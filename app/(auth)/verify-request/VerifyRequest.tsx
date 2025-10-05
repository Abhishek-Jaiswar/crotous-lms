/* eslint-disable */

"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { authClient } from '@/lib/auth-client';
import { Loader } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const VerifyRequest = () => {
  const [otp, setOtp] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get('email') as string;
  const isOtpCompleted = otp.length === 6;

  const router = useRouter();

  function verifyOtp() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified");
            router.push("/");
          },
          onError: (error) => {
            toast.error("Error verifying Email/Otp!");
          },
        },
      });
    });
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email inbox.</CardTitle>
        <CardDescription>
          We have sent a verification email to your email address. Please open the email and enter the same code below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP maxLength={6} className="gap-2" onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <p className="text-sm text-muted-foreground text-center">Enter the 6-digit code sent to your email.</p>
        <Button disabled={emailPending || !isOtpCompleted} onClick={verifyOtp} className="w-full">
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Verifying Account</span>
            </>
          ) : (
            <span>Verify Account</span>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequest;