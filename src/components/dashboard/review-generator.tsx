"use client";

import { useState } from "react";
import type { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Copy, RefreshCw, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TONE_OPTIONS, PLATFORM_OPTIONS } from "@/types";

const generateSchema = z.object({
  reviewText: z.string().min(10, "Review must be at least 10 characters"),
  reviewRating: z.number().min(1).max(5).optional(),
  tone: z.string().default("professional"),
  platform: z.string().optional(),
});

type GenerateForm = z.infer<typeof generateSchema>;

interface ReviewGeneratorProps {
  user: User;
}

export function ReviewGenerator({ user }: ReviewGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<GenerateForm>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      tone: "professional",
    },
  });

  const reviewText = watch("reviewText");

  const onSubmit = async (data: GenerateForm) => {
    // Check usage limits
    const isUnlimited = user.responsesLimit === -1;
    if (!isUnlimited && user.responsesUsed >= user.responsesLimit) {
      toast({
        title: "Usage limit reached",
        description: "Upgrade your plan to generate more responses.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedResponse("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          reviewRating: selectedRating,
          businessName: user.businessName || "Our Business",
          businessType: user.businessType,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to generate response");
      }

      const result = await response.json();
      setGeneratedResponse(result.response);

      toast({
        title: "Response generated!",
        description: "Your AI response is ready to use.",
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong";
      toast({
        title: "Generation failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Response copied to clipboard.",
    });
  };

  const handleRegenerate = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Review text */}
        <div>
          <Label htmlFor="reviewText">Customer Review</Label>
          <Textarea
            id="reviewText"
            placeholder="Paste the customer review here..."
            className="mt-1 min-h-[120px]"
            error={errors.reviewText?.message}
            {...register("reviewText")}
          />
          <p className="mt-1 text-xs text-gray-500">
            {reviewText?.length || 0} characters
          </p>
        </div>

        {/* Rating and tone row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Rating */}
          <div>
            <Label>Review Rating</Label>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => {
                    setSelectedRating(rating);
                    setValue("reviewRating", rating);
                  }}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      selectedRating && rating <= selectedRating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <Label>Response Tone</Label>
            <Select
              defaultValue="professional"
              onValueChange={(value) => setValue("tone", value)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                {TONE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div>
                      <span>{option.label}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        - {option.description}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Platform (optional) */}
        <div>
          <Label>Review Platform (optional)</Label>
          <Select onValueChange={(value) => setValue("platform", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {PLATFORM_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate button */}
        <Button
          type="submit"
          variant="gradient"
          className="w-full"
          loading={isGenerating}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Response
        </Button>
      </form>

      {/* Generated response */}
      {generatedResponse && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <Label>Generated Response</Label>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-1 ${isGenerating ? "animate-spin" : ""}`}
                />
                Regenerate
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
              {generatedResponse}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
