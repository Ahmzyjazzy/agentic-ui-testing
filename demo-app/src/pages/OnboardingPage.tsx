import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplitAuthLayout } from "@/components/SplitAuthLayout";
import { FormMessage } from "@/components/FormMessage";
import { claimPage, currentUser, slugify, validateSlug } from "@/lib/auth";

/**
 * Claim your page: display name → auto-generated slug (editable) → dashboard.
 * Mirrors bookmi's onboarding, minus the live availability check (the demo
 * validates the slug shape locally against a short reserved list).
 */
export default function OnboardingPage() {
  const navigate = useNavigate();
  const user = currentUser();

  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slugTouched) return;
    setSlug(slugify(displayName));
  }, [displayName, slugTouched]);

  const shapeError = validateSlug(slug);
  const canSubmit = displayName.trim().length > 1 && slug.length >= 3 && !shapeError && !loading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (shapeError) {
      setError(shapeError);
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      try {
        claimPage(displayName, slug);
        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to claim your page");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <SplitAuthLayout
      card={{
        name: displayName || "Your name",
        location: `book.me/${slug || "your-name"}`,
        handle: slug ? `@${slug}` : "@your-name",
        role: "Bookmi host",
      }}
    >
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
            <h2 className="font-display text-3xl mb-1">Claim your page</h2>
            <p className="text-sm text-muted-foreground">
              This is the link you'll share with clients.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                Display name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input-field"
                placeholder="Ada's Studio"
                required
              />
            </div>

            <div>
              <label htmlFor="slug" className="block text-sm font-medium mb-2">
                Your Bookmi link
              </label>
              <div className="flex items-stretch">
                <span className="inline-flex items-center border border-r-0 border-gray-200 bg-gray-50 px-3 text-sm text-muted-foreground">
                  bookmi.co/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(slugify(e.target.value));
                  }}
                  className="input-field"
                  placeholder="your-name"
                  required
                />
              </div>
              {shapeError && <p className="mt-2 text-xs text-destructive">{shapeError}</p>}
            </div>

            {error && <FormMessage variant="error" message={error} className="onboarding-error" />}

            <button type="submit" disabled={!canSubmit} className="btn-primary btn-claim-v2 w-full">
              {loading ? "Claiming…" : "Claim page & continue"}
            </button>
          </form>
        </div>
      </div>
    </SplitAuthLayout>
  );
}
