# HRMS - Human Resource Management System

A comprehensive HR management solution built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Overview of HR metrics and recent activities
- **Employee Management**: Add, view, and manage employee records
- **Attendance Tracking**: Monitor employee attendance with check-in/check-out
- **Leave Management**: Handle leave requests and approvals
- **Payroll Processing**: Manage salary calculations and payroll status

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with modern design

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/
│   ├── dashboard/       # Dashboard page
│   ├── employees/       # Employee management page
│   ├── attendance/      # Attendance tracking page
│   ├── leave/          # Leave management page
│   ├── payroll/        # Payroll processing page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── Header.tsx      # Page header
└── types/
    └── index.ts        # TypeScript type definitions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
