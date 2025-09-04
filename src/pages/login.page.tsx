import LoginForm from '../components/login-form';

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 min-h-full">
      <h3 className="text-2xl font-bold">Se connecter</h3>
      <LoginForm />
    </div>
  );
}
