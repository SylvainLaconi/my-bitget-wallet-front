import PageLayout from "../layouts/page-layout"
import LoginForm from "../components/login-form"

export default function LoginPage() {
  return (
    <PageLayout>  
      <h1 className="text-2xl font-bold">Se connecter</h1>
      <LoginForm />
    </PageLayout>
  )
}