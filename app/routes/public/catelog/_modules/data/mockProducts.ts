import type { Product } from "../types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic Cotton T-Shirt",
    sku: "TSH-001",
    imageUrl:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 29.99,
    comparePrice: 39.99,
    status: "in_stock",
    category: "clothing",
    tags: ["cotton", "casual", "comfortable"],
    attributes: {
      size: ["s", "m", "l"],
      color: ["red", "blue"],
      pattern: ["cartoon"],
    },
  },
  {
    id: "2",
    name: "Super Hero Hoodie",
    sku: "HOD-002",
    imageUrl:
      "https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 59.99,
    comparePrice: 79.99,
    status: "in_stock",
    category: "clothing",
    tags: ["hoodie", "superhero", "warm"],
    attributes: {
      size: ["m", "l"],
      color: ["black", "blue"],
      pattern: ["super hero"],
    },
  },
  {
    id: "3",
    name: "Cartoon Cat Mug",
    sku: "MUG-003",
    imageUrl:
      "https://images.pexels.com/photos/2346091/pexels-photo-2346091.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 14.99,
    status: "out_of_stock",
    category: "accessories",
    tags: ["mug", "cat", "ceramic"],
    attributes: {
      color: ["red"],
      pattern: ["cartoon"],
    },
  },
  {
    id: "4",
    name: "Premium Leather Jacket",
    sku: "JKT-004",
    imageUrl:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 199.99,
    comparePrice: 249.99,
    status: "in_stock",
    category: "clothing",
    tags: ["leather", "premium", "jacket"],
    attributes: {
      size: ["s", "m", "l"],
      color: ["black"],
    },
  },
  {
    id: "5",
    name: "Superhero Action Figure",
    sku: "TOY-005",
    imageUrl:
      "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 24.99,
    status: "pending_restock",
    category: "toys",
    tags: ["action figure", "collectible", "superhero"],
    attributes: {
      color: ["red", "blue"],
      pattern: ["super hero"],
    },
  },
  {
    id: "6",
    name: "Cotton Blend Pants",
    sku: "PNT-006",
    imageUrl:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 49.99,
    comparePrice: 69.99,
    status: "in_stock",
    category: "clothing",
    tags: ["pants", "cotton", "comfortable"],
    attributes: {
      size: ["s", "m", "l"],
      color: ["black", "blue"],
    },
  },
  {
    id: "7",
    name: "Cartoon Print Backpack",
    sku: "BAG-007",
    imageUrl:
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 34.99,
    status: "reserved",
    category: "accessories",
    tags: ["backpack", "school", "cartoon"],
    attributes: {
      color: ["red"],
      pattern: ["cartoon"],
    },
  },
  {
    id: "8",
    name: "Black Sneakers",
    sku: "SHO-008",
    imageUrl:
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 89.99,
    comparePrice: 109.99,
    status: "in_stock",
    category: "shoes",
    tags: ["sneakers", "sports", "comfortable"],
    attributes: {
      size: ["s", "m", "l"],
      color: ["black"],
    },
  },
  {
    id: "9",
    name: "Red Baseball Cap",
    sku: "HAT-009",
    imageUrl:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 19.99,
    status: "discontinued",
    category: "accessories",
    tags: ["cap", "baseball", "sun protection"],
    attributes: {
      color: ["red"],
    },
  },
  {
    id: "10",
    name: "Blue Denim Shorts",
    sku: "SHR-010",
    imageUrl:
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 39.99,
    comparePrice: 49.99,
    status: "in_stock",
    category: "clothing",
    tags: ["shorts", "denim", "summer"],
    attributes: {
      size: ["s", "m"],
      color: ["blue"],
    },
  },
  {
    id: "11",
    name: "Superhero Cape Set",
    sku: "CPE-011",
    imageUrl:
      "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 16.99,
    status: "out_of_stock",
    category: "toys",
    tags: ["cape", "costume", "kids"],
    attributes: {
      size: ["s", "m"],
      color: ["red", "blue"],
      pattern: ["super hero"],
    },
  },
  {
    id: "12",
    name: "Black Cartoon Socks",
    sku: "SOX-012",
    imageUrl:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 9.99,
    status: "in_stock",
    category: "accessories",
    tags: ["socks", "cartoon", "comfortable"],
    attributes: {
      size: ["s", "m", "l"],
      color: ["black"],
      pattern: ["cartoon"],
    },
  },
];
