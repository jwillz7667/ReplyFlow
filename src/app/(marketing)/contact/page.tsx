"use client";

import { useState } from "react";
import { Metadata } from "next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@replyflow.io",
    href: "mailto:support@replyflow.io",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Mon-Fri, 9am-6pm PST",
    href: null,
  },
];

const subjects = [
  { value: "sales", label: "Sales Inquiry" },
  { value: "support", label: "Technical Support" },
  { value: "billing", label: "Billing Question" },
  { value: "partnership", label: "Partnership Opportunity" },
  { value: "press", label: "Press & Media" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    reset();
    setIsSubmitting(false);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact ReplyFlow",
    description: "Get in touch with ReplyFlow for sales, support, or partnership inquiries.",
    url: "https://replyflow.io/contact",
    mainEntity: {
      "@type": "Organization",
      name: "ReplyFlow",
      email: "support@replyflow.io",
      telephone: "+1-555-123-4567",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Francisco",
        addressRegion: "CA",
        addressCountry: "US",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Contact" }]} />

          <header className="max-w-3xl mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have a question or need help? We're here for you. Reach out and we'll
              respond within 24 hours.
            </p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          className="mt-1"
                          error={errors.name?.message}
                          {...register("name")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="mt-1"
                          error={errors.email?.message}
                          {...register("email")}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your Company"
                          className="mt-1"
                          {...register("company")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Select onValueChange={(value) => setValue("subject", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.subject && (
                          <p className="text-xs text-destructive mt-1">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        className="mt-1 min-h-[150px]"
                        error={errors.message?.message}
                        {...register("message")}
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="gradient"
                      className="w-full sm:w-auto"
                      loading={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        <item.icon className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">{item.label}</p>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-gray-900 dark:text-white hover:text-blue-600 transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-gray-900 dark:text-white">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 border-0">
                <CardContent className="p-6 text-white">
                  <h2 className="font-semibold mb-2">Need Immediate Help?</h2>
                  <p className="text-blue-100 text-sm mb-4">
                    Check out our Help Center for instant answers to common questions.
                  </p>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 w-full"
                    asChild
                  >
                    <a href="/help">Visit Help Center</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
