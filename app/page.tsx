import PlusSmallIcon from "@heroicons/react/24/outline/PlusSmallIcon";

export default function Home() {
  return (
    <main>
      <h2>Select games for your next game life</h2>
      <div>
        <label htmlFor="bgg-accounts" className="flex">
          Choose BGG accounts which will be used to create games list.
        </label>
        <input id="bgg-accounts" type="text" name="bgg-accounts" />
        <a href="#" className="flex">
          <PlusSmallIcon className="w-6 h-6" /> add more
        </a>

        <label htmlFor="games-number" className="flex">
          How many games can be selected?
        </label>
        <input type="number" name="games-number" id="games-number" />
      </div>
    </main>
  );
}
