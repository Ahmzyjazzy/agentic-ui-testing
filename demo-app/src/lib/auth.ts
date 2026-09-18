import credentials from "@/data/credentials.json";

export type DemoUser = {
  email: string;
  displayName: string;
  slug: string;
  role: string;
};

const SESSION_KEY = "bookmi.demo.session";
const SIGNUPS_KEY = "bookmi.demo.signups";

type StoredUser = DemoUser & { password: string };

/** Accounts created during this browser session by the mock signup flow. */
function signups(): StoredUser[] {
  try {
    const raw = sessionStorage.getItem(SIGNUPS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function persist(user: DemoUser) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    /* ignore */
  }
}

/**
 * Hardcoded sign-in. Deliberately synchronous and offline: the codelab is
 * about testing the UI, not about auth. Seed accounts live in
 * src/data/credentials.json; accounts made through signup are kept in
 * sessionStorage for the life of the tab.
 */
export function signIn(email: string, password: string): DemoUser {
  const all: StoredUser[] = [...(credentials.users as StoredUser[]), ...signups()];
  const match = all.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!match) throw new Error("Invalid email or password");
  const user: DemoUser = {
    email: match.email,
    displayName: match.displayName,
    slug: match.slug,
    role: match.role,
  };
  persist(user);
  return user;
}

/**
 * Mock signup: no API, no email verification. Creates the account, signs it in
 * and leaves the slug empty so the onboarding step can claim one.
 */
export function signUp(fullName: string, email: string, password: string): DemoUser {
  const taken = [...(credentials.users as StoredUser[]), ...signups()].some(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
  );
  if (taken) throw new Error("An account with that email already exists");

  const user: StoredUser = {
    email: email.trim(),
    password,
    displayName: fullName.trim(),
    slug: "",
    role: "host",
  };
  try {
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify([...signups(), user]));
  } catch {
    /* ignore */
  }
  const session: DemoUser = {
    email: user.email,
    displayName: user.displayName,
    slug: user.slug,
    role: user.role,
  };
  persist(session);
  return session;
}

/** Onboarding step: claim a page name and slug. */
export function claimPage(displayName: string, slug: string): DemoUser {
  const user = currentUser();
  if (!user) throw new Error("Sign in first");
  const updated: DemoUser = { ...user, displayName: displayName.trim(), slug: slug.trim() };
  persist(updated);
  try {
    const rest = signups().map((u) =>
      u.email === updated.email ? { ...u, displayName: updated.displayName, slug: updated.slug } : u,
    );
    sessionStorage.setItem(SIGNUPS_KEY, JSON.stringify(rest));
  } catch {
    /* ignore */
  }
  return updated;
}

export function currentUser(): DemoUser | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as DemoUser) : null;
  } catch {
    return null;
  }
}

export function signOut() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/** Suggest a slug from a display name. Mirrors bookmi's onboarding. */
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 30)
    .replace(/^-|-$/g, "");
}

/** Slug rules, checked locally — no availability API in the demo. */
export function validateSlug(slug: string): string | null {
  if (!slug) return null;
  if (slug.length < 3) return "Slug must be at least 3 characters.";
  if (slug.length > 30) return "Slug must be at most 30 characters.";
  if (!/^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/.test(slug)) {
    return "Use lowercase letters, numbers and hyphens only.";
  }
  const taken = ["admin", "login", "signup", "dashboard", "bookmi"];
  if (taken.includes(slug)) return "That slug is already taken.";
  return null;
}
