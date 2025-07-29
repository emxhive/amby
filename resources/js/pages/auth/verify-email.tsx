import { Link } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import { routes } from '@/lib/routes';

export default function VerifyEmail({ status }: { status?: string }) {
  const submit = (e: FormEvent) => {
    e.preventDefault();

    // Send verification email
    const form = e.target as HTMLFormElement;
    form.submit();
  };

  return (
    <AuthLayout title="Email Verification">
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Thanks for signing up! Before getting started, could you verify your email address by clicking on the
        link we just emailed to you? If you didn't receive the email, we will gladly send you another.
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          A new verification link has been sent to the email address you provided during registration.
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <form onSubmit={submit} method="post" action={route('verification.send')}>
          <Button type="submit" className="w-full">
            Resend Verification Email
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="text-primary hover:underline"
          >
            Log Out
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
