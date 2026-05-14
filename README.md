<div align="center">
<img width="1200" height="475" alt="OB-dev banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# OB-dev

OB-dev is a bilingual digital agency website for crafting high-end digital solutions. The site presents the agency's positioning, core capabilities, featured work, client feedback, insights, FAQ, and a contact flow for new projects.

## What the site includes

- A bold landing page with hero messaging and calls to action
- Core services across web development, mobile apps, desktop apps, and API/cloud architecture
- Featured portfolio projects and testimonials
- Blog and article pages for agency insights
- A contact page for project inquiries
- English and French content via a language switcher

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion
- Lucide React

## Project Structure

- [src/App.tsx](src/App.tsx) wires up routing and layout
- [src/pages/Home.tsx](src/pages/Home.tsx) renders the homepage sections
- [src/pages/Work.tsx](src/pages/Work.tsx) shows portfolio work
- [src/pages/Blog.tsx](src/pages/Blog.tsx) and [src/pages/BlogDetail.tsx](src/pages/BlogDetail.tsx) handle articles
- [src/pages/Contact.tsx](src/pages/Contact.tsx) provides the inquiry form
- [src/data/content.json](src/data/content.json) stores the English and French site copy

## Run Locally

**Prerequisite:** Node.js

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Build for production:
   `npm run build`

## Notes

The site is designed as a marketing and lead-generation presence for OB-dev, with the content driven from a single localized JSON file.
