export type BggCollectionEntry = {
  id: string;
  name: string;
  thumbnail: string;
};

export default function parseBggCollectionPayload(
  bggCollectionPayload: string
) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(bggCollectionPayload, "text/xml");
  const parsedValue: BggCollectionEntry[] = [];

  xml.querySelectorAll("item").forEach((item) => {
    parsedValue.push({
      id: item.getAttribute("objectid") as string,
      name: item.querySelector("name")?.textContent as string,
      thumbnail: item.querySelector("thumbnail")?.textContent as string,
    });
  });

  return parsedValue;
}
