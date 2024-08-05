import Image from "next/image";
import React from "react";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

function WebStore() {
  return (
    <div className="bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full bg-background shadow">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <a className="text-2xl font-bold" href="#">
            Verkkokauppa
          </a>
          <nav className="hidden md:flex items-center gap-4">
            <a className="px-4 py-2 rounded-md hover:bg-muted" href="#">
              Elektroniikka
            </a>
            <a className="px-4 py-2 rounded-md hover:bg-muted" href="#">
              Kodinkoneet
            </a>
            <a className="px-4 py-2 rounded-md hover:bg-muted" href="#">
              Huonekalut
            </a>
            <a className="px-4 py-2 rounded-md hover:bg-muted" href="#">
              Vaatteet
            </a>
            <a className="px-4 py-2 rounded-md hover:bg-muted" href="#">
              Urheilu
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="sr-only">Hae</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              <span className="sr-only">Ostoskori</span>
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="sr-only">Tili</span>
            </button>
          </div>
        </div>
      </header>
      <main>
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tuotekuva"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tuote 1</h3>
                <p className="text-muted-foreground">Tuotekuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">99,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Lisää koriin
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tuotekuva"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tuote 2</h3>
                <p className="text-muted-foreground">Tuotekuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">149,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Lisää koriin
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tuotekuva"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tuote 3</h3>
                <p className="text-muted-foreground">Tuotekuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">79,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Lisää koriin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Image
                src="/placeholder.svg"
                alt="Tuotekuva"
                width="600"
                height="400"
                className="w-full rounded-lg"
                style={{ aspectRatio: "600 / 400", objectFit: "cover" }}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Tuote X</h2>
              <p className="text-muted-foreground mt-2">Tuotekuvaus</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-3xl font-bold">199,99 €</span>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Lisää koriin
                </button>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold">Tuotetiedot</h3>
                <ul className="list-disc pl-6 mt-2 text-muted-foreground">
                  <li>Ominaisuus 1</li>
                  <li>Ominaisuus 2</li>
                  <li>Ominaisuus 3</li>
                </ul>
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-bold">Arvostelut</h3>
                <div className="mt-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5 fill-primary"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5 fill-primary"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5 fill-primary"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5 fill-muted stroke-muted-foreground"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="w-5 h-5 fill-muted stroke-muted-foreground"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span className="ml-2 text-muted-foreground">4.3</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Loistava tuote, suosittelen lämpimästi!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container mx-auto py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tarjous 1"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tarjous 1</h3>
                <p className="text-muted-foreground">Tarjouskuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">79,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Osta nyt
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tarjous 2"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tarjous 2</h3>
                <p className="text-muted-foreground">Tarjouskuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">99,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Osta nyt
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Tarjous 3"
                width="400"
                height="300"
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400 / 300", objectFit: "cover" }}
              />
              <div className="p-4">
                <h3 className="text-xl font-bold">Tarjous 3</h3>
                <p className="text-muted-foreground">Tarjouskuvaus</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold">59,99 €</span>
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    Osta nyt
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold">Verkkokauppa</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#">Etusivu</a>
                </li>
                <li>
                  <a href="#">Tuotteet</a>
                </li>
                <li>
                  <a href="#">Ostoskori</a>
                </li>
                <li>
                  <a href="#">Tilaus</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Tietoa meistä</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="#">Yritys</a>
                </li>
                <li>
                  <a href="#">Yhteystiedot</a>
                </li>
                <li>
                  <a href="#">Toimitusehdot</a>
                </li>
                <li>
                  <a href="#">Palautukset</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold">Seuraa meitä</h3>
              <div className="mt-4 flex items-center space-x-4">
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  className="text-muted-foreground hover:text-foreground"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="w-6 h-6"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © 2023 Verkkokauppa. Kaikki oikeudet pidätetään.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WebStore;
