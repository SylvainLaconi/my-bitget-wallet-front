import PageLayout from '../layouts/page-layout';
import LogoutButton from '../components/logout-button';

export default function DashboardPage() {
  return (
    <PageLayout>
      <h1>Dashboard</h1>
      <LogoutButton />
    </PageLayout>
  );
}
