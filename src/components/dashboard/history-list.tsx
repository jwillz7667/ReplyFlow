"use client";

import { useState } from "react";
import type { ReviewResponse } from "@prisma/client";
import { Star, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatRelativeTime, capitalize, truncate } from "@/lib/utils";

interface HistoryListProps {
  responses: ReviewResponse[];
}

export function HistoryList({ responses }: HistoryListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCopy = async (response: ReviewResponse) => {
    await navigator.clipboard.writeText(response.responseText);
    setCopiedId(response.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Response copied to clipboard.",
    });
  };

  return (
    <div className="space-y-3">
      {responses.map((response) => {
        const isExpanded = expandedId === response.id;
        const isCopied = copiedId === response.id;

        return (
          <div
            key={response.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            {/* Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? null : response.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {response.reviewRating && (
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < response.reviewRating!
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    {response.responseTone && (
                      <Badge variant="secondary" className="text-xs">
                        {capitalize(response.responseTone)}
                      </Badge>
                    )}
                    {response.reviewPlatform && (
                      <Badge variant="outline" className="text-xs">
                        {capitalize(response.reviewPlatform)}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(response.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Review:</span>{" "}
                    {truncate(response.reviewText, 150)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(response);
                    }}
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 pt-4 space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    ORIGINAL REVIEW
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    {response.reviewText}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    GENERATED RESPONSE
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                    {response.responseText}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    {response.tokensUsed && (
                      <span>{response.tokensUsed} tokens used</span>
                    )}
                    {response.generationTime && (
                      <span className="ml-3">
                        Generated in {response.generationTime}ms
                      </span>
                    )}
                  </div>
                  <Button size="sm" onClick={() => handleCopy(response)}>
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Response
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
