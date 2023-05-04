import facade from "../facades/apiFacade";

type NavLink = {
  id: string;
  title: string;
  onClick?: () => void;
};

const handleLogout = () => {
  facade.logout();
  localStorage.setItem("username", "");
  window.location.reload();
};

export const navLinks: NavLink[] = [
  {
    id: "searchrecipes",
    title: "SearchRecipes",
  },
  {
    id: "savedrecipes",
    title: "Saved Recipes",
  },
  {
    id: "shoppinglist",
    title: "Shoppinglist",
  },
];

if (facade.loggedIn()) {
  navLinks.push({
    id: "logout",
    title: "Logout",
    onClick: handleLogout,
  });
} else {
  console.log(facade.loggedIn());
  navLinks.push(
    {
      id: "login",
      title: "Login",
    },
    {
      id: "register",
      title: "Register",
    }
  );
}

export const DualHeroBannerText = [
  {
    id: "FrontBannerText",
    heading: "Welcome!",
    textOne:
      "Hello and welcome to Cooking with Monkeys. Here you can find cool recipes and create your own.",
    textTwo:
      "We also have a shopping list, so that you can get an overview for your next shopping trip.",
    linkText: "See the hottest recipes here",
  },
];
export const SearchRecipesText = [
  {
    id: "SearchRecipesText",
    heading: "Search for a recipe right below!",
  },
];
