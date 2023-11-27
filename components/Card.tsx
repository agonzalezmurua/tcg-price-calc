import classNames from "classnames";
import Image from "next/image";

export function Card({
  name,
  image,
  className = "",
}: {
  name: string;
  image: string;
  className?: string;
}) {
  return (
    <div className={classNames("relative aspect-[0.718/1]", className)}>
      <Image src={image} fill alt={name} className="object-cover" />
    </div>
  );
}
