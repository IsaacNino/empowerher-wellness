# EmpowerHer Wellness

A modern, responsive marketing website for EmpowerHer Wellness, a Colorado-based outpatient behavioral health practice specializing in individualized therapy, life & recovery coaching, and family therapy.

Built as a lightweight static site with a serverless contact form and deployed on Vercel.

---

## Features

- Responsive design for desktop and mobile
- Vimeo embedded introduction video
- Interactive service modals
- Contact form powered by Vercel Serverless Functions
- Accessible navigation and modal interactions
- Clean, lightweight vanilla JavaScript
- TailwindCSS via CDN
- Ready for deployment on Vercel

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS
- Lucide Icons
- Vercel Serverless Functions
- Resend Email API

---

## Project Structure

```
empowerher-wellness/
│
├── api/
│   └── contact.js          # Serverless contact form endpoint
│
├── css/
│   └── styles.css          # Site styling
│
├── js/
│   └── script.js           # Client-side interactions
│
├── assets/
│   ├── images/
│   ├── video/
│   └── icons/
│
├── index.html
├── package.json
├── vercel.json
└── README.md
```

---

## Local Development

Install dependencies:

```bash
npm install
```

Run the local development server:

```bash
npx vercel dev
```

The site will be available locally with the contact form fully functional.

---

## Contact Form

The contact form is handled by a Vercel Serverless Function located in:

```
api/contact.js
```

Emails are delivered using the Resend API.

Required environment variables:

```
RESEND_API_KEY
TO_EMAIL
```

These should be configured within the Vercel project settings and should never be committed to source control.

---

## Deployment

Deploy using the Vercel CLI:

```bash
vercel
```

or connect the repository directly to Vercel for automatic deployments.

---

## Future Improvements

- Google Analytics
- Custom favicon
- Open Graph metadata
- Structured data (Schema.org)
- Real team photography
- CMS integration (optional)

---

## Developed By

Built by Isaac Nino

Applied AI Technologist | Creative Technologist

https://isaacnino.com