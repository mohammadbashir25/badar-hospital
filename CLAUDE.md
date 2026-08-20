# Badar Medical Hospital — Claude Project Instructions

## 1. Project Identity

You are working on the **Badar Medical Hospital** website.

Badar is an Afghan healthcare brand. The website must communicate:

- Trust
- Professionalism
- Human care
- Modern healthcare
- Accessibility
- Calm confidence
- Local relevance to Afghanistan

The website should feel **world-class and modern without looking like a generic Western hospital template**.

The core emotional message is:

> **Your Health. Our Commitment.**

The website is a real hospital marketing/information website, not a hospital management system.

---

## 2. Primary Goal

The website has two primary jobs:

1. Build trust in Badar Medical Hospital.
2. Help visitors quickly understand the hospital and find the information they need.

Important patient actions are:

- Explore services
- Explore specialties
- Find doctors
- Learn about Badar
- View facilities
- Call the hospital
- Contact the hospital
- Get directions
- Access emergency contact information

### Appointment Policy

Do **not** invent or build a fake online appointment booking system.

Badar does not rely heavily on online appointment booking.

The frontend may include contact/request CTAs where appropriate, but never imply that an appointment was actually booked unless a real backend system is connected.

Preferred conversion actions:

- Contact Us
- Call Us
- Talk to Our Team
- Get Directions
- Call Emergency

If an appointment/request form is ever added, clearly label it as a **request/inquiry**, not a confirmed booking.

---

## 3. Technology Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- next/image
- next/font
- Framer Motion where appropriate

Do not introduce unnecessary libraries.

Before installing a dependency, determine whether the existing stack already solves the problem.

---

## 4. Multilingual Architecture

The website supports three languages:

- English
- Dari
- Pashto

Locales:

```text
/en
/fa
/ps
```

English is LTR.

Dari and Pashto are RTL.

The multilingual system must be designed from the beginning. Do not build English first and patch RTL later.

### Language Switching

Language switching must preserve the current route.

Example:

```text
/en/doctors/dr-ahmad
/fa/doctors/dr-ahmad
/ps/doctors/dr-ahmad
```

Do not send the user back to the homepage merely because they changed language.

---

## 5. Translation Architecture

There are two different types of localized content.

## UI translations

Put reusable interface text in:

```text
src/messages/en.json
src/messages/fa.json
src/messages/ps.json
```

Examples:

- Home
- About
- Services
- Specialties
- Doctors
- Facilities
- Contact
- Learn More
- View All
- Contact Us
- Emergency
- Read More

## Hospital Content

Large content entities belong in the content/data layer.

Examples:

- About content
- Services
- Specialties
- Doctors
- Facilities
- Testimonials
- Hospital information

Use localized values such as:

```ts
type LocalizedText = {
  en: string;
  fa: string;
  ps: string;
};
```

Do not scatter large translated strings directly inside components.

---

## 6. Single Source of Truth

This is one of the most important rules in the entire project.

**Never duplicate business content across components and pages.**

Use one canonical source for:

- Hospital information
- Phone numbers
- Email
- Address
- Social links
- Services
- Specialties
- Doctors
- Facilities
- Testimonials
- About content
- Images

Example:

A doctor appears on:

- Homepage
- Doctors page
- Specialty page

There must still be **one doctor record**.

A specialty appears on:

- Homepage
- Specialties page
- Doctor page
- Service page

It must still come from the same specialty record.

---

## 7. Content Architecture

Recommended:

```text
src/
├── content/
│   ├── hospital.ts
│   ├── about.ts
│   ├── services.ts
│   ├── specialties.ts
│   ├── doctors.ts
│   ├── facilities.ts
│   └── testimonials.ts
│
├── messages/
│   ├── en.json
│   ├── fa.json
│   └── ps.json
│
└── types/
```

The content layer describes **what Badar says**.

The component layer describes **how Badar looks**.

Never mix these responsibilities unnecessarily.

---

## 8. Homepage Architecture

The homepage is the emotional/brand centerpiece.

Current homepage sections:

1. Navbar
2. Hero
3. Trust Signals
4. Short About
5. Short Specialties
6. Short Services
7. Featured Doctors
8. Why Badar
9. Facilities
10. Testimonials
11. Emergency CTA
12. Contact Preview
13. Footer

The homepage should **preview** the deeper website pages rather than duplicate all their content.

---

## 9. Main Pages

The website includes:

```text
Home
About
Services
Specialties
Doctors
Facilities
Contact
```

