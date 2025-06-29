import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Suplar Admin Dashboard',
  description: 'Admin analytics dashboard for Suplar platform',
  robots: 'noindex, nofollow', // Prevent search engines from indexing admin pages
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}