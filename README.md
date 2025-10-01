# MediTrack Health-Management-System
A comprehensive hospital management system built with Next.js, TypeScript, and Prisma.

## Features


 **Role-based Access Control**: Admin, Doctor, Reception, and Lab roles

 **Patient Management**: Register, search, and manage patient records

 **Appointment Scheduling**: Create and manage appointments

 **Billing System**: Generate and manage bills

 **Lab Reports**: Upload and view lab reports

 **Dashboard Analytics**: Charts and statistics for hospital activity

 **Dark Mode Support**: Modern UI with Tailwind CSS

## Tech Stack

 **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS

**Backend**: Next.js API Routes, Prisma ORM

 **Database**: SQLite (development), PostgreSQL (production)

 **Charts**: Recharts

**Icons**: Lucide React


 ## Getting Started

 
First, run the development server:

1. Install dependencies:


    
  npm install
  
   

npm run dev

 or

yarn dev

 or

pnpm dev



2. Set up the database:
   
  npx prisma migrate dev
   
   npx prisma db seed
   
   
 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
3. Run the development server:
   
   npm run dev
  
 
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
 
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
## Project Structure
 
 
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- **Admin**: Full access to users, patients, labs, and reports
- **Doctor**: Manage patients and appointments
- **Reception**: Register patients, create appointments and bills
- **Lab**: Upload and manage lab reports
 
-You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
+## Contributing
 
## Deploy on Vercel
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
 
**#Screenshots**
<img width="1892" height="822" alt="image" src="https://github.com/user-attachments/assets/0dbea8c2-862f-42ac-85bb-302a4da9f858" />
