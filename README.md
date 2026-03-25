# Syed Ali Hasan — Portfolio

A modern, high-end personal portfolio website built with Next.js 15, featuring a Japanese-inspired dark aesthetic, interactive particle system, and smooth animations.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Particles**: Canvas2D (custom implementation)
- **Font**: Inter (Google Fonts)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navbar, footer, SEO
│   ├── page.tsx            # Home page (all sections)
│   ├── globals.css         # Design tokens, theme, animations
│   └── blog/
│       ├── page.tsx        # Blog listing
│       └── [slug]/page.tsx # Dynamic blog posts
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Skills, Experience, Projects, etc.
│   ├── three/              # ParticleCanvas (particle system)
│   └── ui/                 # SharedComponents (GlowCard, SectionHeading)
├── data/                   # All content data (experience, projects, etc.)
└── types/                  # TypeScript interfaces
```

## ✍️ Adding Blog Posts

Edit `src/data/blogs.ts` and add a new entry:

```ts
{
  slug: "my-new-post",
  title: "My New Blog Post",
  excerpt: "A brief description...",
  content: "Full markdown-ish content here...",
  date: "2025-04-01",
  readTime: "5 min read",
  tags: ["Tag1", "Tag2"],
}
```

The blog post will be available at `/blog/my-new-post`.

## 🖼️ Adding Photos

Drop images into `public/photos/` and reference them in `src/data/travel.ts`:

```ts
photos: ["/photos/my-photo.jpg"]
```

## 📝 Customization

- **Colors**: Edit `@theme` variables in `src/app/globals.css`
- **Experience/Projects**: Edit files in `src/data/`
- **Social links**: Edit `src/data/social.ts`
- **Calendly**: Update the link in `src/components/sections/Contact.tsx`

## 🚢 Deployment

```bash
npm run build   # Production build
npm start       # Start production server
```

Deploy to Vercel: `npx vercel` or connect your GitHub repo at [vercel.com](https://vercel.com).

## 🎉 Easter Egg

Click "Blogs" in the navbar 7 times quickly to unlock a surprise! 🪄
