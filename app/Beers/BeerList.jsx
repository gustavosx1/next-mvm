export default async function BeerList() {
  const beers = await fetch("https://api.sampleapis.com/beers/ale", { next: { revalidate: 60 } })
    .then((r) => r.json())

  return (
    <ul className="items-center bg-zinc-50 font-sans dark:bg-black">
      {
        beers.map((beer) => (
          <li key={beer.id}>
            {beer.id} - {beer.name}
            <p>{beer.price}</p>
            <hr />
          </li>
        ))
      }
    </ul>
  )
}
