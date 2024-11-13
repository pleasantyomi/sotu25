import Image from "next/image";

export default function Logo() {
    return <div className="fixed w-full mx-auto">
        <Image
          src="/logo/asvaLogo.svg"
          alt="asva logo"
          width={100}
          height={100}
          className="lg:h-20 h-18 w-auto mx-auto pt-5"
        />
    </div>
}