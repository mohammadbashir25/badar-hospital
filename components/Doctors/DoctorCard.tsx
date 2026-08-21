type DoctorCardProps = {
  name: string;
  specialty: string;
  qualification: string;
};

export default function DoctorCard({ name, specialty, qualification }: DoctorCardProps) {
  return (
    <div className="group rounded-xl border border-border bg-surface p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface-blue">
        {/*
          Real portrait goes here once available. Replace this placeholder with:

          <Image
            src={imageSrc}
            alt={`${name} — ${specialty}`}
            fill
            sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />

          Until then, this is a clean, decorative placeholder — it carries no
          meaningful screen-reader content since there is no real doctor yet.
        */}
        <div aria-hidden className="flex h-full w-full items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 text-primary/40"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
          </svg>
        </div>
      </div>

      <p className="mt-4 text-base font-semibold text-foreground">{name}</p>
      <p className="mt-1 text-sm text-primary-dark">{specialty}</p>
      <p className="mt-0.5 text-xs text-text-muted">{qualification}</p>
    </div>
  );
}
