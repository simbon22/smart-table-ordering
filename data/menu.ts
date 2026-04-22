export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
};

export const menu: Product[] = [
  {
    id: "1",
    name: "Margherita",
    description: "Pomodoro, mozzarella, basilico",
    price: 8.50,
    category: "Pizze",
    image: "/pizza-margherita.jpg",
    popular: true,
  },
  {
    id: "2",
    name: "Marinara",
    description: "Pomodoro, aglio, origano",
    price: 7.50,
    category: "Pizze",
    image: "/pizza-marinara.jpg",
  },
  {
    id: "3",
    name: "Diavola",
    description: "Pomodoro, mozzarella, salame piccante",
    price: 11.00,
    category: "Pizze",
    image: "/pizza-diavola.jpg",
    popular: true,
  },
  {
    id: "4",
    name: "Coca Cola",
    description: "33cl",
    price: 3.00,
    category: "Bevande",
    image: "/coca-cola.jpg",
    popular: true,
  },
  {
    id: "5",
    name: "Acqua",
    description: "50cl",
    price: 1.50,
    category: "Bevande",
    image: "/acqua.jpg",
  },
  {
    id: "6",
    name: "Tiramisù",
    description: "Dolce al cucchiaio",
    price: 5.00,
    category: "Dolci",
    image: "/tiramisu.jpg",
    popular: true,
  },
];