import Image from "next/image";

type DoctorCardProps = {
  name: string;
  specialty: string;
  qualification: string;
  imageSrc: string;
};

export default function DoctorCard({
  name,
  specialty,
  qualification,
  imageSrc,
}: DoctorCardProps) {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1 px-5 py-4 text-start">
        <h3 className="text-base font-semibold text-foreground">{name}</h3>
        <p className="text-sm font-medium text-primary-dark">{specialty}</p>
        <p className="text-sm text-text-secondary">{qualification}</p>
      </div>
    </div>
  );
}
