"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setIsEmailSent(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Check your email
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium">{getValues("email")}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Didn&apos;t receive the email? Check your spam folder or{" "}
          <button
            onClick={() => setIsEmailSent(false)}
            className="text-blue-600 hover:underline"
          >
            try again
          </button>
        </p>
        <Link href="/login">
          <Button variant="outline" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to sign in
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <Link
        href="/login"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to sign in
      </Link>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Forgot your password?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          No worries! Enter your email and we&apos;ll send you reset instructions.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
        </div>

        <Button type="submit" variant="gradient" className="w-full" loading={isLoading}>
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
