## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# Hawthorne & Cole Project Instructions

## Source of truth

The complete product specification is located at:

`docs/product-spec.md`

Read that file before making architectural, design-system, component,
content-model, routing, accessibility, SEO, or UX decisions.

If an implementation choice conflicts with the product specification,
the product specification wins unless explicitly instructed otherwise.

## Stack

- Astro is the primary framework.
- Tailwind CSS is used for styling.
- Starwind provides appropriate Astro UI primitives.
- Svelte is the only reactive framework permitted.
- React must not be introduced.

## Architecture

Use Astro by default.

Only use Svelte when genuine client-side reactive state is required.
Do not convert static or simple interactive UI into Svelte unnecessarily.

The consultation wizard is expected to be a Svelte island.

## Design system

Design tokens are mandatory.

Do not hard-code brand styling throughout Astro components.

Visual values must originate from the project's token system, including:

- colors
- typography
- spacing
- layout widths
- radii
- borders
- shadows
- motion

Use semantic Tailwind utilities such as:

- `bg-background`
- `text-foreground`
- `text-muted-foreground`
- `border-border`

Do not use raw Tailwind palette values for application branding, such as:

- `bg-stone-50`
- `text-neutral-900`
- `border-zinc-200`

Avoid arbitrary visual values such as:

- `bg-[#...]`
- `text-[...]`
- `px-[...]`
- `rounded-[...]`

unless there is a documented technical reason.

Pages consume the design system. They must not define it.

## Component strategy

Prefer reusable components and explicit variants over repeated long
Tailwind class strings.

Use project-owned layout primitives such as:

- Container
- Section
- Stack
- Cluster
- Prose

Use Starwind for appropriate accessible UI infrastructure, but visually
integrate Starwind components into the Hawthorne & Cole token system.

The finished site must not resemble default Starwind styling.

## Accessibility

Target WCAG 2.2 AA.

Preserve:

- semantic HTML
- keyboard accessibility
- visible focus states
- reduced-motion support
- accessible labels and errors
- logical heading order

## Performance

The site is static-first.

Do not ship client-side JavaScript where HTML/CSS or an Astro/Starwind
solution is sufficient.

Svelte JavaScript should only load on routes containing Svelte islands.

## Fictional project

Hawthorne & Cole is a fictional law firm created as a portfolio project.

Do not introduce claims, credentials, addresses, testimonials, awards,
case results, or other content that could reasonably be mistaken for
real-world claims without clearly treating them as fictional.

## Working behavior

Before implementing a substantial feature:

1. Read the relevant portion of `docs/product-spec.md`.
2. Inspect existing patterns before creating new ones.
3. Reuse tokens and components where appropriate.
4. Run the relevant checks after changes.
5. Do not silently weaken architectural requirements to make an
   implementation easier.