"use client"; // This marks the component as a Client Component

import { useSearchParams } from 'next/navigation';
import EmailVerificationForm from "@/components/auth/email-verification-form";

const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || undefined; // Convert null to undefined

  return (
    <div>
      <EmailVerificationForm token={token} />
    </div>
  );
};

export default EmailVerificationPage;