Dynamic detail pages are encouraged for major content entities:

```text
/services/[slug]
/specialties/[slug]
/doctors/[slug]
/facilities/[slug]
```

Use detail pages when Badar has enough real content to justify them.

Do not create unnecessary pages just for the sake of architecture.

---

## 10. Page Responsibilities

## Home

Purpose:

- Brand introduction
- Emotional trust
- High-level discovery
- Guide users to deeper pages
- Strong contact/emergency actions

## About

Purpose:

- Full institutional story
- Mission
- Vision
- Values
- Who We Are
- History or leadership if real information exists
- CTA

## Services

Purpose:

- Explain what medical services Badar provides
- Provide clear service discovery
- Link to related specialties and doctors where relevant

## Specialties

Purpose:

- Explain medical areas/departments of expertise
- Help users identify the right medical field
- Connect specialties to services and doctors

## Doctors

Purpose:

- Help users discover healthcare professionals
- Search/filter when appropriate
- Provide complete doctor profiles

## Facilities

Purpose:

- Show hospital environment
- Build confidence through authentic photography
- Explain important facilities and capabilities

## Contact

Purpose:

- Phone
- Email
- Address
- Emergency
- Opening hours
- Map
- Contact/inquiry form if appropriate
- Get Directions

---

## 11. Services vs Specialties

Keep these concepts separate.

### Specialty

The medical field or area of expertise.

Examples:

- Cardiology
- Orthopedics
- Pediatrics
- Gynecology
- Internal Medicine

### Service

The specific care/service available to the patient.

Examples:

- ECG
- Ultrasound
- Laboratory
- Emergency Care
- Surgery
- Diagnostic Imaging

Services and specialties should be connected through relationships rather than duplicated manually.

Example:

```text
Cardiology
├── Cardiac Consultation
├── ECG
└── Echocardiography
```

---

## 12. Content Models

Use typed content where possible.

## Hospital

```ts
type Hospital = {
  name: string;
  shortName: string;
  tagline: LocalizedText;
  phone: string;
  emergencyPhone?: string;
  email?: string;
  address: LocalizedText;
  coordinates?: {
    lat: number;
    lng: number;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
};
```

## About

Support both short and full versions.

```ts
type AboutContent = {
  eyebrow: LocalizedText;
  title: LocalizedText;

  shortDescription: LocalizedText;
  fullDescription: LocalizedText;

  mission?: LocalizedText;
  vision?: LocalizedText;

  values?: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;

  image?: string;
};
```

Homepage uses `shortDescription`.

About page uses `fullDescription`, mission, vision, values, etc.

## Service

```ts
type Service = {
  slug: string;
  name: LocalizedText;

  shortDescription: LocalizedText;
  description: LocalizedText;

  icon?: string;
  image?: string;

  relatedSpecialties: string[];
  relatedDoctors: string[];

  featured: boolean;

  seo?: LocalizedSEO;
};
```

## Specialty

```ts
type Specialty = {
  slug: string;
  name: LocalizedText;

  shortDescription: LocalizedText;
  description: LocalizedText;

  image?: string;

  services: string[];
  doctors: string[];

  featured: boolean;

  seo?: LocalizedSEO;
};
```

## Doctor

```ts
type Doctor = {
  slug: string;
  name: LocalizedText;

  specialty: string;
  role: LocalizedText;

  shortBio: LocalizedText;
  fullBio: LocalizedText;

  qualifications?: LocalizedText[];
  experience?: LocalizedText;

  languages?: string[];

  image: string;

  services?: string[];

  featured: boolean;

  seo?: LocalizedSEO;
};
```

## Facility

```ts
type Facility = {
  slug: string;
  name: LocalizedText;

  shortDescription: LocalizedText;
  description: LocalizedText;

  image: string;
  gallery?: string[];

  featured: boolean;

  seo?: LocalizedSEO;
};
```

## Testimonial

Only use real/approved testimonials.

```ts
type Testimonial = {
  id: string;
  quote: LocalizedText;
  author: LocalizedText;
  role?: LocalizedText;
  image?: string;
  featured: boolean;
};
```

## SEO

```ts
type LocalizedSEO = {
  title: LocalizedText;
  description: LocalizedText;
};
```

---

## 13. Content Depth Rule

Where content appears in both homepage and detail pages, use different content lengths.

Example:

```text
About
├── shortDescription
└── fullDescription
```

Homepage:

```text
shortDescription
```

About page:

```text
fullDescription
```

Same principle applies to:

