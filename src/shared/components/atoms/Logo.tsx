import Image from 'next/image';
import Link from 'next/link';

const logoImage = '/logo.svg';

export default function Logo() {
  return (
    <Link
      href="/"
      className="block h-[40px] w-[140px] sm:h-[45px] sm:w-[160px] md:h-[50px] md:w-[180px] lg:w-[200px]"
    >
      <div className="relative h-full w-full">
        <Image
          src={logoImage}
          alt="Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
}
