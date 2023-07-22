import Image from "next/image";
import cx from "classnames";

type Props = {
  size?: "small";
};

function getThumbnailSize(size: Props["size"]): number {
  switch (size) {
    case "small":
      return 20;
    default:
      return 50;
  }
}

export default function BoardGame({ size }: Props) {
  return (
    <div
      className={cx("flex items-center", {
        "gap-4": !size,
        "gap-2": size === "small",
      })}
    >
      <Image
        src="https://cf.geekdo-images.com/7bd4Zhbzdc_57GEpnd_zjA__thumb/img/yY27TheKJozDYkCXczDLgrCIo-M=/fit-in/200x150/filters:strip_icc()/pic2901599.jpg"
        width={(getThumbnailSize(size) * 4) / 3}
        height={getThumbnailSize(size)}
        alt="Catan: Gra planszowa"
      />

      <h4
        className={cx({
          "text-lg": !size,
          "text-sm": size === "small",
        })}
      >
        Catan: Gra planszowa
      </h4>
    </div>
  );
}