- Services
- Specialties
- Doctors
- Facilities

Never create duplicate descriptions simply because two pages need different layouts.

---

## 14. Relationships Between Entities

The site should behave like a connected system.

Example:

```text
Specialty
   ↓
Related Services
   ↓
Related Doctors
   ↓
Contact
```

Another:

```text
Doctor
   ↓
Specialty
   ↓
Services
   ↓
Contact
```

Another:

```text
Service
   ↓
Related Specialty
   ↓
Related Doctors
   ↓
Contact
```

No important page should become a dead end.

---

## 15. Component Architecture

Keep components small, focused, and reusable.

Recommended areas:

```text
src/components/
├── layout/
├── navigation/
├── hero/
├── about/
├── services/
├── specialties/
├── doctors/
├── facilities/
├── testimonials/
├── contact/
├── sections/
└── ui/
```

Homepage can be composed approximately like:

```text
HomePage
├── Navbar
├── Hero
├── TrustSignals
├── AboutPreview
├── SpecialtyPreview
├── ServicePreview
├── FeaturedDoctors
├── WhyBadar
├── FacilitiesPreview
├── Testimonials
├── EmergencyCTA
├── ContactPreview
└── Footer
```

Do not create a huge 500–1000 line homepage component.

---

## 16. Preview Component Rule

Use reusable preview components for homepage sections.

Examples:

```text
AboutPreview
SpecialtyPreview
ServicePreview
FeaturedDoctors
FacilitiesPreview
ContactPreview
```

These should consume the same canonical content used by their complete pages.

Example:

```text
about.ts
   ↓
AboutPreview
   ↓
About Page
```

This guarantees consistency.

---

## 17. Routing Rules

Localized routes:

```text
/en
/fa
/ps
```

Main pages:

```text
/en/about
/fa/about
/ps/about

/en/services
/fa/services
/ps/services

/en/specialties
/fa/specialties
/ps/specialties

/en/doctors
/fa/doctors
/ps/doctors

/en/facilities
/fa/facilities
/ps/facilities

/en/contact
/fa/contact
/ps/contact
```

Dynamic routes:

```text
/en/services/[slug]
/fa/services/[slug]
/ps/services/[slug]

/en/specialties/[slug]
/fa/specialties/[slug]
/ps/specialties/[slug]

/en/doctors/[slug]
/fa/doctors/[slug]
/ps/doctors/[slug]

/en/facilities/[slug]
/fa/facilities/[slug]
/ps/facilities/[slug]
```

Keep route naming consistent.

---

## 18. RTL Rules

RTL is a first-class layout mode.

Never patch RTL with dozens of one-off overrides.

Prefer logical properties:

```text
ms-
me-
ps-
pe-
start
end
```

Avoid unnecessary reliance on:

```text
ml-
mr-
pl-
pr-
left
right
```

Directional icons must make sense in RTL.

Text alignment, layout ordering, navigation, cards, breadcrumbs, arrows, and spacing must all be checked in RTL.

---

## 19. Design System

## Brand colors

```text
Primary Cyan: #43C3D6
Deep Navy:    #011936
Emergency Red:#ED1D24
Background:   #F8FCFD
White:        #FFFFFF
Secondary Text:#526579
```

Recommended visual balance:

```text
60% light backgrounds / white
20% navy
15% cyan
5% red
```

Red is primarily an **emergency/urgent action color**.

Do not use red everywhere.

## Typography

English:

```text
Inter
```

Dari/Pashto:

```text
Noto Sans Arabic
```

The typography should prioritize readability and trust.

---

## 20. Visual Character

Badar should feel:

- Trustworthy
- Human
- Modern
- Calm
- Professional
- Premium
- Accessible
- Afghan

It should NOT feel:

- Generic Bootstrap
- Old-fashioned hospital portal
- Overly corporate
- Overly flashy
- Gaming-like
- Full of unnecessary gradients
- Full of excessive glassmorphism
- Full of decorative animations

The website should communicate quiet confidence.

---

## 21. Motion Rules

Use GSAP or Framer Motion selectively.

Good uses:

- Hero image reveal
- Text stagger
- Scroll reveal
- Image clip reveal
- Subtle parallax
- Card hover interactions
- Navbar transition
- Gallery interactions

Avoid:

- Animation everywhere
- Constant floating objects
- Excessive text effects
- Huge page transitions
- Animation that delays access to important healthcare information

Animation must improve hierarchy and perceived quality.

---

## 22. Image Rules

