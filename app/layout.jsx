import BeerProvider from "./Context/BeerContext.jsx"


async function getBeers() {
  const res = await fetch("https://api.sampleapis.com/beers/ale", {
    next: { revalidate: 60 }
  })

  return await res.json()
}

export default async function RootLayout({ children }) {
  const Beers = await getBeers()
  return (
    <html lang="en">
      <body>
        <BeerProvider data={Beers}>
          {children}
        </BeerProvider>
      </body>
    </html >
  )
}
