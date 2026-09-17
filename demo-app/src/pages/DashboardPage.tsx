import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Link2,
  LogOut,
  TrendingUp,
  Wallet as WalletIcon,
} from "lucide-react";
import { currentUser, signOut } from "@/lib/auth";
import { formatNaira, recentBookings, seedStats, services } from "@/data/seed";

/**
 * Host dashboard. Every number is local seed data - no API. The four stat
 * cards drift every 3 seconds so an agent can read them, wait, and read
 * again (the "dynamic data" part of the codelab).
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const user = currentUser();
  const [stats, setStats] = useState(seedStats);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStats((s) => ({
        walletKobo: s.walletKobo + Math.round(Math.random() * 250_00),
        earnings30dKobo: s.earnings30dKobo + Math.round(Math.random() * 400_00),
        bookingsToday: s.bookingsToday + (Math.random() > 0.7 ? 1 : 0),
        pendingPayoutKobo: Math.max(0, s.pendingPayoutKobo - Math.round(Math.random() * 500_00)),
      }));
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  const handleSignOut = () => {
    signOut();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Bookmi" className="h-8 w-8" />
            <span className="text-lg font-semibold tracking-tight">Bookmi</span>
            <span className="hidden text-xs text-muted-foreground sm:inline">by Qorelly</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:inline">{user?.email}</span>
            <button onClick={handleSignOut} className="btn-secondary logout-btn py-2 text-sm">
              <LogOut className="h-4 w-4" /> Log out
            </button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="dash-title font-display text-3xl tracking-tight">Wallet overview</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, {user?.displayName ?? "host"} - here's what's happening on your page.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-button bg-primary-light px-3 py-1.5 text-sm font-medium text-primary">
            <Link2 className="h-4 w-4" /> bookmi.co/{user?.slug ?? "you"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            testId="wallet-balance"
            icon={<WalletIcon className="h-5 w-5" />}
            label="Wallet balance"
            value={formatNaira(stats.walletKobo)}
            hint="Ready to withdraw"
          />
          <StatCard
            testId="earnings-30d"
            icon={<TrendingUp className="h-5 w-5" />}
            label="Earnings - 30 days"
            value={formatNaira(stats.earnings30dKobo)}
            hint="Bookings and tips"
          />
          <StatCard
            testId="bookings-today"
            icon={<CalendarDays className="h-5 w-5" />}
            label="Bookings today"
            value={String(stats.bookingsToday)}
            hint="Paid and pending"
          />
          <StatCard
            testId="pending-payout"
            icon={<ArrowUpRight className="h-5 w-5" />}
            label="Payout in transit"
            value={formatNaira(stats.pendingPayoutKobo)}
            hint="Settling to your bank"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="card p-6 lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Recent bookings</h2>
            <table className="w-full text-sm" data-testid="recent-bookings">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 font-medium">Customer</th>
                  <th className="pb-2 font-medium">Service</th>
                  <th className="pb-2 font-medium">When</th>
                  <th className="pb-2 text-right font-medium">Amount</th>
                  <th className="pb-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 font-medium">{b.customer}</td>
                    <td className="py-3 text-muted-foreground">{b.service}</td>
                    <td className="py-3 text-muted-foreground">{b.when}</td>
                    <td className="py-3 text-right">{formatNaira(b.amount)}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex rounded-button px-2.5 py-0.5 text-xs font-medium ${
                          b.status === "Paid"
                            ? "bg-primary-light text-primary"
                            : "bg-gray-100 text-muted-foreground"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card p-6">
            <h2 className="mb-4 text-lg font-semibold">Your services</h2>
            <ul className="divide-y divide-gray-200">
              {services.map((s) => (
                <li key={s.name} className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {s.duration} - {s.bookings} bookings
                    </div>
                  </div>
                  <span className="text-sm font-medium">{formatNaira(s.price)}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
  testId,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  testId: string;
}) {
  return (
    <div className="card stat-card p-5" data-testid={testId}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
          {icon}
        </span>
        <span className="text-sm">{label}</span>
      </div>
      <div className="stat-value mt-3 font-display text-2xl tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}
