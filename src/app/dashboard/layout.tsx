import { AlertProvider } from "@/context/alertContext";
import { RefreshProvider } from "@/context/refrechContext";
import Layout from "@/views/Dashboard/Layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RefreshProvider>
      <AlertProvider>
        <Layout>{children}</Layout>
      </AlertProvider>
    </RefreshProvider>
  );
}
