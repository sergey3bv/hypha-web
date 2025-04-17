export const metadata = {
  title: 'Your Profile | Hypha',
  description:
    'Manage your Hypha account settings, view your activity, and customize your profile preferences.',
};

export default async function RootLayout({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
}) {
  console.debug('MySpace/layout');
  return (
    <div className="w-full h-full flex">
      {children}
      {aside}
    </div>
  );
}
