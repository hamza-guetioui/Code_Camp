import UpdateById from "@/views/Dashboard/Features/UpdateById";

// Remove generateStaticParams since it can't use auth-dependent data
// Keep this page dynamic
export const dynamic = 'force-dynamic'; // Force dynamic (per-request) rendering

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id 
  // No need to await params - they're already available
  return <UpdateById id={id} />;
};

export default Page;