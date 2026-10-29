import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link
            to="/"
            className="mx-auto mb-4 flex items-center gap-2 text-primary font-bold text-2xl"
          >
            <Home className="h-7 w-7" />
            <span>HomeHop</span>
          </Link>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your HomeHop account</CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground">Authentication not connected</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This is a frontend placeholder. Authentication and account management will be
                available once a backend is integrated.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSubmitted(false)}
                type="button"
              >
                Back to form
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-foreground mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className="pl-10"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "login-email-error" : undefined}
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p id="login-email-error" className="mt-1 text-sm text-destructive">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-foreground mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                    }}
                    className="pl-10 pr-10"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "login-password-error" : undefined}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="login-password-error" className="mt-1 text-sm text-destructive">
                    {errors.password}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Sign In
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                This is a demo. No credentials are stored or transmitted.
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

