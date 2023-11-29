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
    <div className={classNames("relative aspect-[245/342]", className)}>
      <Image src={image} fill alt={name} className="object-contain" />
    </div>
  );
}
