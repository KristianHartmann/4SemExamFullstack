import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const dummyShoppingList = [
  { id: 1, name: "Milk", quantity: "1 quart" },
  { id: 2, name: "Eggs", quantity: "1 dozen" },
  { id: 3, name: "Flour", quantity: "2 cups" },
  { id: 4, name: "Sugar", quantity: "1 cup" },
  { id: 5, name: "Butter", quantity: "1 stick" },
];

export interface ShoppingList {
  id: number;
  name: string;
  quantity?: string;
  // add any other fields you need here
}

export const navLinks = [
  {
    id: "recipes",
    title: "Recipes",
  },

  {
    id: "shoppinglist",
    title: "Shoppinglist",
  },
  {
    id: "login",
    title: "Login",
  },
];
export const DualHeroBannerText = [
  {
    id: "FrontBannerText",
    heading: "Velkommen!",
    textOne:
      "Hello and welcome to Cooking with Monkeys. Here you can find cool recipes and create your own.",
    textTwo:
      "We also have a shopping list, so that you can get an overview for your next shopping trip.",
  },
];
