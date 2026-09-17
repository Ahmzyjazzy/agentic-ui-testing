import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, CheckCircle2, Link2, Wallet } from "lucide-react";

/**
 * Bookmi landing page - trimmed version of bookmi/apps/web LandingPage.tsx.
 * Same tokens and component classes, no Supabase or API calls.
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-foreground">
      <Nav />
      <Hero />
      <HowItWorks />
      <Features />
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
            to="/auth/login"
            className="inline-flex items-center gap-1.5 rounded-button bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover active:scale-95 transition-all"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="overflow-hidden border-b border-gray-200 bg-white">
      <div className="container py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="anim-fade-up inline-flex items-center gap-1.5 rounded-button bg-primary-light px-3 py-1 text-xs font-medium text-primary">
              Powered by Monnify
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
              your services and pay in seconds - money lands in your Monnify wallet, withdraw to your
              bank anytime.
            </p>
            <div
              className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row"
              style={{ "--anim-delay": "270ms" } as React.CSSProperties}
            >
              <Link to="/auth/login" className="btn-primary text-base">
                Get your link <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary text-base">
                See how it works
              </a>
            </div>
            <ul
              className="anim-fade-up mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{ "--anim-delay": "360ms" } as React.CSSProperties}
            >
              {["No setup fee", "Pay out to any Nigerian bank", "Live in 5 minutes"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="anim-fade-up"
            style={{ "--anim-delay": "220ms" } as React.CSSProperties}
          >
            <HeroPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="card-elevated p-5">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
        <img src="/images/landing/avatar-1.png" alt="" className="h-12 w-12 rounded-full object-cover" />
        <div>
          <div className="font-display text-lg leading-6">Adaeze Okafor</div>
          <div className="text-xs text-muted-foreground">Brand strategist - Lagos</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1 rounded-button bg-primary-light px-3 py-1 text-xs font-medium text-primary">
          <Link2 className="h-3.5 w-3.5" /> bookmi.co/adaeze
        </span>
      </div>
      <ul className="divide-y divide-gray-200">
        {[
          { name: "Brand strategy call", meta: "45 min", price: "NGN 15,000" },
          { name: "Portfolio review", meta: "30 min", price: "NGN 10,000" },
          { name: "Full brand sprint", meta: "3 hrs", price: "NGN 120,000" },
        ].map((s) => (
          <li key={s.name} className="flex items-center justify-between py-3">
            <div>
              <div className="text-sm font-medium">{s.name}</div>
              <div className="text-xs text-muted-foreground">{s.meta}</div>
            </div>
            <span className="text-sm font-medium">{s.price}</span>
          </li>
        ))}
      </ul>
      <button className="btn-primary mt-4 w-full">Book now</button>
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { icon: <Link2 className="h-6 w-6 text-primary" />, title: "Claim your link", body: "Pick a slug and list the services you offer." },
    { icon: <CalendarCheck className="h-6 w-6 text-primary" />, title: "Share it anywhere", body: "Bio, WhatsApp, invoice footer - anyone can book a slot." },
    { icon: <Wallet className="h-6 w-6 text-primary" />, title: "Get paid instantly", body: "Money lands in your wallet. Withdraw to any Nigerian bank." },
  ];
  return (
    <section id="how-it-works" className="border-b border-gray-200 bg-gray-50">
      <div className="container py-16">
        <SectionHeading eyebrow="How it works" title="Three steps to your first booking" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="card p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-light">
                {s.icon}
              </span>
              <h3 className="mt-4 font-display text-xl">
                {String(i + 1).padStart(2, "0")} - {s.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { title: "One link, every service", body: "Consultations, sessions, sprints - each with its own price and duration." },
    { title: "Wallet you control", body: "Every payment settles into a Monnify-backed wallet you can withdraw from." },
    { title: "Tips, not just bookings", body: "Fans can drop a tip on the same page, no booking required." },
  ];
  return (
    <section className="border-b border-gray-200 bg-white">
      <div className="container py-16">
        <SectionHeading eyebrow="Features" title="Built for people who sell their time" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs font-medium uppercase tracking-wide text-primary">{eyebrow}</span>
      <h2 className="mt-2 font-display text-3xl tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function FinalCTA() {
  return (
    <section className="bg-primary text-white">
      <div className="container py-16 text-center">
        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">Ready to get booked?</h2>
        <p className="mx-auto mt-4 max-w-lg text-white/80">
          Claim your Bookmi link today and take your first payment this week.
        </p>
        <Link
          to="/auth/login"
          className="mt-8 inline-flex items-center gap-2 rounded-button bg-white px-6 py-3 font-medium text-primary hover:bg-white/90 active:scale-95 transition-all"
        >
          Sign in to your dashboard <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white">
      <div className="container flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row">
        <span>Bookmi by Qorelly - demo build for the codelab</span>
        <span>No real payments. No real data.</span>
      </div>
    </footer>
  );
}
