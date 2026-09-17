import credentials from "@/data/credentials.json";

export type DemoUser = {
  email: string;
  displayName: string;
  slug: string;
  role: string;
};

const SESSION_KEY = "bookmi.demo.session";

/**
 * Hardcoded sign-in. Deliberately synchronous and offline: the codelab is
 * about testing the UI, not about auth. Credentials live in
 * src/data/credentials.json.
 */
export function signIn(email: string, password: string): DemoUser {
  const match = credentials.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!match) throw new Error("Invalid email or password");
  const user: DemoUser = {
    email: match.email,
    displayName: match.displayName,
    slug: match.slug,
    role: match.role,
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
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
