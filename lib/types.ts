
export interface FashionItem {
  id: number;  // Tämä vastaa INTEGER-tyyppiä tietokannassa
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  embedding?: number[]  // Jos embedding-kenttä on mukana palautetuissa tuloksissa
}