/** Seed data for the dashboard. Static shape, values drift at runtime so the
 *  agent can read the same card twice and see it change. */
export const seedStats = {
  walletKobo: 486_500_00,
  earnings30dKobo: 1_248_000_00,
  bookingsToday: 7,
  pendingPayoutKobo: 120_000_00,
};

export const recentBookings = [
  { id: "BK-2291", customer: "Chidi Nwosu", service: "Brand strategy call", amount: 15_000_00, status: "Paid", when: "Today, 10:30" },
  { id: "BK-2290", customer: "Halima Bello", service: "Makeup session", amount: 25_000_00, status: "Paid", when: "Today, 09:15" },
  { id: "BK-2289", customer: "Tobi Adeyemi", service: "Portfolio review", amount: 10_000_00, status: "Pending", when: "Yesterday, 17:40" },
  { id: "BK-2288", customer: "Ngozi Eze", service: "Bridal trial", amount: 45_000_00, status: "Paid", when: "Yesterday, 14:05" },
  { id: "BK-2287", customer: "Anonymous", service: "Tip", amount: 5_000_00, status: "Paid", when: "Yesterday, 11:20" },
];

export const services = [
  { name: "Brand strategy call", duration: "45 min", price: 15_000_00, bookings: 32 },
  { name: "Portfolio review", duration: "30 min", price: 10_000_00, bookings: 21 },
  { name: "Full brand sprint", duration: "3 hrs", price: 120_000_00, bookings: 6 },
];

export function formatNaira(kobo: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100);
}
