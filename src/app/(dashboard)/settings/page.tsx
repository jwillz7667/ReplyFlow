"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, User, Building2, Palette, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/lib/supabase/client";
import { BUSINESS_TYPE_OPTIONS, TONE_OPTIONS } from "@/types";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  brandVoice: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

interface UserSettings {
  id: string;
  name: string;
  email: string;
  businessName: string | null;
  businessType: string | null;
  brandVoice: string | null;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<UserSettings | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        router.push("/login");
        return;
      }

      const response = await fetch("/api/user");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setValue("name", userData.name || "");
        setValue("businessName", userData.businessName || "");
        setValue("businessType", userData.businessType || "");
        setValue("brandVoice", userData.brandVoice || "professional");
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    setSaving(true);
    try {
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      toast({
        title: "Settings saved",
        description: "Your profile has been updated successfully.",
      });

      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your account and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="business" className="gap-2">
            <Building2 className="w-4 h-4" />
            Business
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <Palette className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    className="mt-1"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="mt-1 bg-gray-50"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed.
                  </p>
                </div>

                <Button type="submit" loading={saving}>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Settings</CardTitle>
              <CardDescription>
                Configure your business details for personalized responses.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="Your Business Name"
                    className="mt-1"
                    {...register("businessName")}
                  />
                </div>

                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    defaultValue={user?.businessType || ""}
                    onValueChange={(value) => setValue("businessType", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUSINESS_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" loading={saving}>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Response Preferences</CardTitle>
              <CardDescription>
                Set your default response style and tone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="brandVoice">Default Response Tone</Label>
                  <Select
                    defaultValue={user?.brandVoice || "professional"}
                    onValueChange={(value) => setValue("brandVoice", value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {TONE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" loading={saving}>
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger zone */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <h4 className="font-medium">Sign Out</h4>
              <p className="text-sm text-gray-500">
                Sign out of your account on this device.
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <h4 className="font-medium text-red-600">Delete Account</h4>
              <p className="text-sm text-gray-500">
                Permanently delete your account and all data.
              </p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
