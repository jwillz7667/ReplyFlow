"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type SignupForm = z.infer<typeof signupSchema>;

const passwordRequirements = [
  { regex: /.{8,}/, label: "At least 8 characters" },
  { regex: /[A-Z]/, label: "One uppercase letter" },
  { regex: /[a-z]/, label: "One lowercase letter" },
  { regex: /[0-9]/, label: "One number" },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });

      router.push("/login?message=check-email");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred during sign up";
      toast({
        title: "Sign up failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred during sign up";
      toast({
        title: "Sign up failed",
        description: message,
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Create your account
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Start your free trial. No credit card required.
        </p>
      </div>

      {/* Google Sign Up */}
      <Button
        variant="outline"
        className="w-full mb-6"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
            Or continue with email
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className="pl-10"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>
        </div>

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

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="pl-10 pr-10"
              error={errors.password?.message}
              {...register("password", {
                onChange: (e) => setPassword(e.target.value),
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password requirements */}
          <div className="mt-3 space-y-2">
            {passwordRequirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-sm ${
                  req.regex.test(password)
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                <Check className={`w-4 h-4 ${req.regex.test(password) ? "opacity-100" : "opacity-30"}`} />
                {req.label}
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" variant="gradient" className="w-full" loading={isLoading}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:text-blue-500 font-medium"
        >
          Sign in
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-gray-700">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-gray-700">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
