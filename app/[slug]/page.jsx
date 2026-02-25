"use client"
import { useParams } from "next/navigation";
import Link from "next/link"
export default function Page() {
  const { slug } = useParams();
  console.log(slug)

  return (
    <div>
      <h1>Slug: {slug}</h1>

      <Link href="/Beers">Link para /Beer</Link>
    </div>
  );
}
