import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-400/20 rounded-full blur-3xl" />

        <div className="relative flex flex-col justify-center items-center p-12 text-white">
          <Link href="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">ReplyFlow</span>
          </Link>

          <div className="max-w-md text-center">
            <h1 className="text-3xl font-bold mb-4">
              Turn Customer Reviews Into Growth Opportunities
            </h1>
            <p className="text-blue-100 text-lg">
              Generate professional, personalized responses in seconds. Save hours every
              week while building stronger customer relationships.
            </p>
          </div>

          {/* Testimonial */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md">
            <p className="text-white/90 italic mb-4">
              &quot;ReplyFlow has completely transformed how we handle customer feedback. Our
              response rate went from 30% to 95%.&quot;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-semibold">
                SC
              </div>
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-blue-200">Owner, Chen&apos;s Kitchen</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden p-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              ReplyFlow
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6">{children}</div>

        <div className="p-6 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} ReplyFlow. All rights reserved.
        </div>
      </div>
    </div>
  );
}
