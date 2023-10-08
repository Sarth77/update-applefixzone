import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-[90%] m-auto">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex p-6 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              20% Off For Your First Shopping!
            </h1>
            <p className="mb-8 leading-relaxed">
              Its right there, in the name. AppleFixZone is a home-grown online
              brand that serves as your exclusive source of apple iPhones spare
              parts solely in India. Our brand ultimately focus on supply of
              original iPhone Spares like Displays, Charging Port, Batteries,
              Motherboard, GX Display, OCA Glass and OCA Sheets.
            </p>
            <div className="flex justify-center">
              <Link href="/products">
                <button
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                // onClick={() => navigate("/products")}
                >
                  Visit Collections
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://firebasestorage.googleapis.com/v0/b/applefixzone01.appspot.com/o/Displays%2FIPHONE-XS-MAX-COMBO-500x500.png?alt=media&token=71d8e48a-b259-49bc-8c2b-541a1e4f03b9"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
