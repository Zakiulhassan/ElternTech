"use client"; // Mark as a client component

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/server/actions/tokens";
import { AuthCard } from "./auth-card";
import { FormSuccess } from "./form.success";
import { FormError } from "./form-error";

interface EmailVerificationFormProps {
  token: string | undefined;
}

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = ({ token }) => {
  const router = useRouter();

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleVerification = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("No token found");
      return;
    }
    newVerification(token).then((data) => {
      if (data.error) {
        setError(data.error);
      }
      if (data.success) {
        setSuccess(data.success);
        router.push("/auth/signin");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, success, error, router]);

  useEffect(() => {
    handleVerification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleVerification]);

  return (
    <div className="container">
      <AuthCard
        backButtonLabel="Back to Sign in"
        backButtonHref="/auth/signin"
        cardTitle="Verify your account."
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p>{!success && !error ? "Verifying Email..." : null}</p>
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}        </div>
      </AuthCard>
    </div>
  );
};

export default EmailVerificationForm;
