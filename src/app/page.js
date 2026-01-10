// src/app/page.js (For Admin App only)
import { redirect } from 'next/navigation';

export default function Page() {
  // Automatically send users to the CMS folder
  redirect('/dashboard'); 
}