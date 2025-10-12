import { CustomerHeader } from '@/components/navigation/CustomerHeader';
import { CustomerFooter } from '@/components/navigation/CustomerFooter';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CustomerHeader />
      <main className="flex-1">
        {children}
      </main>
      <CustomerFooter />
    </div>
  );
}
