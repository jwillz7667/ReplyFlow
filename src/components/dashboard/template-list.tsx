"use client";

import { useState } from "react";
import type { Template } from "@prisma/client";
import { Plus, Edit2, Trash2, Copy, Check, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formatRelativeTime, capitalize, truncate } from "@/lib/utils";

interface TemplateListProps {
  templates: Template[];
  canCreateMore: boolean;
  templateLimit: number;
}

type TemplateCategory = "positive" | "negative" | "neutral" | "complaint";
type TemplateTone = "professional" | "friendly" | "empathetic" | "apologetic" | "enthusiastic";

interface TemplateForm {
  name: string;
  description: string;
  category: TemplateCategory | "";
  promptTemplate: string;
  exampleOutput: string;
  tone: TemplateTone | "";
}

const initialForm: TemplateForm = {
  name: "",
  description: "",
  category: "",
  promptTemplate: "",
  exampleOutput: "",
  tone: "professional",
};

export function TemplateList({ templates, canCreateMore, templateLimit }: TemplateListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [form, setForm] = useState<TemplateForm>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCopy = async (template: Template) => {
    await navigator.clipboard.writeText(template.promptTemplate);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Template copied to clipboard.",
    });
  };

  const handleCreate = async () => {
    if (!form.name || !form.promptTemplate) {
      toast({
        title: "Error",
        description: "Name and template content are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description || undefined,
          category: form.category || undefined,
          promptTemplate: form.promptTemplate,
          exampleOutput: form.exampleOutput || undefined,
          tone: form.tone || undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create template");
      }

      toast({
        title: "Success!",
        description: "Template created successfully.",
      });

      setIsCreateOpen(false);
      setForm(initialForm);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedTemplate || !form.name || !form.promptTemplate) {
      toast({
        title: "Error",
        description: "Name and template content are required.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description || null,
          category: form.category || null,
          promptTemplate: form.promptTemplate,
          exampleOutput: form.exampleOutput || null,
          tone: form.tone || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update template");
      }

      toast({
        title: "Success!",
        description: "Template updated successfully.",
      });

      setIsEditOpen(false);
      setSelectedTemplate(null);
      setForm(initialForm);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTemplate) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete template");
      }

      toast({
        title: "Deleted",
        description: "Template deleted successfully.",
      });

      setIsDeleteOpen(false);
      setSelectedTemplate(null);
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete template",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEdit = (template: Template) => {
    setSelectedTemplate(template);
    setForm({
      name: template.name,
      description: template.description || "",
      category: (template.category as TemplateCategory) || "",
      promptTemplate: template.promptTemplate,
      exampleOutput: template.exampleOutput || "",
      tone: (template.tone as TemplateTone) || "",
    });
    setIsEditOpen(true);
  };

  const openDelete = (template: Template) => {
    setSelectedTemplate(template);
    setIsDeleteOpen(true);
  };

  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "neutral":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "complaint":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <>
      {/* Create button */}
      <div className="mb-4">
        <Button
          onClick={() => {
            setForm(initialForm);
            setIsCreateOpen(true);
          }}
          disabled={!canCreateMore}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Template
        </Button>
        {!canCreateMore && templateLimit !== -1 && (
          <p className="text-sm text-gray-500 mt-2">
            You've reached your template limit ({templateLimit}). Upgrade to create more.
          </p>
        )}
      </div>

      {/* Templates list */}
      {templates.length > 0 && (
        <div className="space-y-3">
          {templates.map((template) => {
            const isExpanded = expandedId === template.id;
            const isCopied = copiedId === template.id;

            return (
              <div
                key={template.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                {/* Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : template.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {template.name}
                        </h3>
                        {template.category && (
                          <Badge className={getCategoryColor(template.category)}>
                            {capitalize(template.category)}
                          </Badge>
                        )}
                        {template.tone && (
                          <Badge variant="outline" className="text-xs">
                            {capitalize(template.tone)}
                          </Badge>
                        )}
                      </div>
                      {template.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {truncate(template.description, 100)}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Used {template.useCount} times • {formatRelativeTime(template.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(template);
                        }}
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEdit(template);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDelete(template);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
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
                        TEMPLATE CONTENT
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 whitespace-pre-wrap">
                        {template.promptTemplate}
                      </p>
                    </div>
                    {template.exampleOutput && (
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-2">
                          EXAMPLE OUTPUT
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-200 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800 whitespace-pre-wrap">
                          {template.exampleOutput}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a reusable template for generating responses.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Template Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Positive Review Thank You"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of when to use this template"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value as TemplateCategory })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tone</Label>
                <Select
                  value={form.tone}
                  onValueChange={(value) => setForm({ ...form, tone: value as TemplateTone })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                    <SelectItem value="apologetic">Apologetic</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="promptTemplate">Template Content *</Label>
              <Textarea
                id="promptTemplate"
                value={form.promptTemplate}
                onChange={(e) => setForm({ ...form, promptTemplate: e.target.value })}
                placeholder="Enter your template content. You can use placeholders like {customer_name}, {business_name}, etc."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="exampleOutput">Example Output</Label>
              <Textarea
                id="exampleOutput"
                value={form.exampleOutput}
                onChange={(e) => setForm({ ...form, exampleOutput: e.target.value })}
                placeholder="An example of what the generated response should look like"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>
              Make changes to your template.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name">Template Name *</Label>
              <Input
                id="edit-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Positive Review Thank You"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief description of when to use this template"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => setForm({ ...form, category: value as TemplateCategory })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="complaint">Complaint</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tone</Label>
                <Select
                  value={form.tone}
                  onValueChange={(value) => setForm({ ...form, tone: value as TemplateTone })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="empathetic">Empathetic</SelectItem>
                    <SelectItem value="apologetic">Apologetic</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-promptTemplate">Template Content *</Label>
              <Textarea
                id="edit-promptTemplate"
                value={form.promptTemplate}
                onChange={(e) => setForm({ ...form, promptTemplate: e.target.value })}
                placeholder="Enter your template content."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="edit-exampleOutput">Example Output</Label>
              <Textarea
                id="edit-exampleOutput"
                value={form.exampleOutput}
                onChange={(e) => setForm({ ...form, exampleOutput: e.target.value })}
                placeholder="An example of what the generated response should look like"
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Template</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedTemplate?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
