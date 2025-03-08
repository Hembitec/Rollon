import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import {
  User,
  Moon,
  Sun,
  CreditCard,
  Lock,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [accountCreated, setAccountCreated] = useState<string>("");

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          setUserData(data.user);
          setAccountCreated(data.user.created_at || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleThemeChange = (value: "light" | "dark" | "system") => {
    setTheme(value);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      // First verify the current password by trying to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: (await supabase.auth.getUser()).data.user?.email || "",
        password: currentPassword,
      });

      if (signInError) {
        throw new Error("Current password is incorrect");
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      setPasswordSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setPasswordError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData?.user_metadata?.full_name || userData?.email || "User"}`}
                    />
                    <AvatarFallback>
                      {userData?.user_metadata?.full_name
                        ? userData.user_metadata.full_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                        : userData?.email
                          ? userData.email.substring(0, 2).toUpperCase()
                          : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {userData?.user_metadata?.full_name ||
                      userData?.email?.split("@")[0] ||
                      "User"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {userData?.email || ""}
                  </p>
                  <div className="mt-4 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    Pro Plan
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Account created</h3>
                  <p className="text-sm text-gray-500">
                    {accountCreated
                      ? new Date(accountCreated).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Loading..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <Tabs defaultValue="appearance">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>

              {/* Appearance Tab */}
              <TabsContent value="appearance" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how the app looks and feels to you
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <RadioGroup
                        value={theme}
                        onValueChange={handleThemeChange as any}
                        className="grid grid-cols-3 gap-4 mt-2"
                      >
                        <div>
                          <RadioGroupItem
                            value="light"
                            id="theme-light"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-light"
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${theme === "light" ? "border-primary" : ""}`}
                          >
                            <Sun className="mb-2 h-6 w-6" />
                            <span>Light</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem
                            value="dark"
                            id="theme-dark"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-dark"
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${theme === "dark" ? "border-primary" : ""}`}
                          >
                            <Moon className="mb-2 h-6 w-6" />
                            <span>Dark</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem
                            value="system"
                            id="theme-system"
                            className="sr-only"
                          />
                          <Label
                            htmlFor="theme-system"
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${theme === "system" ? "border-primary" : ""}`}
                          >
                            <div className="flex mb-2">
                              <Sun className="h-6 w-6" />
                              <Moon className="h-6 w-6 ml-1" />
                            </div>
                            <span>System</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="animations">Animations</Label>
                        <Switch id="animations" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable or disable animations throughout the interface
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sound-effects">Sound Effects</Label>
                        <Switch id="sound-effects" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Play sound effects for interactions and notifications
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handlePasswordChange}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">
                            Current Password
                          </Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">
                            Confirm New Password
                          </Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>

                        {passwordError && (
                          <div className="flex items-center text-red-600 text-sm">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {passwordError}
                          </div>
                        )}

                        {passwordSuccess && (
                          <div className="flex items-center text-green-600 text-sm">
                            <Check className="h-4 w-4 mr-2" />
                            Password updated successfully
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isLoading}
                        >
                          {isLoading ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </form>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Forgot your password?</h4>
                          <p className="text-sm text-muted-foreground">
                            If you can't remember your current password, you can
                            reset it
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => navigate("/forgot-password")}
                        >
                          Reset Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Subscription Tab */}
              <TabsContent value="subscription" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                    <CardDescription>
                      Manage your subscription and billing
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Sparkles className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Pro Plan</h3>
                            <p className="text-sm text-muted-foreground">
                              $9.99/month, billed monthly
                            </p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="flex items-center space-x-4 rounded-lg border p-4">
                        <CreditCard className="h-6 w-6 text-gray-500" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Expires 12/2024
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Billing History</h3>
                      <div className="rounded-md border">
                        <div className="flex items-center justify-between p-4 border-b">
                          <div>
                            <p className="font-medium">Pro Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              May 1, 2023
                            </p>
                          </div>
                          <p className="font-medium">$9.99</p>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b">
                          <div>
                            <p className="font-medium">Pro Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              April 1, 2023
                            </p>
                          </div>
                          <p className="font-medium">$9.99</p>
                        </div>
                        <div className="flex items-center justify-between p-4">
                          <div>
                            <p className="font-medium">Pro Plan - Monthly</p>
                            <p className="text-sm text-muted-foreground">
                              March 1, 2023
                            </p>
                          </div>
                          <p className="font-medium">$9.99</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel Subscription</Button>
                    <Button>Upgrade Plan</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
