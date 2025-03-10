import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Mail, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function SignupPage() {
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
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      if (error) throw error

      navigate('/login')
    } catch (err: any) {
      setError(err.message || "There was an error creating your account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>
      <div className="absolute inset-0 -z-10 bg-grid-pattern opacity-10"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

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
              <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
              <p className="text-gray-500 mt-2">Join Rollon and start creating quizzes</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center">
                <div className="w-1 h-6 bg-red-500 rounded-full mr-3"></div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-4 pr-4 py-3 h-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1 ml-1">
                  Must be at least 8 characters with a number and a special character.
                </p>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <Checkbox id="terms" required className="mt-1 rounded text-blue-500 focus:ring-blue-500" />
                <Label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{" "}
                  <Link to="#" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all py-3 mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
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

            <div className="flex items-center justify-center mt-8 text-sm text-gray-600">
              <span>Already have an account?</span>
              <Link
                to="/login"
                className="ml-2 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                Sign in
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
