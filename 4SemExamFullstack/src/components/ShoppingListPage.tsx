import React from "react";
import { ShoppingList } from "../constants"; // import the ShoppingList type

interface ShoppingListPageProps {
  shoppingList: ShoppingList[]; // define a prop for the shopping list data
}

const ShoppingListPage: React.FC<ShoppingListPageProps> = ({
  shoppingList,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Here is what you need to buy!</h1>
      <ul className="list-disc list-inside">
        {shoppingList.map((item) => (
          <li key={item.id} className="mb-2">
            <span className="font-bold">{item.name}</span>
            {item.quantity && <span className="ml-2">{item.quantity}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingListPage;
