import Link from "next/link";

const RedirectTo = ({
  link,
  title,
  label,
}: {
  link: string;
  title: string;
  label?: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      {" "}
      <p>{label}</p>
      <Link href={link} className="font-bold text-blue-500">
        {title}
      </Link>
    </div>
  );
};

export default RedirectTo;