Use `next/image`.

Centralize image paths in content/data.

Recommended:

```text
public/
└── images/
    ├── branding/
    ├── hero/
    ├── about/
    ├── services/
    ├── specialties/
    ├── doctors/
    └── facilities/
```

Do not duplicate the same image under multiple random names.

Use meaningful filenames.

Do not use fake medical stock images if actual Badar photography is available.

---

## 23. Medical Content Safety & Accuracy

Never invent:

- Doctors
- Medical qualifications
- Statistics
- Certifications
- Testimonials
- Services
- Medical claims
- Hospital capabilities

When real content is unavailable, use clearly marked placeholders.

Example:

```text
[REAL HOSPITAL STATISTIC REQUIRED]
```

Do not silently make up a plausible number.

Do not write risky medical advice as if it were official hospital guidance.

---

## 24. Accessibility

Every feature must consider:

- Keyboard navigation
- Visible focus states
- Semantic HTML
- Proper heading hierarchy
- Meaningful link/button labels
- Alt text
- Color contrast
- Accessible forms
- Reduced-motion preferences
- Screen-reader labels
- Touch target sizes

Do not sacrifice accessibility for visual effects.

---

## 25. SEO

Each major content page should support localized SEO metadata.

Use:

- Unique title
- Unique description
- Canonical URLs
- Open Graph
- Sitemap
- Robots
- Semantic HTML
- Structured data where appropriate
- Internal linking between related entities

Potential structured data may include appropriate healthcare organization, physician, local business, and breadcrumb schemas, but only when the data is actually available and accurate.

Do not create fake schema information.

---

## 26. Internal Linking

Use intentional internal links.

Examples:

```text
Homepage
→ Services
→ Specialties
→ Doctors
→ Facilities
→ Contact
```

Specialty:

```text
Specialty
→ Related Services
→ Related Doctors
→ Contact
```

Doctor:

```text
Doctor
→ Specialty
→ Services
→ Contact
```

Service:

```text
Service
→ Specialty
→ Doctors
→ Contact
```

Facilities:

```text
Facility
→ Related service/care information
→ Contact
```

Internal navigation should help a patient continue their journey.

---

## 27. CTA Strategy

Do not use one generic CTA everywhere.

Use context-aware actions.

### Main

```text
Contact Us
```

### Doctor

```text
Contact Hospital
```

or an appropriate doctor-related action.

### Specialty

```text
Explore Related Services
```

### Service

```text
Contact Us About This Service
```

### Facilities

```text
Explore Badar
```

### Contact

```text
Get Directions
```

### Emergency

```text
Call Emergency
```

Do not use "Book Appointment" as a major CTA unless Badar actually supports that workflow.

---

## 28. Contact Strategy

Contact is the main conversion area.

Make it easy to:

- Call
- WhatsApp, if the hospital actually uses it
- Email
- View location
- Get directions
- Find emergency contact
- See working hours

If a form exists, treat it as an inquiry/contact form unless there is a real backend.

Never imply that a message was received unless the implementation actually confirms it.

---

## 29. Mobile-First Rules

The website must work exceptionally well on mobile.

Check:

- Navbar
- Language switcher
- Hero
- CTA buttons
- Doctor cards
- Specialty cards
- Service cards
- Gallery
- Contact actions
- Emergency call action
- Forms
- Footer

Emergency and contact actions should be easy to tap.

Do not merely shrink desktop layouts.

---

## 30. Data Fetching / Backend Rule

This project is primarily a frontend website.

Do not invent a backend architecture unless explicitly requested.

For static hospital information, prefer a maintainable content/data system.

If a real API or CMS is added later, the data layer should be structured so it can be replaced without rebuilding the entire component architecture.

---

## 31. Code Quality Rules

Always:

- Use TypeScript
- Avoid unnecessary `any`
- Keep functions focused
- Use clear names
- Keep content separate from UI
- Avoid duplicated logic
- Use reusable components
- Use existing design tokens
- Prefer simple solutions
- Keep files maintainable

Do not over-engineer.

Do not create abstractions simply because they look architecturally impressive.

Create abstractions when they reduce duplication or improve maintainability.

---

## 32. Before Coding Any New Task

Never immediately start coding.

First:

1. Read this file.
2. Inspect the existing project structure.
3. Identify related components.
4. Identify related content/data.
5. Identify existing utilities.
6. Identify the design tokens being used.
7. Determine whether the task extends an existing system.
8. Reuse before creating new code.

Only then implement.

---

