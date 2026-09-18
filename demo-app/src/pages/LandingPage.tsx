import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/Reveal";

/**
 * Bookmi's landing page, ported from bookmi/apps/web/src/pages/LandingPage.tsx.
 * Same sections, copy, imagery and motion — the only changes are that the
 * signup links point at this demo's mock signup flow and nothing calls an API.
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <Nav />
      <Hero />
      <HowItWorks />
      <DualFunctionality />
      <Features />
      <WhoItsFor />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Bookmi" className="h-8 w-8" />
          <span className="text-lg font-semibold tracking-tight">Bookmi</span>
          <span className="hidden text-xs text-muted-foreground sm:inline">by Qorelly</span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="nav-signin inline-flex items-center rounded-button px-4 py-2 text-sm font-medium text-foreground hover:bg-gray-50 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover active:scale-95 transition-all"
          >
            Get started <Icon icon="solar:arrow-right-bold" className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* The Monnify asset is the full lockup (mark + white wordmark, 612×100).
   Crop to the mark — the first ~150px — since the white wordmark is invisible
   on light backgrounds. */
function MonnifyMark({ className = "" }: { className?: string }) {
  return (
    <span className={`relative inline-block aspect-[3/2] overflow-hidden ${className}`}>
      <img
        src="/images/landing/monnify.png"
        alt="Monnify"
        className="absolute left-0 top-0 h-full w-auto max-w-none"
      />
    </span>
  );
}

function MonnifyLink() {
  return (
    <a href="https://monnify.com/" target="_blank" rel="noopener noreferrer">
      Monnify
    </a>
  );
}

function CheckBadge() {
  return <Icon icon="solar:check-circle-bold" className="h-5 w-5 shrink-0 text-primary" />;
}

