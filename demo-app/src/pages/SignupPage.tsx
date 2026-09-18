import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { SplitAuthLayout } from "@/components/SplitAuthLayout";
import { FormMessage } from "@/components/FormMessage";
import { signUp } from "@/lib/auth";

/**
 * Mock signup. No API and no email verification: the account is kept in
 * sessionStorage for the life of the tab, then the user claims a page name
 * in onboarding before landing on the dashboard.
 */
export default function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      try {
        signUp(fullName, email, password);
        navigate("/onboarding", { replace: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to sign up");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <SplitAuthLayout>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo.svg" alt="Bookmi" className="mx-auto h-10 w-10" />
          <div className="mt-3 flex items-baseline justify-center gap-2">
            <h1 className="text-3xl font-bold">Bookmi</h1>
            <span className="text-sm text-muted-foreground">by Qorelly</span>
          </div>
        </div>
        <div className="card p-8">
          <div className="mb-6">
            <h2 className="font-display text-3xl mb-1">Create your page</h2>
            <p className="text-sm text-muted-foreground">Free forever — we only earn when you do.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                Your name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-field"
                placeholder="Ada Lovelace"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@bookmi.co"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-11"
                  placeholder="At least 8 characters"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && <FormMessage variant="error" message={error} className="signup-error" />}

            <button type="submit" disabled={loading} className="btn-primary btn-signup-v2 w-full">
              {loading ? "Creating your page…" : "Create your page"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </SplitAuthLayout>
  );
}
