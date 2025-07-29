import { useForm, Link } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { routes } from '@/lib/routes';

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <AuthLayout title="Forgot Password">
      <div className="mb-4 text-sm text-muted-foreground dark:text-muted-foreground">
        Forgot your password? No problem. Just let us know your email address and we will email you a password
        reset link that will allow you to choose a new one.
      </div>

      {status && (
        <div className="mb-4 font-medium text-sm text-primary dark:text-primary">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            onChange={(e) => setData('email', e.target.value)}
            required
            autoFocus
          />
          {errors.email && <p className="text-sm text-destructive dark:text-destructive mt-1">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button type="submit" className="w-full" disabled={processing}>
            Email Password Reset Link
          </Button>

          <div className="text-center text-sm text-muted-foreground dark:text-muted-foreground">
            <Link href={route(routes.auth.login)} className="text-primary hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
}
