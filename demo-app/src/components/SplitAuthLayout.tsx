import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Link2, MapPin, X } from "lucide-react";

const SLIDES = [
  "/images/login/loginimg.jpg",
  "/images/login/loginimg1.jpg",
  "/images/login/loginimg2.jpg",
];
const SLIDE_INTERVAL = 5000;

export type ProfileCardContent = {
  name?: string;
  location?: string;
  handle?: string;
  role?: string;
  image?: string;
};

/**
 * Split-screen auth shell — 35% form column on a solid white background,
 * 65% full-bleed image slider with a floating profile card bottom-right.
 * Used by Login + Signup + Forgot-password + Onboarding.
 *
 * Pass `card` to override the profile card's text (e.g. onboarding passes
 * live form values so the card becomes a preview of the user's page).
 * Form column is center-aligned both axes; right column hidden on < lg.
 */
export function SplitAuthLayout({
  children,
  card,
}: {
  children: ReactNode;
  card?: ProfileCardContent;
}) {
  return (
    <div className="relative min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center bg-white px-6 py-12">
        <div className="anim-fade-up w-full max-w-md">{children}</div>
      </div>
      <HeroSlider card={card} />

      {/* Close — top right, exits auth back to landing */}
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

function HeroSlider({ card }: { card?: ProfileCardContent }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="relative hidden lg:block overflow-hidden bg-primary">
      <div className="absolute inset-0">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden={i !== index}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Dot indicators — bottom-center, above the attribution card */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="h-1.5 rounded-full bg-white transition-all duration-300"
            style={{ width: i === index ? 24 : 8, opacity: i === index ? 1 : 0.5 }}
          />
        ))}
      </div>

      {/* Profile card — bottom right */}
      <ProfileCard card={card} />
    </aside>
  );
}

function ProfileCard({ card }: { card?: ProfileCardContent }) {
  const name = card?.name ?? "Ethan Vale";
  const location = card?.location ?? "Brooklyn, NY";
  const handle = card?.handle ?? "@ethan_val.e";
  const role = card?.role ?? "Visual Artist";
  const image = card?.image ?? "/images/profile/user.jpg";
  const isLink = location.startsWith("book.me/");
  const LocationIcon = isLink ? Link2 : MapPin;

  return (
    <div
      className="anim-fade-up absolute bottom-6 right-6 z-10 w-60 overflow-hidden rounded-3xl shadow-medium"
      style={{ "--anim-delay": "200ms" } as React.CSSProperties}
    >
      <div className="relative aspect-[3/4]">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Legibility gradients for overlaid text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/65" />

        {/* Top — name + location pill, centered */}
        <div className="absolute top-4 left-0 right-0 flex flex-col items-center gap-2 px-3">
          <h3 className="text-lg font-bold leading-tight text-white drop-shadow">{name}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
            <LocationIcon className="h-3 w-3" /> {location}
          </span>
        </div>

        {/* Bottom — avatar + handle (left), Book button (right) */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src={image}
              alt=""
              className="h-8 w-8 shrink-0 rounded-full object-cover ring-2 ring-white/80"
            />
            <div className="leading-tight">
              <div className="text-xs font-medium text-white">{handle}</div>
              <div className="text-[11px] text-white/70">{role}</div>
            </div>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition-all hover:bg-gray-100 active:scale-95"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplitAuthLayout;