## 33. Before Creating a New Component

Ask:

- Does a similar component already exist?
- Can an existing component accept props instead?
- Is this truly reusable?
- Does this belong in `components/ui` or a domain section?
- Does the component need localized content?
- Does it work in RTL?
- Does it work on mobile?
- Does it preserve accessibility?

Do not create duplicate components with slightly different names.

---

## 34. Before Modifying a Page

Check:

- Existing layout
- Existing sections
- Existing data
- Existing links
- Existing metadata
- Existing localization
- Existing responsive behavior

Do not replace working architecture unnecessarily.

---

## 35. Required Development Workflow

For every feature:

```text
UNDERSTAND
    ↓
INSPECT
    ↓
REUSE
    ↓
DESIGN
    ↓
IMPLEMENT
    ↓
TEST
    ↓
VERIFY
```

After implementation verify:

### Languages

- English
- Dari
- Pashto

### Direction

- LTR
- RTL

### Breakpoints

- Mobile
- Tablet
- Desktop

### Functional

- Navigation
- Links
- Buttons
- Forms
- Images
- Language switching

### Quality

- Accessibility
- SEO
- Performance
- Content consistency
- No duplicated business data
- No broken routes

---

## 36. New Chat / New Session Protocol

When working in a new Claude chat, assume the conversation history is unavailable.

Always treat this file as the project source of truth.

Start the session by reading:

```text
CLAUDE.md
```

Then inspect the current repository.

Do not assume the project still has the same structure without checking.

Use this protocol:

```text
1. Read CLAUDE.md
2. Inspect project structure
3. Inspect relevant files
4. State what will be reused
5. State what will change
6. Implement
7. Verify multilingual behavior
8. Verify RTL
9. Verify responsive behavior
10. Summarize changes
```

---

## 37. Standard New-Task Prompt

When starting a new task in Claude, use:

```text
You are continuing the Badar Medical Hospital project.

Read CLAUDE.md first.

Do not redesign the existing architecture unless there is a
clear technical reason.

Today's task:
[DESCRIBE TASK]

Before coding:
1. Inspect the existing architecture.
2. Find existing components and content to reuse.
3. Identify the exact files that should change.
4. Explain briefly where the feature belongs.
5. Implement it within the existing system.

Requirements:
- Next.js App Router
- TypeScript
- Tailwind CSS
- next-intl
- English LTR
- Dari RTL
- Pashto RTL
- Badar design system
- Single source of truth
- Responsive
- Accessible
- SEO-friendly
- Maintainable
- No duplicated business content

After implementation:
- Verify English
- Verify Dari
- Verify Pashto
- Verify LTR/RTL
- Verify mobile/tablet/desktop
- Verify navigation and links
- Verify content consistency
- Verify no unnecessary duplicated code
```

---

## 38. Definition of Done

A feature is not finished simply because it compiles.

A feature is complete when:

- It fits the existing architecture.
- It reuses canonical data.
- It works in English.
- It works in Dari.
- It works in Pashto.
- RTL is correct.
- It is responsive.
- It is accessible.
- It uses the Badar design system.
- It does not duplicate business content.
- It does not introduce unnecessary dependencies.
- It has appropriate SEO metadata when applicable.
- It has no obvious visual regressions.
- It works with related pages/components.

---

## 39. Golden Rules

Keep these rules in mind at all times:

### Rule 1
**One source of truth.**

### Rule 2
**One component system for all languages.**

### Rule 3
**RTL is built in from the beginning.**

### Rule 4
**Homepage previews; detail pages explain.**

### Rule 5
**Services and specialties are different concepts.**

### Rule 6
**Doctors, specialties, services, and facilities must be linked through data relationships.**

### Rule 7
**Do not invent medical facts.**

### Rule 8
**Do not build backend features that Badar does not need.**

### Rule 9
**Reuse before creating.**

### Rule 10
**Maintainability is more important than clever code.**

### Rule 11
**The website should feel calm and trustworthy before it feels impressive.**

### Rule 12
**Every page should help the patient know what to do next.**

---

## 40. Final Creative Direction

The experience should communicate:

> **A modern Afghan hospital with professional standards, human care, and a clear digital experience.**

The emotional flow is:

```text
SEE
  ↓
TRUST
  ↓
UNDERSTAND
  ↓
EXPLORE
  ↓
CONNECT
  ↓
ACT
```

The user should finish the experience thinking:

> **"Badar feels trustworthy. If I or my family need medical care, I know where to go and how to contact them."**
