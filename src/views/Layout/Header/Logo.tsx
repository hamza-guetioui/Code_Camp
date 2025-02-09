import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image
        src="next.svg"
        alt="Next.js logo"
        width={148}
        height={38}
        priority
      />
    </Link>
  );
};
export default Logo;
