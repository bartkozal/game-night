import { expect, test } from "vitest";
import parseBggCollectionPayload from "../parseBggCollectionPayload";
// @ts-expect-error
import bggCollectionPayload from "./bgg-collection-payload.xml?raw";

/*
index: 2

<item objecttype="thing" objectid="4098" subtype="boardgame" collid="102575704">
  <name sortindex="1">Age of Steam: Edycja Deluxe</name>
  <originalname>Age of Steam</originalname>
  <yearpublished>2023</yearpublished>
  <image>https://cf.geekdo-images.com/2Ropo10rrxU8JxRxv0Hs7g__original/img/2q_UcB2Jidd1XAwV71hPC0QC6JY=/0x0/filters:format(png)/pic7503495.png</image>
  <thumbnail>https://cf.geekdo-images.com/2Ropo10rrxU8JxRxv0Hs7g__thumb/img/E4zDMVUc6Uwe7heydFf79QnGGcg=/fit-in/200x150/filters:strip_icc()/pic7503495.png</thumbnail>
  <status own="1" prevowned="0" fortrade="0" want="0" wanttoplay="0" wanttobuy="0" wishlist="0" preordered="0" lastmodified="2023-05-27 08:29:07"/>
  <numplays>0</numplays>
</item>
*/

test("bggResponseParser", () => {
  const bggCollection = parseBggCollectionPayload(bggCollectionPayload);

  expect(bggCollection.length).toEqual(207);
  expect(bggCollection[2]).toEqual({
    id: "4098",
    name: "Age of Steam: Edycja Deluxe",
    thumbnail:
      "https://cf.geekdo-images.com/2Ropo10rrxU8JxRxv0Hs7g__thumb/img/E4zDMVUc6Uwe7heydFf79QnGGcg=/fit-in/200x150/filters:strip_icc()/pic7503495.png",
  });
});
