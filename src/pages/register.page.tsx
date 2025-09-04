import RegisterForm from '../components/register-form';

export default function RegisterPage() {
  return (
    <div className="flex flex-col gap-8 min-h-full">
      <h3 className="text-2xl font-bold">Créer un compte</h3>
      <RegisterForm />
    </div>
  );
}