function Hero() {
  return (
    <section className="overflow-hidden border-b border-gray-200 bg-white">
      <div className="container py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-1.5 rounded-button bg-primary-light py-1 pl-2 pr-3 text-xs font-medium text-primary">
              <MonnifyMark className="h-4" />
              Powered by <MonnifyLink />
            </span>
            <h1
              className="anim-fade-up mt-5 font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]"
              style={{ "--anim-delay": "90ms" } as React.CSSProperties}
            >
              Your bookable page,
              <br />
              <span className="text-primary">in one link.</span>
            </h1>
            <p
              className="anim-fade-up mt-5 max-w-md text-lg text-muted-foreground"
              style={{ "--anim-delay": "180ms" } as React.CSSProperties}
            >
              Share <span className="font-mono text-foreground">bookmi.co/you</span>. Let anyone book
              your services and pay in seconds — money lands in your <MonnifyLink /> wallet, withdraw
              to your bank anytime.
            </p>
            <div
              className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ "--anim-delay": "270ms" } as React.CSSProperties}
            >
              <Link to="/auth/signup" className="btn-primary text-base">
                Get your link <Icon icon="solar:arrow-right-bold" className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary text-base">
                See how it works
              </a>
            </div>
            <ul
              className="anim-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{ "--anim-delay": "360ms" } as React.CSSProperties}
            >
              <li className="inline-flex items-center gap-2">
                <CheckBadge /> No setup fee
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckBadge /> Pay out to any Nigerian bank
              </li>
              <li className="inline-flex items-center gap-2">
                <CheckBadge /> Live in 5 minutes
              </li>
            </ul>
          </div>
          <div className="anim-fade-up" style={{ "--anim-delay": "220ms" } as React.CSSProperties}>
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroNotification({
  variant,
  avatar,
  name,
  detail,
  amount,
  meta,
}: {
  variant: "booking" | "tip";
  avatar?: string;
  name: string;
  detail: string;
  amount: string;
  meta: string;
}) {
  const isTip = variant === "tip";
  return (
    <div
      className={`flex shrink-0 items-center gap-5 rounded-[20px] px-4 py-3 ${
        isTip ? "bg-[#D95656] text-white" : "bg-white text-foreground"
      }`}
    >
      <div className="flex items-center gap-2">
        {isTip ? (
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
            <Icon icon="solar:heart-bold" className="h-6 w-6 text-primary" />
          </span>
        ) : (
          <img src={avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
        )}
        <div>
          <div className="font-display text-base leading-6 whitespace-nowrap">{name}</div>
          <div
            className={`text-xs whitespace-nowrap ${isTip ? "text-white/80" : "text-muted-foreground"}`}
          >
            {detail}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-display text-sm whitespace-nowrap">{amount}</div>
        <div className={`text-xs ${isTip ? "text-white/80" : "text-muted-foreground"}`}>{meta}</div>
      </div>
    </div>
  );
}

const heroNotifications = [
  {
    variant: "booking",
    avatar: "/images/landing/avatar-1.png",
    name: "Adaeze O.",
    detail: "Brand strategist · Lagos",
    amount: "₦15,000",
    meta: "30 min",
  },
  {
    variant: "tip",
    name: "Samuel A.",
    detail: "Product designer · Abuja",
    amount: "+₦10,000",
    meta: "Tip",
  },
  {
    variant: "booking",
    avatar: "/images/landing/avatar-2.png",
    name: "Samuel A.",
    detail: "Fitness coach · Lagos",
    amount: "₦25,000",
    meta: "45 min",
  },
  {
    variant: "tip",
    name: "Chiamaka N.",
    detail: "Makeup artist · Enugu",
    amount: "+₦5,000",
    meta: "Tip",
  },
] as const;

function HeroPreview() {
  return (
    <div className="relative overflow-hidden border border-gray-200 bg-white p-px">
      <img
        src="/images/landing/hero-photo.jpg"
        alt="Creator taking a selfie"
        className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[640px]"
      />
      <div className="absolute inset-x-0 bottom-5 overflow-hidden">
        <div className="animate-marquee flex w-max">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-2.5 pr-2.5" aria-hidden={half === 1}>
              {heroNotifications.map((n, i) => (
                <HeroNotification key={i} {...n} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  eyebrowClassName = "text-primary",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  eyebrowClassName?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className={`text-xs font-semibold uppercase tracking-wider ${eyebrowClassName}`}>
        {eyebrow}
      </div>
      <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: "solar:link-bold",
      title: "Create your page",
      body: "Sign up, pick your slug, and list your services with fixed prices or pay-what-you-want.",
    },
    {
      icon: "solar:users-group-rounded-bold",
      title: "Share your link",
      body: "Drop bookmi.co/you in your bio, DMs, or invoices. Anyone can browse and book — no app, no account needed.",
    },
    {
      icon: "solar:wallet-bold",
      title: "Get booked & paid",
      body: "Customers pay instantly via Monnify. Funds land in your wallet minus a small platform fee. Withdraw to your bank anytime.",
    },
  ];
  return (
    <section id="how-it-works" className="border-b border-gray-200 bg-[#FBD644]">
      <div className="container py-20">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title="From sign-up to booked in 5 minutes"
            subtitle="No website to build, no payment gateway to wire. Just a link that does the work."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <div className="card h-full p-6 pb-12 transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-medium">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon icon={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: null,
      title: "Monnify payments",
      body: "Cards, bank transfers, and USSD — customers pay however they want, instantly.",
    },
    {
      icon: "solar:wallet-bold",
      title: "Instant payouts",
      body: "Withdraw your balance to any Nigerian bank account in one tap.",
    },
    {
      icon: "solar:calendar-bold",
      title: "Bookings calendar",
      body: "See every booking in a clean calendar view and manage availability without the back-and-forth.",
    },
    {
      icon: "solar:magic-stick-bold",
      title: "Fixed or pay-what-you-want",
      body: "Set fixed prices or let happy clients pay more with a floor you control.",
    },
    {
      icon: "solar:link-bold",
      title: "One shareable link",
      body: "Your whole offering lives at bookmi.co/you. Put it anywhere — bio, receipt, WhatsApp status.",
    },
    {
      icon: "solar:check-circle-bold",
      title: "Confirmed by webhook",
      body: "Bookings confirm the moment Monnify verifies payment. No manual checks, no fake orders.",
    },
  ];
  return (
    <section className="border-b border-gray-200 bg-[#FFC4C4]">
      <div className="container py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Features"
            eyebrowClassName="text-[#D95656]"
            title="Everything you need to get paid for your time"
            subtitle="Bookmi handles the booking, the payment, and the payout — so you can focus on the work."
          />
        </Reveal>
        <Reveal
          delay={100}
          className="mt-12 grid gap-px overflow-hidden border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f) => (
            <div key={f.title} className="bg-white p-6">
              {f.icon ? (
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Icon icon={f.icon} className="h-5 w-5" />
                </span>
              ) : (
                <span className="inline-flex h-10 items-center">
                  <MonnifyMark className="h-9" />
                </span>
              )}
              <h3 className="mt-4 font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const audiences = [
    { name: "Consultants", image: "/images/landing/pro-consultants.jpg" },
    { name: "Tutors", image: "/images/landing/pro-tutors.jpg" },
    { name: "Stylists", image: "/images/landing/pro-stylists.jpg" },
    { name: "Therapists", image: "/images/landing/pro-therapists.jpg" },
    { name: "Creatives", image: "/images/landing/pro-creatives.jpg" },
    { name: "Coaches", image: "/images/landing/pro-coaches.jpg" },
    { name: "Lawyers", image: "/images/landing/pro-lawyers.jpg" },
    { name: "Trainers", image: "/images/landing/pro-trainers.jpg" },
  ];
  return (
    <section className="border-b border-gray-200">
      <div className="container pt-20">
        <Reveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for Nigeria's independent pros"
            subtitle="If you sell your time or a paid service, Bookmi is the link your clients need."
          />
        </Reveal>
      </div>
      <Reveal delay={100} className="mt-10 overflow-hidden">
        <div className="animate-marquee-slow flex w-max hover:[animation-play-state:paused]">
          {[0, 1].map((half) => (
            <div key={half} className="flex gap-4 pr-4" aria-hidden={half === 1}>
              {audiences.map((a) => (
                <Link
                  key={a.name}
                  to="/auth/signup"
                  tabIndex={half === 1 ? -1 : undefined}
                  className="group relative h-[420px] w-[280px] shrink-0 overflow-hidden sm:h-[520px] sm:w-[360px]"
                >
                  <img
                    src={a.image}
                    alt={a.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                    <span className="font-display text-2xl text-white">{a.name}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Icon icon="solar:arrow-right-up-linear" className="h-4 w-4 text-white" />
                    </span>
                  </div>
                  {/* Hovering any profession turns the tile into the "+ You" card —
                     the visual pitch that this could be your page. */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#FFDCC1] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Icon icon="solar:add-circle-linear" className="h-10 w-10 text-foreground" />
                    <span className="font-display text-3xl text-foreground">You</span>
                  </div>
                </Link>
              ))}
              <Link
                to="/auth/signup"
                tabIndex={half === 1 ? -1 : undefined}
                className="flex h-[420px] w-[280px] shrink-0 flex-col items-center justify-center gap-3 bg-[#FFDCC1] transition-colors hover:bg-[#ffd2ae] sm:h-[520px] sm:w-[360px]"
              >
                <Icon icon="solar:add-circle-linear" className="h-10 w-10 text-foreground" />
                <span className="font-display text-3xl">You</span>
              </Link>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Is Bookmi free to use?",
      a: "Signing up and creating your page is completely free. Bookmi takes a small percentage fee only when a booking or tip payment is processed through Monnify — no monthly subscription, no hidden charges.",
    },
    {
      q: "How do I get paid?",
      a: "Every payment goes straight into your Bookmi wallet, powered by Monnify. You can withdraw your balance to any Nigerian bank account at any time from your dashboard — usually within minutes.",
    },
    {
      q: "Do my clients need to create an account to book me?",
      a: "No. Clients can visit your bookmi.co/you link, pick a service, choose a time, and pay — all without signing up for anything. The fewer steps for them, the more bookings for you.",
    },
    {
      q: "What payment methods are supported?",
      a: "Monnify supports debit/credit cards, bank transfers, and USSD codes. Your clients can pay however is most convenient for them.",
    },
    {
      q: "Can I set my own prices?",
      a: "Yes. You set fixed prices per service, or enable pay-what-you-want with a minimum floor you control. You can update your prices anytime from your dashboard.",
    },
    {
      q: "What happens if a client doesn't pay after booking?",
      a: "Payment is required upfront before a booking is confirmed. Monnify verifies the transaction via webhook before we mark any slot as taken, so you'll never hold a spot for an unpaid booking.",
    },
    {
      q: "Can I accept tips even if I don't offer scheduled services?",
      a: "Absolutely. Tips and scheduled bookings are independent features. You can enable one, the other, or both — whatever fits your business model.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-b border-gray-200 bg-gray-50/50">
      <div className="container py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">FAQ</div>
          <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">Common questions</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Everything you need to know before you get started.
          </p>
        </Reveal>
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 50}>
                <div
                  className={`border bg-white transition-[border-color,transform,box-shadow] duration-300 ${
                    isOpen
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 hover:shadow-medium"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-foreground">{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                        isOpen ? "bg-primary text-white rotate-180" : "bg-primary-light text-primary"
                      }`}
                    >
                      <Icon icon="solar:alt-arrow-down-linear" className="h-4 w-4" />
                    </span>
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-top-1 duration-200">
                      {item.a}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          Still have a question?{" "}
          <Link to="/auth/signup" className="font-medium text-primary hover:underline">
            Get started
          </Link>{" "}
          — it takes five minutes to see for yourself.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-[#D95656] text-white">
      <div className="container relative z-10 pt-28 pb-52 sm:pt-36 sm:pb-64 text-center">
        <Reveal>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Get your bookmi link today.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl opacity-90 leading-relaxed">
            Free to set up. Live in five minutes. Start getting booked.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <Link
            to="/auth/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-button bg-white px-8 py-4 text-base sm:text-lg font-medium text-[#D95656] transition-all hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-md"
          >
            Create your page <Icon icon="solar:arrow-right-bold" className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] pointer-events-none select-none z-0">
        <Reveal delay={200}>
          <img src="/images/halfqore.svg" alt="" className="w-full h-auto object-bottom block" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Bookmi" className="h-7 w-7" />
          <span className="font-semibold">Bookmi</span>
          <span className="text-xs text-muted-foreground">
            · by{" "}
            <a href="https://qorelly.com/" target="_blank" rel="noopener noreferrer">
              Qorelly
            </a>
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/auth/login" className="hover:text-foreground">
            Sign in
          </Link>
          <Link to="/auth/signup" className="hover:text-foreground">
            Get started
          </Link>
          <span>
            © {new Date().getFullYear()}{" "}
            <a href="https://qorelly.com/" target="_blank" rel="noopener noreferrer">
              Qorelly
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function MockupHeader({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-3 px-4 pt-4">
      <img
        src="/images/landing/avatar-3.jpg"
        alt=""
        className="h-[46px] w-[46px] rounded-[23px] border-2 border-[#D95656] object-cover object-top"
      />
      <span className="rounded-button bg-[#D95656] px-4 py-3 font-mono text-xs text-white">
        {url}
      </span>
    </div>
  );
}

function InteractiveBookingMockup() {
  const [selectedDuration, setSelectedDuration] = useState("30 min");
  const [selectedDate, setSelectedDate] = useState("Mon 20");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");

  const durations = [
    { label: "30 min", price: "₦15,000" },
    { label: "60 min", price: "₦30,000" },
  ];
  const dates = ["Mon 20", "Tue 21", "Wed 22", "Thu 23"];
  const times = ["10:00 AM", "12:30 PM", "3:00 PM"];
  const currentPrice = selectedDuration === "30 min" ? "₦15,000" : "₦30,000";

  return (
    <div className="w-full max-w-[360px] rounded-[20px] bg-white p-4 shadow-medium">
      <MockupHeader url="bookmi.co/adaeze/book" />
      <div className="p-4">
        <div className="mb-4">
          <label className="font-display text-xs tracking-wider text-muted-foreground">
            Select Service
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {durations.map((d) => (
              <button
                key={d.label}
                onClick={() => setSelectedDuration(d.label)}
                className={`px-3 py-2 text-left border text-sm transition-all duration-200 ${
                  selectedDuration === d.label
                    ? "border-[#D95656] text-[#D95656] font-medium"
                    : "border-gray-200 hover:bg-gray-50 text-foreground"
                }`}
              >
                <div>{d.label}</div>
                <div className="text-xs font-semibold text-muted-foreground mt-0.5">{d.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="font-display text-xs tracking-wider text-muted-foreground">
            Select Date
          </label>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {dates.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDate(d)}
                className={`py-2 text-center border text-xs font-medium transition-all duration-200 ${
                  selectedDate === d
                    ? "border-[#D95656] bg-[#D95656] text-white"
                    : "border-gray-200 hover:bg-gray-50 text-muted-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="font-display text-xs tracking-wider text-muted-foreground">
            Select Time (WAT)
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 text-center border text-xs transition-all duration-200 ${
                  selectedTime === t
                    ? "border-[#D95656] bg-[#FFF4F4] text-[#D95656] font-medium"
                    : "border-gray-200 hover:bg-gray-50 text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button className="btn-primary w-full text-sm">Book &amp; Pay {currentPrice}</button>
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Icon icon="solar:card-bold" className="h-3.5 w-3.5" /> Secure payment via <MonnifyLink />
        </div>
      </div>
    </div>
  );
}

function InteractiveTippingMockup() {
  const presets = [2000, 5000, 10000];
  const [selectedPreset, setSelectedPreset] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const getDisplayAmount = () => {
    if (selectedPreset !== null) return `₦${selectedPreset.toLocaleString()}`;
    if (customAmount) {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? "₦0" : `₦${parsed.toLocaleString()}`;
    }
    return "Support";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setMessage("");
    }, 3000);
  };

  return (
    <div className="w-full max-w-[360px] rounded-[20px] bg-white p-4 shadow-medium">
      <MockupHeader url="bookmi.co/adaeze/tip" />
      <div className="p-4">
        {isSent ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-300">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary mb-4">
              <Icon icon="solar:heart-bold" className="h-6 w-6" />
            </span>
            <h4 className="font-display text-lg font-semibold text-foreground">Support Sent!</h4>
            <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">
              Adaeze O. received your support of {getDisplayAmount()}. Thank you!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="font-display text-xs tracking-wider text-muted-foreground">
                Select Support Amount
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {presets.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => handlePresetSelect(amount)}
                    className={`py-2 text-center border text-sm font-medium transition-all duration-200 ${
                      selectedPreset === amount
                        ? "border-[#D95656] bg-[#FFF4F4] text-[#D95656]"
                        : "border-gray-200 hover:bg-gray-50 text-foreground"
                    }`}
                  >
                    ₦{amount.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="font-display text-xs tracking-wider text-muted-foreground">
                Or enter custom amount (₦)
              </label>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="input-field mt-2 text-sm"
                min="500"
              />
            </div>

            <div className="mb-5">
              <label className="font-display text-xs tracking-wider text-muted-foreground">
                Leave a friendly note
              </label>
              <textarea
                placeholder="Say something nice (optional)..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-field mt-2 text-sm min-h-[70px] resize-none py-2"
                maxLength={100}
              />
            </div>

            <button type="submit" className="btn-primary w-full text-sm">
              Send {getDisplayAmount()} Support
            </button>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Icon icon="solar:card-bold" className="h-3.5 w-3.5" /> Secure payment via{" "}
              <MonnifyLink />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function DualFunctionality() {
  const [active, setActive] = useState<"bookings" | "tips">("bookings");

  const panels = {
    bookings: {
      icon: (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
          <Icon icon="solar:calendar-bold" className="h-5 w-5" />
        </span>
      ),
      title: "Bookings & Paid Consultations",
      body: "Let clients browse your availability, reserve their slot, and pay upfront. No calendar overlaps, no payment chasing, and no scheduling back-and-forth.",
      points: [
        "Set custom durations and fixed rates",
        "Auto-verify payments via Monnify before confirm",
        "Seamlessly integrates with your dashboard",
      ],
    },
    tips: {
      icon: (
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
          <Icon icon="solar:heart-bold" className="h-5 w-5" />
        </span>
      ),
      title: "Tips & Support",
      body: "Give your fans, newsletter readers, or happy clients a direct path to support you. No calendar schedules required. One tap, choose an amount, and you're paid instantly.",
      points: [
        "Fast one-tap preset amount buttons",
        "Let fans write friendly messages or notes",
        "Frictionless checkout with Monnify",
      ],
    },
  } as const;

  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="container py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">
          <div className="flex flex-col justify-center gap-8">
            <Reveal>
              <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                Double the ways to get paid.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Bookmi isn't just a scheduling tool. It's a complete, friction-free portal where
                clients can book your time OR send tips.
              </p>
            </Reveal>
            <Reveal delay={80} className="flex flex-col gap-4">
              {(Object.keys(panels) as Array<keyof typeof panels>).map((key) => {
                const panel = panels[key];
                const isActive = active === key;
                return (
                  <div
                    key={key}
                    className={`relative overflow-hidden border transition-colors ${
                      isActive ? "border-primary bg-[#FFF3EC]" : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setActive(key)}
                      className="flex w-full items-center gap-3 px-6 py-5 text-left"
                      aria-expanded={isActive}
                    >
                      {panel.icon}
                      <span className="font-display text-xl">{panel.title}</span>
                    </button>
                    {isActive && (
                      <div className="relative px-6 pb-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-muted-foreground leading-relaxed">{panel.body}</p>
                        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                          {panel.points.map((p) => (
                            <li key={p} className="flex items-center gap-2">
                              <CheckBadge /> {p}
                            </li>
                          ))}
                        </ul>
                        <img
                          src="/images/landing/yellowmark.svg"
                          alt=""
                          className="pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 select-none"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Reveal>
          </div>
          <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden bg-[#FBD644] p-8 sm:p-12">
            {/* Pattern renders oversized at its natural aspect ratio — sizing it to the
               panel would squish the flowers (the SVG has preserveAspectRatio="none"). */}
            <img
              src="/images/landing/yellow-pattern.svg"
              alt=""
              className="pointer-events-none absolute left-1/2 top-1/2 w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 select-none sm:w-[220%]"
              style={{ aspectRatio: "2313 / 3240" }}
            />
            <Reveal delay={120} className="relative w-[360px] max-w-full">
              <div key={active} className="animate-in fade-in slide-in-from-bottom-3 duration-300">
                {active === "bookings" ? <InteractiveBookingMockup /> : <InteractiveTippingMockup />}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
