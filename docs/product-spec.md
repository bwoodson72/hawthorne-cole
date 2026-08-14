# Hawthorne & Cole — Product Specification

**Project type:** Fictional professional-services website / portfolio case study
**Working brand:** Hawthorne & Cole Attorneys at Law
**Location:** Fort Worth, Texas
**Primary stack:** Astro, Tailwind CSS 4, Starwind UI
**Reactive UI:** Svelte only
**Accessibility target:** WCAG 2.2 AA

---

# 1. Product Overview

Hawthorne & Cole is a fictional boutique law firm website created as a portfolio piece for Brian Woodson Web Development.

The project is intended to demonstrate the ability to design and engineer a premium professional-services website where credibility, trust, information architecture, accessibility, local search structure, and lead generation matter more than visual novelty.

The site should feel appropriate for a law firm capable of commanding premium professional fees.

It must not resemble:

* a generic Tailwind template
* a SaaS landing page
* a typical personal-injury law website
* a component-library demo
* another local contractor website
* an animation-heavy creative showcase

The site should instead feel established, restrained, editorial, confident, and highly intentional.

---

# 2. Primary Portfolio Objectives

The finished project must demonstrate:

1. Premium professional-services visual design.
2. A reusable design system based on design tokens.
3. Astro-first architecture.
4. Minimal client-side JavaScript.
5. Svelte islands used only where actual reactive state is required.
6. Accessible reusable UI components.
7. Strong multi-page information architecture.
8. Structured content relationships.
9. Local SEO architecture.
10. Conversion-oriented consultation flow.
11. Responsive design beyond simple breakpoint stacking.
12. Long-form editorial content presentation.
13. Performance-conscious image, font, CSS, and JavaScript handling.
14. A site architecture that could realistically grow with a professional firm.

---

# 3. Product Principles

## 3.1 Static First

Every feature begins as Astro-rendered HTML.

Client-side JavaScript is added only when interaction genuinely requires client-side state or behavior.

A component must not become a Svelte component merely because it contains an interaction.

## 3.2 Svelte for Reactive State

When custom reactive behavior is needed, Svelte is the only application UI framework permitted.

React must not be introduced.

Likely Svelte use:

* consultation wizard
* conditional form fields
* form progress and state
* review-before-submission
* interactive filtering only if later justified

## 3.3 Starwind for UI Infrastructure

Starwind should provide appropriate foundational UI behavior and reusable primitives.

Starwind components must be visually integrated into the Hawthorne & Cole design system rather than used with their default appearance.

Brand values must not be scattered through Starwind component source.

## 3.4 Design Tokens Are Mandatory

Colors, typography, spacing, radii, borders, shadows, layout widths, animation timing, and other visual decisions must originate from the design system.

Individual pages may not invent their own design values.

---

# 4. Design Token Architecture

The site will use three token layers.

## 4.1 Primitive Tokens

Primitive tokens contain raw design values.

Examples:

```css
--hc-ivory-50
--hc-ivory-100
--hc-charcoal-900
--hc-charcoal-950
--hc-oxblood-600
--hc-oxblood-700
--hc-brass-500
```

These values describe what something **is**, not how it is used.

Primitive values should not be referenced directly from page markup.

---

## 4.2 Semantic Tokens

Semantic tokens describe purpose.

Examples:

```css
--background
--foreground

--surface
--surface-foreground
--surface-muted

--primary
--primary-foreground

--accent
--accent-foreground

--muted
--muted-foreground

--border
--input
--outline

--inverse
--inverse-foreground

--danger
--danger-foreground
```

Components consume semantic tokens rather than primitive colors.

Example:

```css
--primary: var(--hc-oxblood-700);
--primary-foreground: var(--hc-ivory-50);
```

The visual identity can therefore be changed centrally without editing components.

---

## 4.3 Component and Pattern Tokens

Component-specific tokens are allowed where a repeated component needs a meaningful design contract.

Examples:

```css
--card-padding
--card-radius
--card-border

--hero-max-width
--hero-spacing

--section-space
--section-space-compact

--content-measure
--prose-measure

--header-height
```

These should remain limited.

A separate component token should not be created for every CSS declaration.

---

# 5. Tailwind Token Integration

Tailwind utilities are an interface to the token system rather than the source of the visual system.

The project should expose semantic tokens through Tailwind's theme system.

