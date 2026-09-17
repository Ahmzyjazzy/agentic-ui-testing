import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { signIn } from "@/lib/auth";

/**
 * Split-screen sign-in - same shape as bookmi/apps/web SplitAuthLayout +
 * LoginPage, but the submit handler checks src/data/credentials.json instead
 * of calling Supabase.
 *
 * Note for the codelab: the class names here (btn-login-v2, input ids) are the
 * exact selectors the hand-written Playwright test grabs. scripts/break-ui.sh
 * renames them to show how brittle that is.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Small delay so the button's loading state is visible during the demo.
    window.setTimeout(() => {
      try {
        signIn(email, password);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to sign in");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12">
        <div className="anim-fade-up w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/images/logo.svg" alt="Bookmi" className="mx-auto h-10 w-10" />
            <div className="mt-3 flex items-baseline justify-center gap-2">
              <h1 className="text-3xl font-bold">Bookmi</h1>
              <span className="text-sm text-muted-foreground">by Qorelly</span>
            </div>
          </div>

          <div className="card p-8">
            <div className="mb-6">
              <h2 className="font-display text-3xl mb-1">Sign in</h2>
              <p className="text-sm text-muted-foreground">Manage your bookings and page.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="Your password"
                    required
                    autoComplete="current-password"
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

              {error && (
                <p role="alert" className="login-error border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn-primary btn-login-v2 w-full">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              Demo account: <span className="font-mono">host@bookmi.test</span> /{" "}
              <span className="font-mono">password</span>
            </p>
          </div>
        </div>
      </div>

      <aside className="relative hidden lg:block overflow-hidden bg-primary">
        <img src="/images/login/loginimg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute bottom-8 right-8 z-10 w-64 bg-white p-4 shadow-medium">
          <div className="flex items-center gap-3">
            <img src="/images/landing/avatar-2.png" alt="" className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="font-display text-base leading-5">Samuel Adeyemi</div>
              <div className="text-xs text-muted-foreground">bookmi.co/samuel</div>
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            "Two taps and my clients have paid before the call starts."
          </p>
        </div>
      </aside>

      <Link
        to="/"
        aria-label="Exit to landing page"
        className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-medium backdrop-blur transition-all hover:bg-white hover:text-gray-900 active:scale-95"
      >
        <X className="h-4 w-4" />
      </Link>
    </div>
  );
}
