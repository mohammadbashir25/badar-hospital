// Temporary placeholder data for the homepage "Featured Doctors" section.
//
// Replace each `imageSrc` with a real portrait once available, e.g.
// "/images/doctors/dr-jane-smith.jpg". No other changes are needed —
// name/specialty/qualification text comes from translations until
// real per-doctor content exists.

export type FeaturedDoctor = {
  id: string;
  imageSrc: string;
};

export const featuredDoctors: FeaturedDoctor[] = [
  { id: "doctor-1", imageSrc: "/doctors/2.jpg" },
  { id: "doctor-2", imageSrc: "/doctors/3.jpg" },
  { id: "doctor-3", imageSrc: "/doctors/4.jpg" },
  { id: "doctor-4", imageSrc: "/doctors/1.jpg" },
];