Conceptually:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);

  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);

  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);

  --color-border: var(--border);
  --color-outline: var(--outline);
}
```

This allows:

```html
<section class="bg-background text-foreground">
```

instead of:

```html
<section class="bg-stone-50 text-neutral-950">
```

The first expresses intent.

The second hard-codes an implementation detail.

---

# 6. Tailwind Usage Rules

## Allowed

Structural utilities are acceptable:

```text
grid
flex
items-center
justify-between
col-span-*
hidden
block
relative
absolute
overflow-hidden
```

Responsive structural utilities are also acceptable where required.

Semantic utilities are encouraged:

```text
bg-background
bg-primary
bg-surface
text-foreground
text-muted-foreground
border-border
font-display
text-heading-lg
rounded-card
shadow-elevated
```

## Discouraged

Raw Tailwind palette utilities must not appear in application components:

```text
bg-neutral-950
text-stone-600
border-zinc-200
bg-red-700
```

## Prohibited

Arbitrary visual values in markup:

```text
bg-[#681c2d]
text-[17px]
px-[22px]
rounded-[11px]
max-w-[1173px]
shadow-[...]
```

Exceptions require a documented technical reason.

---

# 7. Layout Primitives

Page files should not contain repeated walls of layout classes.

The project will provide reusable layout primitives.

## 7.1 Container

Responsible for:

* maximum site width
* responsive inline gutters
* centering

Usage:

```astro
<Container>
  ...
</Container>
```

## 7.2 Section

Responsible for:

* standard vertical section rhythm
* compact variant
* background context
* optional borders

Example API:

```astro
<Section>
<Section spacing="compact">
<Section tone="muted">
<Section tone="inverse">
```

## 7.3 Stack

Responsible for consistent vertical rhythm between related elements.

Possible variants:

```text
xs
sm
md
lg
xl
```

## 7.4 Cluster

Responsible for horizontal groups that wrap cleanly.

Useful for:

* buttons
* metadata
* badges
* attorney credentials
* article tags

## 7.5 Prose

Responsible for long-form editorial typography.

The Prose system must consume the Hawthorne & Cole typography and spacing tokens rather than creating an independent visual system.

---

# 8. Initial Visual Tokens

The following constitute the initial brand direction and may be adjusted centrally during design exploration.

## 8.1 Color Direction

**Background:** warm ivory
**Foreground:** soft charcoal
**Primary:** deep oxblood
**Accent:** restrained antique brass
**Muted surfaces:** warm gray and ivory
**Inverse sections:** near-black charcoal

The site should avoid pure white and pure black as dominant brand colors.

### Initial primitive palette

```css
:root {
  --hc-ivory-50: oklch(0.985 0.008 82);
  --hc-ivory-100: oklch(0.965 0.013 80);

  --hc-charcoal-700: oklch(0.39 0.014 65);
  --hc-charcoal-900: oklch(0.25 0.012 65);
  --hc-charcoal-950: oklch(0.19 0.010 65);

  --hc-oxblood-600: oklch(0.43 0.105 20);
  --hc-oxblood-700: oklch(0.35 0.09 20);

  --hc-brass-500: oklch(0.63 0.075 76);

  --hc-warm-gray-200: oklch(0.89 0.012 75);
  --hc-warm-gray-400: oklch(0.69 0.012 70);
}
```

These raw values live only in the token layer.

---

# 9. Typography System

## 9.1 Font Roles

### Display and Editorial

**Source Serif 4**

Used for:

* major headlines
* section headlines
* pull quotes
* attorney names
* large editorial typography

### Sans-serif and Interface

**Inter**

Used for:

* body copy
* navigation
* buttons
* labels
* metadata
* forms
* utility text

## 9.2 Typography Tokens

Required semantic scale:

```text
display
heading-1
heading-2
heading-3
heading-4
body-lg
body
body-sm
label
caption
```

Each token defines:

* font size
* line height
* font weight
* optional letter spacing

Fluid sizes should be defined in the token layer with `clamp()` where appropriate.

Components should use:

```text
text-heading-2
```

rather than:

```text
text-4xl lg:text-6xl
```

unless a component has a legitimate responsive exception.

---

# 10. Spacing System

Spacing must have a consistent rhythm.

Required semantic spacing tokens:

```text
space-xs
space-sm
space-md
space-lg
space-xl

section-compact
section-default
section-generous

gutter
card-padding
content-gap
```

Major section spacing should be fluid.

Example:

```css
--section-default: clamp(4.5rem, 8vw, 8rem);
```

This value should be defined once and consumed everywhere.

---

# 11. Layout Tokens

Required:

```text
container-site
container-content
container-prose
container-narrow

gutter
header-height
```

Suggested initial dimensions:

```text
Site: ~80rem
Content: ~64rem
Prose: ~44rem
Narrow: ~36rem
```

These should become named utilities or layout primitive properties.

Pages should never independently choose arbitrary maximum widths.

---

# 12. Borders, Radius, and Elevation

The visual language should remain relatively square and architectural.

Required radius tokens:

```text
radius-sm
radius-control
radius-card
radius-pill
```

Cards should use restrained rounding rather than exaggerated SaaS-style corners.

Elevation should be rare.

Required shadow tokens:

```text
shadow-subtle
shadow-elevated
```

Most separation should come from:

* whitespace
* typography
* background shifts
* thin borders

rather than shadows.

---

# 13. Motion Tokens

Required:

```text
duration-fast
duration-default
duration-slow

ease-standard
ease-emphasized
```

Motion must be restrained.

Permitted examples:

* navigation transitions
* subtle button state transitions
* accordion expansion
* modest image reveal
* understated section entry motion

Avoid:

* large parallax effects
* constant floating objects
* scroll hijacking
* decorative cursor effects
* excessive reveal animations

`prefers-reduced-motion` must be respected.

---

# 14. Design-System Enforcement

A design-system check should be part of development.

The project should flag use of:

* raw Tailwind color palettes
* arbitrary color values
* arbitrary font sizes
* arbitrary border radii
* arbitrary shadows
* arbitrary layout widths

The rule applies particularly to:

```text
src/pages/
src/components/patterns/
src/components/sections/
```

Any necessary exceptions should be documented.

The objective is that changing the Hawthorne & Cole palette, typography, spacing rhythm, or radii should require changing design-system files rather than searching dozens of templates.

---

# 15. Starwind Integration Rules

Starwind will be initialized for Astro.

Starwind source may be customized where necessary.

However:

* brand colors come from semantic tokens
* typography comes from project tokens
* component radii come from project tokens
* focus treatment comes from project tokens
* border treatment comes from project tokens
* application components should not repeatedly override Starwind with long class strings

Starwind should function as UI infrastructure, not as the project's visual identity.

The finished site must not look like default Starwind components.

---

# 16. Brand Personality

The brand should communicate:

**Established**
Not trendy.

**Confident**
Not aggressive.

**Premium**
Not luxurious for luxury's sake.

**Human**
Not bureaucratic.

**Precise**
Not sterile.

**Local**
Without leaning on cliché Texas imagery.

Avoid:

* gavels
* scales of justice as primary graphics
* courthouse columns everywhere
* generic handshake photography
* skyline clichés
* gold-gradient luxury effects
* law-library stock-photo overload

---

# 17. Imagery Direction

Photography should feel editorial and architectural.

Primary categories:

* attorney environmental portraits
* restrained professional portraits
* modern Fort Worth architecture
* office details
* textured materials
* relevant urban context

Photography should use generous crops and large compositions.

Attorney portraits should feel like magazine editorial portraits rather than employee ID photos.

---

# 18. Site Architecture

```text
/
├── about/
├── attorneys/
│   ├── elizabeth-hawthorne/
│   └── daniel-cole/
├── practice-areas/
│   ├── business-litigation/
│   ├── contracts/
│   ├── commercial-real-estate/
│   ├── estate-planning/
│   └── probate/
├── representative-matters/
├── insights/
│   └── [slug]/
├── locations/
│   └── fort-worth/
├── consultation/
└── privacy/
```

---

# 19. Global Header

Desktop header contains:

* Hawthorne & Cole wordmark
* Practice Areas
* Attorneys
* Representative Matters
* Insights
* About
* consultation CTA

Practice Areas may use an accessible dropdown where it improves navigation.

Mobile navigation should use a Starwind Astro component rather than a Svelte island unless custom reactive state is genuinely necessary.

---

# 20. Global Footer

Footer should include:

* firm wordmark
* address
* fictional phone number
* practice-area links
* attorney links
* insight links
* privacy link
* consultation CTA
* concept-project disclosure

Footer styling should use an inverse semantic theme.

---

# 21. Homepage

## Purpose

Establish trust rapidly and direct high-intent visitors toward either a relevant practice area or consultation.

## Sections

### 21.1 Hero

Primary message:

**Counsel for decisions that carry consequences.**

Supporting copy should communicate:

* business counsel
* litigation
* commercial property
* estate matters
* Fort Worth and North Texas

Primary CTA:

**Schedule a Consultation**

Secondary action:

**Explore Practice Areas**

Hero composition should use strong editorial typography rather than cards.

### 21.2 Credibility Strip

Three restrained credibility signals.

Examples:

* 25+ years combined experience
* Fort Worth based
* Business and private-client counsel

Avoid fake awards.

### 21.3 Practice Areas

Present the five major practice areas.

Cards should not all be identical generic rectangles.

The section should function more like an editorial index.

### 21.4 Positioning Statement

Large text section explaining the firm's philosophy:

* complex matters deserve direct counsel
* clients work directly with attorneys
* pragmatic strategy
* clear communication

### 21.5 Attorneys

Two-attorney feature.

Each attorney includes:

* portrait
* name
* title
* focus areas
* short positioning statement
* profile link

### 21.6 Representative Matters

Three example matters.

Avoid sensational dollar claims.

Examples:

* resolved ownership dispute for regional business
* negotiated commercial property acquisition
* developed estate succession strategy for business-owning family

### 21.7 Insights

Three latest articles.

Each includes:

* category
* title
* excerpt
* author
* date

### 21.8 Consultation CTA

Strong closing section with inverse theme.

---

# 22. Practice Areas Index

Purpose:

Allow visitors to identify the service matching their problem.

Each practice area includes:

* name
* concise description
* relevant attorney
* link

The page should also explain when a visitor should contact the firm if they are unsure which practice area applies.

---

# 23. Practice Area Detail Template

Every practice-area page includes:

1. Breadcrumb
2. H1 and positioning statement
3. Problem and context introduction
4. Matters handled
5. Approach and process
6. Relevant attorney or attorneys
7. Frequently asked questions
8. Related insights
9. Consultation CTA

Content length should be sufficient to function as a credible service page rather than thin portfolio filler.

---

# 24. Attorney Index

Use a two-attorney editorial layout.

Each profile teaser includes:

* portrait
* name
* role
* practice focus
* short introduction

---

# 25. Attorney Detail Template

Required fields:

* full name
* professional title
* portrait
* short biography
* long biography
* practice areas
* education
* bar admissions
* professional memberships
* selected matters
* authored insights

Page relationships should be generated from structured content.

For example, Daniel Cole's page automatically displays insights authored by Daniel Cole.

---

# 26. Representative Matters

This replaces the cliché "big verdicts" page.

Matter categories may include:

* Business Litigation
* Contracts
* Commercial Real Estate
* Estate Planning
* Probate

Each matter includes:

* category
* situation
* approach
* outcome

All examples are fictional and must not make misleading claims about real legal work.

---

# 27. Insights Index

The Insights section demonstrates long-form publishing architecture.

Each article card contains:

* title
* summary
* topic
* author
* publication date
* reading time if desired

Filtering is not initially required.

Do not add JavaScript simply to make the page appear more sophisticated.

---

# 28. Insight Article

Article pages contain:

1. Breadcrumb
2. Practice or topic label
3. H1
4. Dek or summary
5. Author
6. Publication date
7. Editorial feature image
8. Article body
9. Author box
10. Related practice area
11. Related articles
12. Consultation CTA

Long-form typography must use the site's Prose token system.

---

# 29. Fort Worth Location Page

Purpose:

Demonstrate local-search architecture without turning the entire project into a contractor-style location-page site.

Content includes:

* Fort Worth positioning
* relevant practice areas
* attorney availability
* office information
* map and location context
* consultation CTA
* locally relevant content

The page must contain real editorial value rather than simply replacing city names in generic copy.

---

# 30. Consultation Page

The consultation page is the primary conversion endpoint.

It contains the project's main Svelte island.

Component:

```text
ConsultationWizard.svelte
```

Hydration should occur only where needed.

---

# 31. Consultation Wizard

## Step 1 — Matter Type

Options:

* Business dispute
* Contract matter
* Commercial real estate
* Estate planning
* Probate
* Something else

## Step 2 — Matter Information

Conditional questions based on Step 1.

Example for a business dispute:

* Is litigation already pending?
* Is another business involved?
* Briefly describe the issue.

Example for estate planning:

* Individual or family planning?
* Business ownership involved?
* Existing estate plan?

## Step 3 — Contact Information

Required:

* name
* email
* phone

Optional:

* preferred contact method
* preferred consultation period

## Step 4 — Review

Display entered information before submission.

Allow editing previous steps.

## Step 5 — Confirmation

Provide a clear success state.

Because this is a portfolio demonstration, the public demo does not need to transmit real legal inquiries.

---

# 32. Form Requirements

The wizard must support:

* keyboard operation
* visible focus states
* accessible error association
* clear labels
* inline validation
* error summary when appropriate
* preserved values when moving backward
* progress indication
* submission loading state
* success state
* failure state

Validation language should explain how to fix a problem rather than merely identify that a field is invalid.

---

# 33. Svelte Rules

Svelte components must not become miniature applications embedded throughout the site.

Svelte is justified when a feature needs:

* reactive state
* conditional UI
* multi-step state
* client-side validation state
* dynamic filtering
* asynchronous user interaction

Svelte is not justified merely for:

* buttons
* links
* static cards
* simple disclosure content
* headings
* ordinary navigation
* static forms
* decorative animation

---

# 34. Content Architecture

Use structured Astro content rather than hard-coding major content into page templates.

Initial collections:

```text
attorneys
practiceAreas
insights
matters
```

---

# 35. Attorney Content Model

```text
name
slug
title
shortBio
bio
portrait
practiceAreas[]
education[]
admissions[]
memberships[]
featured
seo
```

---

# 36. Practice Area Content Model

```text
title
slug
eyebrow
summary
heroCopy
body
services[]
attorneys[]
faqs[]
relatedInsights[]
seo
```

---

# 37. Insight Content Model

```text
title
slug
summary
publishedDate
updatedDate
author
practiceArea
heroImage
body
seo
```

---

# 38. Representative Matter Content Model

```text
title
slug
practiceArea
summary
situation
approach
outcome
featured
```

---

# 39. Content Relationships

Structured relationships should drive cross-linking.

Example:

```text
Attorney
  ↓
Practice Areas
  ↓
Related Insights
  ↓
Representative Matters
```

Practice pages should not maintain duplicate hard-coded lists of related content.

Where possible, relationships should be generated from content metadata.

---

# 40. Component Architecture

## 40.1 UI Layer

Starwind-based reusable UI primitives.

Examples:

* Button
* Accordion
* Breadcrumb
* form controls
* menu and disclosure primitives
* dialogs where necessary

## 40.2 Layout Layer

Project-owned:

* Container
* Section
* Stack
* Cluster
* Prose

## 40.3 Pattern Layer

Project-owned:

* PageHero
* SectionHeading
* PracticeAreaCard
* AttorneyCard
* InsightCard
* MatterCard
* TestimonialQuote
* StatStrip
* ConsultationCTA
* RelatedContent
* AttorneyByline

## 40.4 Section Layer

Project-owned larger sections:

* HomeHero
* PracticeAreaGrid
* AttorneyFeature
* FeaturedMatters
* InsightsPreview
* ConsultationBanner

Pages assemble these components instead of rebuilding their visual logic.

---

# 41. Component Variant Strategy

Variants should be explicit.

Example:

```text
Button
  primary
  secondary
  outline
  text

Section
  default
  muted
  inverse

Card
  standard
  editorial
  featured
```

Do not style individual instances by appending large collections of override classes.

If multiple instances require the same visual treatment, it should become a variant.

---

# 42. Responsive Strategy

Responsive behavior should be component-specific rather than based on the assumption that desktop columns simply stack on mobile.

The design should account for:

* line length
* reading order
* touch targets
* image crops
* navigation ergonomics
* whitespace compression
* heading scale
* form usability
* card hierarchy

Major heading typography should scale fluidly through tokens.

---

# 43. Accessibility

Target WCAG 2.2 Level AA.

Requirements include:

* semantic landmarks
* logical heading hierarchy
* skip-to-content link
* keyboard-accessible navigation
* visible focus indicators
* sufficient color contrast
* explicit form labels
* associated error messages
* descriptive link text
* text alternatives for meaningful images
* reduced-motion support
* no information communicated by color alone
* practical touch target sizing
* predictable focus behavior

Automated accessibility tests should supplement, not replace, keyboard and manual review.

---

# 44. SEO Architecture

Each indexable content template must support:

* unique title
* unique meta description
* canonical URL
* Open Graph metadata
* structured heading hierarchy
* descriptive internal links
* social image
* crawlable navigation

Internal linking should naturally connect:

```text
Practice Area → Attorney
Practice Area → Insights
Attorney → Practice Area
Attorney → Insights
Insight → Author
Insight → Practice Area
Matter → Practice Area
```

---

# 45. Structured Data

The architecture should allow appropriate structured data for:

* organization or legal service
* attorneys
* articles
* breadcrumbs
* FAQs where FAQ content is visibly present

Schema generation should originate from structured content rather than hand-written JSON-LD duplicated across individual pages.

---

# 46. Fictional-Site Safeguards

Because Hawthorne & Cole is fictional, the live demo must not present itself as a functioning law firm.

Include a persistent but unobtrusive disclosure such as:

> Concept website created by Brian Woodson Web Development. Hawthorne & Cole is a fictional firm.

The standalone demo should use `noindex`.

Fictional testimonials, awards, attorney credentials, addresses, phone numbers, verdict amounts, or professional memberships must not be presented in a way that could reasonably be mistaken for real-world claims.

---

# 47. Performance Requirements

The default page must require no Svelte runtime.

Svelte JavaScript should appear only on routes containing Svelte islands.

Other requirements:

* responsive image generation
* explicit image dimensions
* appropriately sized source imagery
* minimal font weights
* local font loading where practical
* no autoplay video
* no background-video hero
* minimal third-party scripts
* lazy loading below-the-fold media
* no dependency added solely for trivial functionality

The architecture should preserve Astro's static-first and island-based performance advantages.

---

# 48. Image Strategy

Images must be:

* correctly sized for their rendered context
* delivered responsively
* cropped intentionally
* provided with dimensions
* lazy-loaded when below the fold

Hero imagery should prioritize visual quality while remaining aggressively optimized.

Portraits should have consistent art direction.

---

# 49. Font Strategy

Only required families and weights should be loaded.

Initial target:

**Source Serif 4**

* Regular
* Medium or Semibold if required

**Inter**

* Regular
* Medium
* Semibold

Avoid loading every available font weight.

---

# 50. Project Structure

Recommended structure:

```text
src/
├── components/
│   ├── starwind/
│   ├── ui/
│   ├── layout/
│   │   ├── Container.astro
│   │   ├── Section.astro
│   │   ├── Stack.astro
│   │   ├── Cluster.astro
│   │   └── Prose.astro
│   ├── patterns/
│   ├── sections/
│   └── svelte/
│       └── ConsultationWizard.svelte
│
├── content/
│   ├── attorneys/
│   ├── practice-areas/
│   ├── insights/
│   └── matters/
│
├── layouts/
│   ├── BaseLayout.astro
│   ├── ContentLayout.astro
│   └── ArticleLayout.astro
│
├── pages/
│
├── styles/
│   ├── tokens.css
│   ├── starwind.css
│   ├── base.css
│   └── global.css
│
└── lib/
    ├── seo/
    ├── schema/
    └── content/
```

---

# 51. Stylesheet Responsibilities

## 51.1 `tokens.css`

Contains:

* primitive design values
* semantic design values
* typography scale
* spacing scale
* radii
* shadows
* motion
* layout dimensions

This is the primary design-system source of truth.

## 51.2 `starwind.css`

Acts as the bridge between the Hawthorne & Cole semantic tokens and Starwind's expected variables.

It should not become a second competing theme.

## 51.3 `base.css`

Contains:

* reset and base rules
* body defaults
* heading defaults where appropriate
* focus baseline
* selection style

## 51.4 `global.css`

Imports the system and contains genuinely global application styles only.

---

# 52. Analytics

The concept demo does not require production marketing analytics.

If analytics are included for portfolio traffic measurement, they must not compromise performance or privacy unnecessarily.

The consultation demo should not collect or store sensitive information.

---

# 53. Security and Privacy

Because this is a portfolio demonstration:

* do not accept confidential legal information
* do not persist form data
* do not create actual attorney-client intake
* do not imply attorney-client privilege
* clearly identify the consultation form as a demonstration if it is publicly usable

---

# 54. Error States

Design states are required for:

* 404
* form validation errors
* form submission failure
* empty content lists where applicable
* unavailable images

Error states must use the same token and component system as successful states.

---

# 55. 404 Page

The 404 page should remain on-brand and restrained.

It should include:

* clear explanation
* homepage link
* practice-areas link
* consultation link

No novelty animation is required.

---

# 56. Portfolio Case Study

The project page on `brianwoodson.dev/work` should explain the business and technical reasoning behind the build.

## Challenge

Design a website capable of establishing credibility for a premium professional-services firm while organizing several distinct service lines.

## Strategy

Use editorial design, structured content, clear practice-area architecture, attorney expertise, and a guided consultation funnel.

## Design System

Explain the primitive → semantic → component token architecture.

This is a major portfolio selling point.

## Architecture

Explain:

* Astro static-first rendering
* Starwind UI primitives
* Tailwind token integration
* Svelte island for consultation state
* structured content relationships

## Conversion

Explain how the consultation journey reduces friction and gathers useful qualification information.

## SEO

Explain interconnected practice-area, attorney, insight, and local content architecture.

## Performance

Explain why JavaScript is only delivered when needed.

---

# 57. Definition of Done — Design System

* [ ] Raw brand colors exist only in token files.
* [ ] Components consume semantic colors.
* [ ] No application page uses Tailwind default color names for brand styling.
* [ ] Typography is controlled through named tokens.
* [ ] Major spacing is controlled through named tokens.
* [ ] Container widths are tokenized.
* [ ] Border radii are tokenized.
* [ ] Shadows are tokenized.
* [ ] Motion timing is tokenized.
* [ ] Starwind components consume the project theme.
* [ ] Repeated class compositions have been extracted into components or variants.
* [ ] Arbitrary Tailwind values have been removed unless technically justified.

---

# 58. Definition of Done — Architecture

* [ ] Astro owns the page architecture.
* [ ] React is absent.
* [ ] Svelte is used only where state justifies hydration.
* [ ] ConsultationWizard is isolated as a Svelte island.
* [ ] Non-reactive pages do not ship the Svelte runtime.
* [ ] Major content is structured rather than duplicated in templates.
* [ ] Content relationships generate relevant cross-links.
* [ ] Starwind is initialized for Astro.
* [ ] Pages assemble reusable sections and patterns.

---

# 59. Definition of Done — UX

* [ ] Navigation is usable by keyboard and pointer.
* [ ] Mobile navigation is fully accessible.
* [ ] Practice areas are easy to discover.
* [ ] Attorney expertise is connected to relevant services.
* [ ] Consultation CTA remains clear throughout the site.
* [ ] Consultation wizard preserves entered state between steps.
* [ ] Form errors clearly explain correction.
* [ ] Long-form articles remain comfortable to read.
* [ ] Mobile layout retains hierarchy rather than merely stacking desktop elements.

---

# 60. Definition of Done — Quality

* [ ] WCAG 2.2 AA requirements have been manually reviewed.
* [ ] Keyboard-only navigation has been tested.
* [ ] Reduced-motion behavior has been tested.
* [ ] Images have responsive sizing and explicit dimensions.
* [ ] No unnecessary framework JavaScript is shipped.
* [ ] No unnecessary third-party dependencies remain.
* [ ] Metadata is unique by page.
* [ ] Internal links connect related content types.
* [ ] Structured data is generated from source content.
* [ ] The standalone fictional demo is marked `noindex`.
* [ ] Fictional-business disclosure is visible.
* [ ] The final site does not visually resemble stock Starwind components.

---

# 61. Core Architectural Rule

The implementation should follow this hierarchy:

```text
DESIGN TOKENS
      ↓
TAILWIND THEME
      ↓
STARWIND / PROJECT UI PRIMITIVES
      ↓
PROJECT COMPONENT VARIANTS
      ↓
SECTIONS
      ↓
PAGES
```

Pages are consumers of the design system.

They are not where the design system is created.

A request such as:

> Make the entire brand less warm, slightly tighter, and less rounded.

should primarily involve changing token and component definitions, not hunting through dozens of Astro files for values such as:

```text
bg-stone-50
py-24
rounded-xl
text-5xl
```
# 62. Website Content Specification

The following content is the source of truth for the initial Hawthorne & Cole website.

Codex must not replace this content with generic placeholder copy.

Minor punctuation or formatting changes are acceptable when required by a component, but substantive copy changes should not be made unless explicitly requested.

All people, matters, credentials, addresses, and firm history described below are fictional and exist only for this portfolio project.

---

# 63. Global Brand Content

## Firm Name

**Hawthorne & Cole**

## Formal Name

**Hawthorne & Cole Attorneys at Law**

## Primary Positioning Statement

**Counsel for decisions that carry consequences.**

## Supporting Positioning

Hawthorne & Cole advises businesses, property owners, and families facing decisions where the legal, financial, and personal stakes demand careful judgment.

## Primary CTA

**Schedule a Consultation**

## Secondary CTA

**Explore Practice Areas**

## Location

Fort Worth, Texas

## Service Area

Fort Worth and North Texas

## Fictional Address

Hawthorne & Cole Attorneys at Law
500 West 7th Street
Suite 1800
Fort Worth, Texas 76102

## Fictional Phone

**(817) 555-0148**

## Fictional Email

**[contact@hawthornecole.example](mailto:contact@hawthornecole.example)**

The `.example` domain must be retained because the firm is fictional.

---

# 64. Global Navigation

Primary navigation:

* Practice Areas
* Attorneys
* Representative Matters
* Insights
* About
* Schedule a Consultation

Practice Areas dropdown:

* Business Litigation
* Contract Disputes
* Commercial Real Estate
* Estate Planning
* Probate

---

# 65. Homepage Content

Route:

`/`

SEO title:

**Hawthorne & Cole | Business, Real Estate & Estate Counsel in Fort Worth**

Meta description:

**Hawthorne & Cole is a fictional Fort Worth law firm providing business litigation, contract, commercial real estate, estate planning, and probate counsel.**

---

## 65.1 Homepage Hero

Eyebrow:

**Fort Worth, Texas**

H1:

# Counsel for decisions that carry consequences.

Body:

Business disputes, property transactions, contracts, and estate matters rarely stay confined to a single document or decision. They affect companies, assets, families, and what happens next.

Hawthorne & Cole provides deliberate legal counsel for clients who need to understand the risks, protect what matters, and move forward with a clear strategy.

Primary CTA:

**Schedule a Consultation**

Secondary CTA:

**Explore Practice Areas**

Supporting line:

**Business litigation · Contracts · Commercial real estate · Estate planning · Probate**

---

## 65.2 Credibility Strip

Item 1:

**25+ Years**
Combined legal experience

Item 2:

**Fort Worth Based**
Serving clients across North Texas

Item 3:

**Direct Counsel**
Work directly with the attorney handling your matter

Because this is a fictional portfolio project, these statements must be clearly covered by the site's concept-project disclosure.

---

## 65.3 Practice Areas Introduction

Eyebrow:

**Practice Areas**

Heading:

# Legal counsel built around the decision in front of you.

Body:

Some matters begin with a dispute. Others begin with an opportunity, a transaction, or the need to plan ahead. Our work is organized around five areas where sound legal advice can protect a client's position before small uncertainties become expensive problems.

---

## 65.4 Business Litigation Card

Title:

**Business Litigation**

Body:

Disputes between owners, companies, customers, vendors, and competitors can threaten more than a single transaction. We help businesses evaluate their options, contain risk, and pursue practical resolutions when litigation becomes necessary.

Link:

**Explore Business Litigation**

---

## 65.5 Contract Disputes Card

Title:

**Contract Disputes**

Body:

When the meaning, performance, or enforcement of an agreement is contested, the real question is often what the dispute could cost if it is allowed to continue. We help clients understand their position and choose the next move deliberately.

Link:

**Explore Contract Disputes**

---

## 65.6 Commercial Real Estate Card

Title:

**Commercial Real Estate**

Body:

From acquisition and leasing to ownership disputes and transaction risk, commercial property decisions can carry long-term consequences. We provide counsel designed to surface those risks before they become surprises.

Link:

**Explore Commercial Real Estate**

---

## 65.7 Estate Planning Card

Title:

**Estate Planning**

Body:

A strong estate plan does more than distribute property. It gives families and business owners a framework for incapacity, succession, ownership, and the transfer of responsibility.

Link:

**Explore Estate Planning**

---

## 65.8 Probate Card

Title:

**Probate**

Body:

The administration of an estate can become difficult when legal obligations, family expectations, property, and business interests intersect. We help executors and families understand the process and address disputes when they arise.

Link:

**Explore Probate**

---

# 66. Homepage Philosophy Section

Eyebrow:

**Our Approach**

Heading:

# Good counsel should make the path forward clearer.

Body paragraph 1:

The law may define the available options, but it does not decide which option makes the most sense for a particular client. That requires understanding the business, property, family, and long-term consequences surrounding the legal issue.

Body paragraph 2:

Our role is to identify the risks that matter, explain them plainly, and help clients make decisions with a realistic understanding of what comes next.

Body paragraph 3:

That means avoiding unnecessary conflict when a practical resolution is available—and preparing thoroughly when the situation requires a firmer response.

Pull quote:

> The objective is not simply to win an argument. It is to put the client in the strongest practical position available.

---

# 67. Homepage Attorneys Section

Eyebrow:

**Attorneys**

Heading:

# Experienced counsel without unnecessary layers.

Intro:

Clients work directly with the attorneys responsible for understanding their matter, developing the strategy, and communicating what happens next.

---

## Elizabeth Hawthorne Homepage Profile

Name:

**Elizabeth Hawthorne**

Title:

**Founding Partner**

Focus areas:

Business Litigation · Contract Disputes · Probate Disputes

Short bio:

Elizabeth Hawthorne represents businesses, owners, and families in disputes where financial interests and long-term relationships are often intertwined. Her practice focuses on identifying the leverage, risk, and practical considerations that shape a dispute before deciding how aggressively it should be pursued.

CTA:

**Meet Elizabeth**

---

## Daniel Cole Homepage Profile

Name:

**Daniel Cole**

Title:

**Founding Partner**

Focus areas:

Commercial Real Estate · Estate Planning · Business Succession

Short bio:

Daniel Cole advises property owners, closely held businesses, and families on transactions and planning decisions intended to prevent future conflict. His work centers on creating clear structures before uncertainty has the opportunity to become a dispute.

CTA:

**Meet Daniel**

---

# 68. Homepage Representative Matters Section

Eyebrow:

**Representative Matters**

Heading:

# Strategy measured by the client's real objective.

Intro:

Legal matters are rarely successful simply because a document was drafted or an argument was won. These fictional examples illustrate the kinds of business and personal objectives the firm is designed to address.

---

## Matter 1

Category:

**Business Litigation**

Title:

**Ownership dispute threatening the future of a regional service company**

Summary:

Two equal owners reached an impasse over compensation, management authority, and the future of a profitable company they had built together.

Outcome preview:

A negotiated separation allowed one owner to acquire the other's interest while the business continued operating without interruption.

---

## Matter 2

Category:

**Commercial Real Estate**

Title:

**Acquisition of an occupied commercial property with unresolved lease issues**

Summary:

A purchaser discovered inconsistencies between tenant agreements, operating expenses, and representations made during negotiations.

Outcome preview:

The transaction was restructured before closing to allocate the identified risks and address the disputed lease obligations.

---

## Matter 3

Category:

**Estate Planning**

Title:

**Succession planning for a family-owned business**

Summary:

A business owner wanted to transfer control gradually to the next generation without creating unequal economic consequences for children who were not involved in the company.

Outcome preview:

The resulting plan separated management succession from broader estate distribution and established a framework for ownership transfer over time.

CTA:

**View Representative Matters**

---

# 69. Homepage Insights Section

Eyebrow:

**Insights**

Heading:

# Perspective before the decision.

Intro:

Practical guidance on disputes, contracts, property, succession, and estate matters affecting businesses and families in Texas.

Featured initial articles:

1. **What a Business Owner Should Do When a Partnership Dispute Begins**
2. **Five Issues to Review Before Signing a Commercial Lease**
3. **Estate Planning for Business Owners Is Also Business Planning**

CTA:

**View All Insights**

---

# 70. Homepage Closing CTA

Heading:

# A difficult decision is easier when you understand the consequences.

Body:

If you are facing a business dispute, planning a significant transaction, or trying to protect what happens next, the first step is understanding the legal and practical options available.

CTA:

**Schedule a Consultation**

Secondary text:

Or call **(817) 555-0148**

---

# 71. About Page

Route:

`/about`

SEO title:

**About Hawthorne & Cole | Fort Worth Attorneys**

Meta description:

**Learn about the fictional Hawthorne & Cole law firm and its approach to business, real estate, estate planning, litigation, and probate matters.**

Eyebrow:

**About the Firm**

H1:

# Deliberate counsel for complicated decisions.

Intro:

Hawthorne & Cole was founded around a simple idea: clients should understand not only what the law allows, but what each available course of action is likely to mean for their business, property, family, and future.

---

## 71.1 About Section — Why the Firm Exists

Heading:

## Legal problems rarely exist in isolation.

Body:

A contract dispute may affect a customer relationship that took years to build. A real estate transaction may shape a company's finances for the next decade. An estate plan may determine whether a family business survives a generational transition.

Those consequences are why the firm begins with context.

Before recommending a course of action, we work to understand what the client is trying to preserve, change, avoid, or accomplish. The legal strategy follows from that objective.

---

## 71.2 About Section — How We Work

Heading:

## Clear advice. Direct communication. Practical strategy.

Body:

Clients should not need to translate their attorney's advice before they can use it.

We explain the legal position plainly, identify the meaningful risks, and distinguish between what is possible and what is sensible.

When negotiation offers a better outcome than litigation, we say so. When a client's position needs to be defended decisively, we prepare accordingly.

---

## 71.3 Values

### Clarity

Legal complexity should not become communication complexity.

### Judgment

Knowing the available legal options is only the beginning. Good counsel requires knowing which option serves the client's real objective.

### Preparation

Leverage comes from understanding the facts, the documents, the law, and the other side's likely incentives before a decision has to be made.

### Restraint

Not every disagreement should become a lawsuit, and not every transaction needs unnecessary complexity.

### Accountability

The attorney responsible for the matter should remain accessible to the client.

---

## 71.4 About Closing

Heading:

## Built for clients who want to understand what comes next.

Body:

Hawthorne & Cole represents businesses, property owners, executors, and families throughout Fort Worth and North Texas.

CTA:

**Meet Our Attorneys**

Secondary CTA:

**Schedule a Consultation**

---

# 72. Attorneys Index

Route:

`/attorneys`

Eyebrow:

**Attorneys**

H1:

# Counsel grounded in judgment, not volume.

Intro:

Hawthorne & Cole is intentionally structured as a small firm. Clients work directly with experienced attorneys rather than being passed through layers of staff before reaching the person responsible for the matter.

---

# 73. Elizabeth Hawthorne Profile

Route:

`/attorneys/elizabeth-hawthorne`

SEO title:

**Elizabeth Hawthorne | Business Litigation Attorney | Hawthorne & Cole**

Eyebrow:

**Founding Partner**

H1:

# Elizabeth Hawthorne

Intro:

Elizabeth Hawthorne represents business owners, companies, executors, and families in disputes involving contracts, ownership, fiduciary duties, and estate administration.

---

## Biography

Elizabeth's practice is built around disputes in which the legal issue is only one part of the problem.

A disagreement between business owners, for example, may involve control of the company, access to financial information, personal guarantees, customer relationships, and the possibility that years of shared work are coming to an end. An estate dispute may involve legal duties as well as decades of family history.

Her approach begins by separating those issues.

Elizabeth works with clients to identify what must be protected, where meaningful leverage exists, what the opposing side is likely to value, and whether the client's objective can be reached without allowing the dispute to consume the underlying business or estate.

When litigation becomes necessary, she focuses on building the case around the facts that matter rather than multiplying conflict for its own sake.

---

## Practice Areas

* Business Litigation
* Contract Disputes
* Probate Disputes

---

## Education — Fictional

**Texas Tech University School of Law**
Juris Doctor

**Texas Christian University**
Bachelor of Business Administration

---

## Admissions — Fictional

* State Bar of Texas
* U.S. District Court for the Northern District of Texas

---

## Professional Philosophy

Quote:

> A client should know what we are trying to accomplish, why we are taking a particular step, and what could happen next.

---

## Related Insights

* What a Business Owner Should Do When a Partnership Dispute Begins
* When a Contract Dispute Becomes a Business Problem
* Why Winning a Lawsuit Is Not Always the Same as Getting a Good Business Result

CTA:

**Discuss Your Matter with Elizabeth**

---

# 74. Daniel Cole Profile

Route:

`/attorneys/daniel-cole`

SEO title:

**Daniel Cole | Real Estate & Estate Planning Attorney | Hawthorne & Cole**

Eyebrow:

**Founding Partner**

H1:

# Daniel Cole

Intro:

Daniel Cole advises closely held businesses, property owners, and families on commercial real estate, estate planning, succession, and transactions designed to reduce future uncertainty.

---

## Biography

Daniel's practice focuses primarily on decisions made before a dispute exists.

Commercial leases, property acquisitions, ownership structures, estate plans, and business succession arrangements often appear straightforward when everyone involved agrees. Their weaknesses become visible later—when circumstances change, relationships deteriorate, or an unexpected event forces the documents to answer a question nobody considered.

Daniel's work is intended to identify those questions earlier.

He helps clients evaluate how agreements operate under less-than-ideal circumstances, including the death of an owner, a failed business relationship, a tenant default, an unexpected transfer of property, or a disagreement among family members.

The objective is not to make every document longer. It is to make the important decisions clearer.

---

## Practice Areas

* Commercial Real Estate
* Estate Planning
* Business Succession
* Probate

---

## Education — Fictional

**Baylor University School of Law**
Juris Doctor

**University of Texas at Arlington**
Bachelor of Arts

---

## Admissions — Fictional

* State Bar of Texas

---

## Professional Philosophy

Quote:

> The best time to solve many legal problems is before they have become legal problems.

---

## Related Insights

* Five Issues to Review Before Signing a Commercial Lease
* Estate Planning for Business Owners Is Also Business Planning
* What Happens to a Business When One Owner Dies?

CTA:

**Discuss Your Plans with Daniel**

---

# 75. Practice Areas Index Content

Route:

`/practice-areas`

Eyebrow:

**Practice Areas**

H1:

# Counsel for the decisions businesses and families cannot afford to treat casually.

Intro:

Hawthorne & Cole focuses on a defined group of matters where legal decisions frequently intersect with ownership, property, money, and long-term relationships.

Each practice area is connected to the others by the same objective: helping the client understand risk before choosing what happens next.

Closing text:

Not every legal problem fits neatly into a category. If you are unsure which practice area applies, describe the situation during the consultation request and the firm can determine whether the matter falls within its scope.

CTA:

**Schedule a Consultation**

---

# 76. Business Litigation Page

Route:

`/practice-areas/business-litigation`

SEO title:

**Business Litigation Attorneys in Fort Worth | Hawthorne & Cole**

Meta description:

**Fictional Fort Worth business litigation counsel for ownership disputes, fiduciary claims, commercial conflicts, and other serious business disputes.**

Eyebrow:

**Business Litigation**

H1:

# When a business dispute threatens more than the issue on paper.

Intro:

A serious business dispute can affect ownership, cash flow, customer relationships, management authority, reputation, and whether the company can continue operating normally.

The first question is not always whether you can sue.

The more useful question is what outcome protects the business and your position most effectively.

---

## Matters We Handle

* disputes between business owners
* partnership and shareholder disputes
* breach of fiduciary duty claims
* commercial payment disputes
* vendor and customer conflicts
* business purchase disputes
* non-performance under commercial agreements
* injunction and emergency relief matters
* disputes involving access to company records
* business separations and negotiated buyouts

---

## Our Approach

Heading:

## Understand the leverage before escalating the conflict.

Body:

Litigation can create leverage, but it also creates cost, delay, distraction, and uncertainty.

Before recommending a lawsuit, we evaluate the client's legal position alongside the practical realities of the dispute.

That includes:

* what the client actually wants
* what the other side is likely to want
* what business relationships are at risk
* which facts can be documented
* what contractual rights exist
* whether urgent relief is necessary
* what a realistic settlement could look like
* what litigation is likely to require if negotiation fails

The objective is to make escalation a strategy rather than a reflex.

---

## Related Attorney

**Elizabeth Hawthorne — Founding Partner**

Elizabeth represents companies and owners in commercial and ownership disputes throughout North Texas.

CTA:

**Meet Elizabeth Hawthorne**

---

## Business Litigation FAQs

### Should I send a demand letter before filing a lawsuit?

Sometimes, but not automatically. A demand can create an opportunity to resolve the matter, establish a record, or clarify the other party's position. In other situations it may give the opposing side time to move assets, alter its strategy, or prepare for litigation. The circumstances should determine the sequence.

### What should I do when a dispute with my business partner begins?

Preserve records, understand the company's governing documents, avoid impulsive communications, and determine what authority each owner actually has. Early decisions can materially affect later leverage.

### Does every business dispute need to go to court?

No. Many disputes are resolved through negotiation, mediation, restructuring, or a business separation. Litigation is one tool among several.

### Can a business dispute be resolved while a lawsuit is pending?

Yes. Litigation and settlement discussions frequently proceed at the same time.

---

## Closing CTA

Heading:

# A business dispute becomes more expensive when the strategy comes too late.

Body:

If a conflict is beginning to affect ownership, operations, money, or important business relationships, early legal analysis can clarify the available options.

CTA:

**Schedule a Consultation**

---

# 77. Contract Disputes Page

Route:

`/practice-areas/contracts`

Eyebrow:

**Contract Disputes**

H1:

# The language of the agreement matters. So does what happens if the dispute continues.

Intro:

Contract disputes often begin with a narrow disagreement: whether work was performed, payment was due, a deadline was met, or a promise meant what one party says it meant.

But the consequences can extend far beyond the disputed clause.

Hawthorne & Cole helps businesses evaluate both the legal interpretation of an agreement and the commercial consequences of enforcing, renegotiating, or ending it.

---

## Matters We Handle

* breach of contract
* payment disputes
* service agreements
* purchase agreements
* vendor agreements
* commercial lease disputes
* contract termination
* indemnification disputes
* warranty disputes
* ambiguous contract terms
* settlement agreements

---

## Approach

Heading:

## Start with the agreement. Then look beyond it.

Body:

A strong contract analysis asks more than whether a breach occurred.

It should also consider:

* available remedies
* notice requirements
* termination rights
* limitation-of-liability provisions
* attorney-fee provisions
* dispute-resolution clauses
* continuing business obligations
* evidence of performance
* practical collectability
* the value of preserving the relationship

That broader analysis helps determine whether the best response is enforcement, negotiation, termination, or litigation.

---

## FAQs

### Does a contract have to be signed to be enforceable?

Not always. Depending on the circumstances and the type of agreement, obligations may arise from written documents, electronic communications, conduct, or other evidence. Some agreements, however, are subject to specific writing requirements.

### What if both sides interpret the contract differently?

The wording of the agreement is the starting point, but context, defined terms, related documents, performance, and applicable law may all matter.

### Can I terminate a contract because the other side breached it?

Possibly, but termination rights depend on the agreement and the nature of the breach. Terminating improperly can create a new dispute, so the contract should be reviewed before action is taken.

---

# 78. Commercial Real Estate Page

Route:

`/practice-areas/commercial-real-estate`

Eyebrow:

**Commercial Real Estate**

H1:

# Property decisions measured in years deserve more than a quick document review.

Intro:

Commercial real estate transactions create obligations that may continue long after closing or lease execution.

The cost of overlooking a provision today may not become visible until rent changes, a tenant defaults, improvements are needed, the property is sold, or the relationship between the parties changes.

Hawthorne & Cole helps clients identify those risks while there is still an opportunity to negotiate them.

---

## Services

* commercial property acquisition
* commercial property sale
* lease review and negotiation
* landlord representation
* tenant representation
* due diligence
* easement and access issues
* ownership structuring
* property-related contract disputes
* commercial lease disputes

---

## Approach

Heading:

## Review the transaction as it will operate, not only as it looks at signing.

Body:

Documents should be evaluated against realistic future scenarios.

For a lease, that may include:

* who pays for repairs
* how common expenses are calculated
* what happens if the premises cannot be used
* assignment and subleasing
* renewal options
* personal guarantees
* default remedies
* improvements and restoration
* insurance obligations
* exit rights

For an acquisition, the analysis may extend to title, leases, access, existing obligations, entity structure, and the intended use of the property.

---

## FAQs

### When should an attorney review a commercial lease?

Before the lease is signed and preferably before the major business terms become effectively fixed. Legal review is more valuable while terms can still be negotiated.

### Is a commercial lease negotiable?

Usually. The degree of leverage varies, but commercial leases are generally negotiated agreements rather than standardized consumer contracts.

### Do I need a separate entity to own commercial property?

Often that is worth considering, but the appropriate structure depends on liability, financing, ownership, tax, and business considerations.

---

# 79. Estate Planning Page

Route:

`/practice-areas/estate-planning`

Eyebrow:

**Estate Planning**

H1:

# Estate planning is about control before it is about inheritance.

Intro:

A useful estate plan answers more than who receives property after death.

It should also address who can act during incapacity, how assets are managed, how business interests are handled, and how avoidable uncertainty can be reduced for the people left to carry out the plan.

---

## Estate Planning Services

* wills
* revocable trusts
* powers of attorney
* medical directives
* beneficiary planning
* business succession coordination
* ownership-transfer planning
* planning for blended families
* probate-avoidance strategies
* periodic estate-plan reviews

---

## For Business Owners

Heading:

## Your estate plan and your business plan cannot always be separated.

Body:

For a business owner, death or incapacity can create immediate questions:

* Who has authority to operate the company?
* What happens to the ownership interest?
* Can surviving owners purchase the interest?
* Where will the money come from?
* Should family members inherit control or economic value?
* Are personal guarantees still outstanding?
* Does the estate plan conflict with company agreements?

These issues should be coordinated before circumstances force others to answer them.

---

## FAQs

### How often should an estate plan be reviewed?

A review is appropriate after significant changes involving marriage, divorce, children, property, business ownership, relocation, major financial changes, or changes in the people named to serve in important roles.

### Do I need a trust?

Not everyone does. A trust may be useful depending on property ownership, privacy goals, incapacity planning, family circumstances, and the desired method of transferring assets.

### What happens to my business interest when I die?

That depends on the company's governing documents, ownership structure, estate plan, and any buy-sell arrangements. Those documents should be coordinated.

---

# 80. Probate Page

Route:

`/practice-areas/probate`

Eyebrow:

**Probate**

H1:

# Administering an estate is easier when responsibilities are clear.

Intro:

An executor may be dealing with property, creditors, beneficiaries, taxes, business interests, family expectations, and court requirements at the same time.

Hawthorne & Cole helps executors and families understand what must be done, what can wait, and where potential conflicts require closer attention.

---

## Probate Services

* probate administration
* executor guidance
* estate asset issues
* creditor matters
* property transfers
* business interests held by an estate
* beneficiary disputes
* will contests
* fiduciary-duty disputes
* negotiated estate resolutions

---

## Probate Disputes

Heading:

## Family conflict can turn administration into litigation.

Body:

Disputes may arise over the validity of a will, the conduct of an executor, asset ownership, distributions, beneficiary rights, or the handling of a family business.

When that happens, the legal strategy should account for both the disputed rights and the practical consequences of prolonged conflict.

---

## FAQs

### How long does probate take?

There is no single timeline. The complexity of the estate, creditor issues, property, disputes, and court requirements all affect the process.

### What does an executor actually do?

An executor generally gathers and protects estate property, addresses valid obligations, handles required filings, and distributes assets according to the governing documents and applicable law.

### Can an executor be challenged?

Yes. Executors owe legal duties in administering the estate and disputes can arise when beneficiaries believe those duties have not been fulfilled.

---

# 81. Representative Matters Index

Route:

`/representative-matters`

Eyebrow:

**Representative Matters**

H1:

# The legal strategy should serve the real objective.

Intro:

The following fictional matters demonstrate how Hawthorne & Cole approaches disputes, transactions, and planning problems.

They do not describe real clients, real outcomes, or actual legal engagements.

---

# 82. Representative Matter — Ownership Dispute

Category:

**Business Litigation**

Title:

# Preserving a viable company during an ownership dispute

Situation:

Two equal owners of a regional service company had reached a point where they could no longer agree on compensation, hiring authority, distributions, or the long-term direction of the business.

Both remained essential to operations, but continued deadlock was affecting employees and delaying important business decisions.

Approach:

Rather than treating the dispute only as a lawsuit between owners, the strategy focused on the value of the operating company and the consequences of allowing the conflict to continue.

Financial records, governing documents, ownership rights, and potential claims were evaluated alongside possible separation structures.

Outcome:

The parties negotiated a structured buyout allowing one owner to acquire the other's interest over time.

The company continued operating throughout the transition and avoided a forced shutdown.

Disclosure:

**Fictional portfolio example.**

---

# 83. Representative Matter — Commercial Acquisition

Category:

**Commercial Real Estate**

Title:

# Restructuring a property acquisition after lease inconsistencies surfaced

Situation:

A business intended to acquire a multi-tenant commercial property as both an operating location and long-term investment.

During review, several tenant agreements contained inconsistent provisions relating to maintenance expenses, renewal rights, and landlord obligations.

Approach:

The purchase documents, tenant agreements, and projected operating assumptions were reviewed together.

The identified lease issues were quantified and addressed during negotiation rather than treated as matters to resolve after closing.

Outcome:

The acquisition proceeded under revised terms that allocated responsibility for identified lease risks and adjusted the economics of the transaction.

Disclosure:

**Fictional portfolio example.**

---

# 84. Representative Matter — Business Succession

Category:

**Estate Planning**

Title:

# Separating management succession from family inheritance

Situation:

A business owner had three adult children, but only one worked in the company.

The owner wanted that child eventually to control the business while still treating the other children fairly through the broader estate plan.

Approach:

Business succession and inheritance were treated as related but distinct questions.

The planning structure separated future management control from the allocation of other estate assets and established a phased ownership-transition framework.

Outcome:

The resulting plan created a defined path for management succession while reducing the likelihood that siblings uninvolved in the company would unexpectedly become operating co-owners.

Disclosure:

**Fictional portfolio example.**

---

# 85. Insights Index

Route:

`/insights`

Eyebrow:

**Insights**

H1:

# Practical perspective for decisions that should not be made blindly.

Intro:

Articles from Hawthorne & Cole examine recurring legal issues affecting Texas businesses, property owners, and families.

Initial categories:

* Business Disputes
* Contracts
* Commercial Real Estate
* Estate Planning
* Probate

---

# 86. Initial Insight Article 1

Slug:

`what-to-do-when-business-partnership-dispute-begins`

Category:

**Business Disputes**

Author:

**Elizabeth Hawthorne**

Title:

# What a Business Owner Should Do When a Partnership Dispute Begins

Dek:

The earliest decisions in an ownership dispute can determine how much leverage each side has later.

Body:

Business-owner disputes rarely begin with a lawsuit.

They usually begin with smaller signs: information stops being shared, compensation becomes a source of tension, one owner begins making decisions without the other, distributions change, or conversations about the future of the company become increasingly difficult.

At that stage, the instinct may be to confront the other owner immediately.

That is not always the best first move.

## Preserve the information you are already entitled to access

Financial statements, governing documents, tax records, contracts, ownership records, and important communications may become central to understanding the dispute.

Do not destroy, alter, or improperly obtain information. But do make sure legitimate business records are being preserved.

## Read the governing documents before assuming what your rights are

Ownership percentage does not necessarily answer every question about authority.

Operating agreements, shareholder agreements, bylaws, buy-sell provisions, and other documents may define voting rights, transfer restrictions, management authority, and procedures for resolving deadlock.

## Separate the emotional problem from the business problem

Owner disputes are personal because the people involved often built the company together.

But decisions driven primarily by anger can damage the very asset both sides are fighting over.

Ask what outcome actually matters.

Do you want control? A buyout? Access to information? A change in management? Payment of money? A clean exit?

The legal strategy should serve that objective.

## Be careful about creating a new problem while responding to the first one

Locking another owner out of accounts, moving money, contacting customers, terminating employees, or sending accusations in writing can have consequences of their own.

Before taking a dramatic step, understand whether you actually have the authority to take it.

## Determine whether the business can survive the dispute

Some ownership disputes can continue for months while the company operates normally.

Others immediately threaten payroll, customer relationships, licensing, financing, or day-to-day management.

The urgency of the legal response should reflect the operational risk.

## The first objective is clarity

You do not need to know on day one whether the dispute will settle or become litigation.

You do need to understand your rights, your risks, and the decisions that could weaken your position before the real negotiation begins.

Closing CTA:

**Facing an ownership dispute? Schedule a consultation.**

---

# 87. Initial Insight Article 2

Slug:

`five-issues-before-signing-commercial-lease`

Category:

**Commercial Real Estate**

Author:

**Daniel Cole**

Title:

# Five Issues to Review Before Signing a Commercial Lease

Dek:

The rent may be the most visible number in a commercial lease, but it is rarely the only number that matters.

Body:

A commercial lease can shape a business's costs and flexibility for years.

Before signing, a tenant should understand not only the base rent but how the agreement behaves when something changes.

## 1. Additional operating expenses

Many leases require tenants to pay some portion of taxes, insurance, common-area expenses, maintenance, or other property costs.

The lease should make clear which costs can be passed through and how they are calculated.

## 2. Repair obligations

The distinction between landlord and tenant responsibilities can become expensive when HVAC systems, plumbing, roofs, structural elements, or other major components need work.

A tenant should know where those obligations fall before the failure occurs.

## 3. Personal guarantees

A business entity may sign the lease while the owner is also asked to guarantee the obligation personally.

That can materially change the financial risk of the agreement.

## 4. Assignment and subleasing

A business may later be sold, reorganized, expanded, or relocated.

Restrictions on transferring the lease can affect those future options.

## 5. What happens when things go wrong

Default provisions deserve as much attention as the provisions describing normal performance.

Notice periods, cure rights, late charges, acceleration clauses, landlord remedies, and termination rights determine how much room exists to solve a problem after one occurs.

## The lease should be evaluated as a long-term business obligation

The best time to resolve uncertainty is before the space has been built out, employees have moved in, and the business has become dependent on the location.

Closing CTA:

**Planning a commercial lease or acquisition? Schedule a consultation.**

---

# 88. Initial Insight Article 3

Slug:

`estate-planning-for-business-owners`

Category:

**Estate Planning**

Author:

**Daniel Cole**

Title:

# Estate Planning for Business Owners Is Also Business Planning

Dek:

A will cannot answer every question that arises when a business owner dies or becomes unable to manage the company.

Body:

Business owners frequently think of estate planning and business planning as separate exercises.

They are not always separate.

If a significant portion of a family's wealth, income, or responsibilities is tied to a privately owned company, incapacity or death can create immediate business questions.

## Who can make decisions?

Ownership and management are different concepts.

A family member may inherit an economic interest without having the authority, experience, or desire to run the company.

The governing documents and succession plan should identify who can make operational decisions.

## What happens to the ownership interest?

An ownership interest might pass to a spouse, children, trust, surviving owners, or another buyer depending on the relevant agreements and estate plan.

Those documents should not contradict each other.

## Can the business fund a buyout?

A buy-sell agreement is only useful if its financial obligations are realistic.

The parties should understand how a purchase price would be determined and where the money would come from.

## What happens during incapacity?

Death is not the only event that can leave a business without an active owner.

Planning should address who has authority when the owner is alive but temporarily or permanently unable to act.

## Fair does not always mean equal ownership

A business owner may want to provide fairly for several children while leaving control of the company to the child who actually works in it.

That requires coordination between the estate plan and the business succession plan.

## Planning is easier before the decision becomes urgent

The objective is not to predict every possible event.

It is to create enough structure that the people left to act are not forced to improvise during a crisis.

Closing CTA:

**Own a closely held business? Discuss succession planning with Hawthorne & Cole.**

---

# 89. Fort Worth Location Page

Route:

`/locations/fort-worth`

SEO title:

**Fort Worth Business & Estate Attorneys | Hawthorne & Cole**

Eyebrow:

**Fort Worth, Texas**

H1:

# Legal counsel for Fort Worth businesses, property owners, and families.

Intro:

Hawthorne & Cole is based in downtown Fort Worth and serves clients dealing with business disputes, contracts, commercial property, estate planning, and probate matters throughout North Texas.

---

## Local Business Context

Heading:

## Counsel built around the way closely held businesses actually operate.

Body:

Fort Worth's economy includes family-owned companies, professional firms, contractors, property investors, manufacturers, service businesses, and companies whose ownership and management relationships may span generations.

For those businesses, legal matters frequently overlap.

A disagreement between owners can become a contract dispute. A real estate acquisition can affect operating cash flow. Estate planning can determine who controls a company after the death of its founder.

Hawthorne & Cole's practice is structured around those intersections.

---

## Fort Worth Practice Areas

* Business Litigation
* Contract Disputes
* Commercial Real Estate
* Estate Planning
* Probate

---

## Office Information

**Hawthorne & Cole Attorneys at Law**
500 West 7th Street
Suite 1800
Fort Worth, Texas 76102

**Phone:** (817) 555-0148

Clearly mark the address and phone number as fictional in the portfolio disclosure.

---

## Location CTA

Heading:

# Start with the decision you are facing.

Body:

Describe the matter and what you are trying to accomplish. The consultation process is designed to identify the relevant practice area and determine the appropriate next step.

CTA:

**Schedule a Consultation**

---

# 90. Consultation Page

Route:

`/consultation`

Eyebrow:

**Consultation**

H1:

# Tell us what decision you are facing.

Intro:

A useful first conversation begins with enough context to understand the problem.

Use the guided form below to identify the type of matter and provide a brief description.

Portfolio disclosure:

**This is a demonstration form for a fictional law firm. Do not submit confidential, personal, financial, or legally sensitive information. No information entered here is transmitted to an attorney.**

---

# 91. Consultation Wizard Content

## Progress Labels

1. Matter
2. Details
3. Contact
4. Review

---

## Step 1 Heading

# What can we help with?

Supporting text:

Choose the category that most closely matches the issue. You can select **Something else** if you are unsure.

Options:

### Business dispute

Conflict involving business ownership, management, payment, fiduciary duties, or another commercial relationship.

### Contract matter

A disagreement involving the meaning, performance, enforcement, or termination of an agreement.

### Commercial real estate

A purchase, sale, lease, ownership, or dispute involving commercial property.

### Estate planning

Planning involving wills, trusts, incapacity, succession, or transfer of property.

### Probate

Estate administration, executor responsibilities, beneficiary issues, or probate disputes.

### Something else

The matter does not clearly fit one of the categories above.

Button:

**Continue**

---

## Step 2 Heading

# Tell us about the matter.

Universal field:

**Briefly describe what is happening.**

Helper text:

Provide enough information to understand the situation, but do not include confidential or sensitive information. This portfolio form does not transmit submissions.

---

## Business Dispute Conditional Fields

Question:

**What best describes the dispute?**

Options:

* disagreement between owners
* payment or commercial dispute
* fiduciary-duty concern
* company control or management issue
* another business dispute

Question:

**Has a lawsuit already been filed?**

* Yes
* No
* Unsure

---

## Contract Conditional Fields

Question:

**What is the primary issue?**

* payment
* non-performance
* termination
* interpretation of the agreement
* another contract issue

Question:

**Is there a written agreement?**

* Yes
* No
* Unsure

---

## Commercial Real Estate Conditional Fields

Question:

**What type of matter is this?**

* purchase
* sale
* lease
* property dispute
* ownership issue
* other

Question:

**Has an agreement already been signed?**

* Yes
* No
* Unsure

---

## Estate Planning Conditional Fields

Question:

**What are you planning for?**

* individual estate plan
* family estate plan
* business succession
* update to an existing plan
* other

Question:

**Do you currently have estate-planning documents?**

* Yes
* No
* Unsure

---

## Probate Conditional Fields

Question:

**What best describes your role?**

* executor or administrator
* beneficiary
* family member
* another interested party
* unsure

Question:

**Is there currently a dispute?**

* Yes
* No
* Possibly

---

# 92. Consultation Contact Step

Heading:

# How should the firm contact you?

Fields:

**Full name**

**Email address**

**Phone number**

**Preferred contact method**

Options:

* Phone
* Email
* Either

**Preferred consultation period**

Options:

* Morning
* Afternoon
* No preference

Portfolio helper text:

This form is a functional portfolio demonstration. Information entered into the public demo should not be transmitted or stored.

---

# 93. Consultation Review Step

Heading:

# Review your information.

Supporting text:

Check the information below before completing the demonstration.

Buttons:

**Back**

**Complete Demo**

---

# 94. Consultation Success State

Heading:

# Demonstration complete.

Body:

In a production implementation, the firm would receive the intake information and contact the prospective client according to its consultation process.

Because Hawthorne & Cole is a fictional portfolio project, no legal inquiry has been submitted.

CTA:

**Return to Home**

---

# 95. Privacy Page

Route:

`/privacy`

H1:

# Privacy and Portfolio Disclosure

Body:

Hawthorne & Cole is a fictional law firm created as a portfolio demonstration for Brian Woodson Web Development.

The attorneys, firm history, representative matters, address, phone number, credentials, and legal services described on this website are fictional.

This website does not provide legal advice and does not create an attorney-client relationship.

The consultation form is a user-interface demonstration only. Visitors should not enter confidential, financial, personal, or legally sensitive information.

If analytics are enabled on the demonstration site, they should be limited to basic portfolio traffic measurement and should not collect information submitted through the consultation interface.

---

# 96. 404 Page Content

Eyebrow:

**404**

H1:

# This page isn't part of the record.

Body:

The page you requested may have moved or may not exist.

Primary CTA:

**Return Home**

Secondary CTA:

**Explore Practice Areas**

---

# 97. Global Consultation Banner

Reusable across major pages.

Eyebrow:

**Start a Conversation**

Heading:

# Understand the options before choosing the next move.

Body:

Tell us what you are facing and what you are trying to accomplish.

CTA:

**Schedule a Consultation**

---

# 98. Footer Content

Firm heading:

**Hawthorne & Cole**

Descriptor:

Business, real estate, estate planning, litigation, and probate counsel in Fort Worth, Texas.

Address:

500 West 7th Street
Suite 1800
Fort Worth, Texas 76102

Phone:

(817) 555-0148

Navigation groups:

## Practice Areas

* Business Litigation
* Contract Disputes
* Commercial Real Estate
* Estate Planning
* Probate

## Firm

* Attorneys
* Representative Matters
* Insights
* About
* Consultation

## Legal

* Privacy
* Portfolio Disclosure

Disclosure:

**Hawthorne & Cole is a fictional law firm created as a portfolio project by Brian Woodson Web Development. No attorney-client relationship is offered or created through this website.**

Copyright:

**© Hawthorne & Cole. Fictional portfolio concept.**

---

# 99. Content Tone Rules

All additional content must follow these principles.

## Speak like a professional advisor, not an advertiser.

Prefer:

> Understand the risks before choosing the next move.

Avoid:

> Fight for the justice you deserve!

## Do not use fear-based law-firm clichés.

Avoid:

* aggressive representation
* we fight for you
* don't face this alone
* results you deserve
* trusted legal warriors
* protecting your rights every step of the way

## Do not use empty prestige language.

Avoid:

* unparalleled excellence
* world-class counsel
* premier law firm
* relentless commitment
* bespoke legal solutions
* award-winning representation

Credibility should come from clarity and specificity.

## Use ordinary language when possible.

Prefer:

> disagreement between owners

over:

> intra-corporate stakeholder controversy

Prefer:

> what happens if the agreement ends

over:

> ramifications attendant to contractual termination

## Headlines should communicate an idea.

Prefer:

> Property decisions measured in years deserve more than a quick document review.

Avoid:

> Commercial Real Estate Services

as the primary page headline.

---

# 100. Content Relationship Rules

Content relationships should be represented structurally rather than duplicated manually.

## Elizabeth Hawthorne

Primary practice areas:

* Business Litigation
* Contract Disputes
* Probate

Articles:

* What a Business Owner Should Do When a Partnership Dispute Begins
* When a Contract Dispute Becomes a Business Problem
* Why Winning a Lawsuit Is Not Always the Same as Getting a Good Business Result

Representative matters:

* Preserving a viable company during an ownership dispute

---

## Daniel Cole

Primary practice areas:

* Commercial Real Estate
* Estate Planning
* Probate

Articles:

* Five Issues to Review Before Signing a Commercial Lease
* Estate Planning for Business Owners Is Also Business Planning
* What Happens to a Business When One Owner Dies?

Representative matters:

* Restructuring a property acquisition after lease inconsistencies surfaced
* Separating management succession from family inheritance

---

# 101. Additional Insight Content to Seed

These articles do not initially require complete long-form bodies unless the site needs them for launch.

They should exist as structured entries so related-content functionality can be demonstrated.

## Article

Title:

**When a Contract Dispute Becomes a Business Problem**

Author:

Elizabeth Hawthorne

Category:

Contracts

Summary:

A legally defensible position can still produce a poor commercial outcome if enforcement damages an important customer, vendor, or operating relationship.

---

## Article

Title:

**Why Winning a Lawsuit Is Not Always the Same as Getting a Good Business Result**

Author:

Elizabeth Hawthorne

Category:

Business Disputes

Summary:

Litigation strategy should be measured against the value of the business objective rather than the satisfaction of proving the other side wrong.

---

## Article

Title:

**What Happens to a Business When One Owner Dies?**

Author:

Daniel Cole

Category:

Estate Planning

Summary:

Ownership agreements and estate documents should answer who receives the interest, who controls the company, and whether surviving owners have a right or obligation to purchase it.

---

# 102. Required Initial Content Inventory

The first complete implementation should therefore contain:

* 1 homepage
* 1 about page
* 1 attorneys index
* 2 attorney profiles
* 1 practice-area index
* 5 complete practice-area pages
* 1 representative-matters index
* 3 complete representative matters
* 1 insights index
* 3 complete articles
* 3 additional seeded article entries
* 1 Fort Worth location page
* 1 consultation page
* 1 privacy/disclosure page
* 1 custom 404 page

This provides enough content to demonstrate a genuine multi-page professional-services architecture rather than a homepage mockup.

---

# 103. Content Implementation Rule

Codex must treat the content in this specification as **actual initial production content for the fictional site**, not as sample text to replace with generated filler.

Where content is stored in Astro content collections:

* preserve the supplied titles
* preserve the supplied summaries
* preserve attorney relationships
* preserve practice-area relationships
* preserve representative-matter relationships
* preserve author relationships
* preserve disclosure language

If additional microcopy is required for accessibility, validation, navigation, or state communication, it should follow the tone established in this document.

Do not use lorem ipsum.

Do not generate generic legal-marketing copy simply because a field has not explicitly been provided.

If genuinely necessary content is missing, implement the structure without fabricating unsupported claims.
