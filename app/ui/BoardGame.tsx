import Image from "next/image";
import cx from "classnames";

type Props = {
  size?: "small" | "regular";
  name: string;
  thumbnail: string;
};

export default function BoardGame({
  size = "regular",
  name,
  thumbnail,
}: Props) {
  return (
    <div
      className={cx("flex items-center", {
        "gap-4": size === "regular",
        "gap-2": size === "small",
      })}
    >
      <div
        className={cx("relative shrink-0", {
          "w-16 h-16": size === "regular",
          "w-6 h-6": size === "small",
        })}
      >
        <Image
          src={thumbnail}
          alt={name}
          fill={true}
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <h4
        className={cx("line-clamp-1", {
          "line-clamp-2": size === "regular",
          "line-clamp-1 text-sm": size === "small",
        })}
      >
        {name}
      </h4>
    </div>
  );
}
