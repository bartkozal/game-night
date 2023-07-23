type BggCollectionEntry = {
  id: string | null;
  name?: string | null;
  thumbnail?: string | null;
};

export default function parseBggCollectionPayload(
  bggCollectionPayload: string
) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(bggCollectionPayload, "text/xml");
  const parsedValue: BggCollectionEntry[] = [];

  xml.querySelectorAll("item").forEach((item) => {
    parsedValue.push({
      id: item.getAttribute("objectid"),
      name: item.querySelector("name")?.textContent,
      thumbnail: item.querySelector("thumbnail")?.textContent,
    });
  });

  return parsedValue;
}
