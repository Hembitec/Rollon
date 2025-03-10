import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Mail } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      navigate('/')
    } catch (err: any) {
      setError(err.message || "Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      {/* Logo */}
      <Link to="/" className="absolute top-8 left-8 flex items-center space-x-2 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
          <span className="text-white font-bold text-sm">R</span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Rollon
        </span>
      </Link>

      <div className="w-full max-w-md p-8 mx-auto">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p className="text-gray-500 mt-2">Sign in to your Rollon account</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 w-full transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="rounded text-blue-500 focus:ring-blue-500" />
                <Label htmlFor="remember" className="text-sm font-medium text-gray-700">
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all py-3"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-12 rounded-xl border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all"
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
              >
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all"
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              >
                <Mail className="mr-2 h-5 w-5" />
                Google
              </Button>
            </div>

            <div className="text-center mt-8 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-6 text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link to="#" className="text-gray-700 hover:text-gray-900 underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="#" className="text-gray-700 hover:text-gray-900 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  )
}
