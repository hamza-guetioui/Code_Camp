import Layout from "@/views/Dashboard/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex">
      <Layout>{children}</Layout>
    </main>
  );
}
