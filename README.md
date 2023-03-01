# 4SemExamFullstack

Entities:

User
{
\_id: ObjectId,
email: String,
username: String,
password: String,
firstName: String,
lastName: String,
profilePicture: String,
savedRecipes: [ObjectId],
shoppingLists: [ObjectId]
}

Ingredient
{
\_id: ObjectId,
name: String,
type: String,
nutrition: {
calories: Number,
protein: Number,
fat: Number,
carbs: Number
}
}

Recipe{
\_id: ObjectId,
name: String,
user: ObjectId,
guide: String,
time: Number,
ingredients: [
{
name: String,
amount: String
}
],
image: String,
ratings: [Number]
}

ShoppingList
{
\_id: ObjectId,
name: String,
user: ObjectId,
date: Date,
recipeIngredients: [
{
recipeId: ObjectId,
ingredients: [
{
name: String,
amount: String
}
]
}
]
}

Endpoints:

User Endpoints:

POST /api/register : Create a new user account
POST /api/login : Log in a user
POST /api/logout : Log out a user
GET /api/users/:userId : Get user information for a specific user
PUT /api/users/:userId : Update user information for a specific user
DELETE /api/users/:userId : Delete a specific user account
Ingredient Endpoints:

GET /api/ingredients : Get a list of all ingredients
GET /api/ingredients/:ingredientId : Get information for a specific ingredient
POST /api/ingredients : Create a new ingredient
PUT /api/ingredients/:ingredientId : Update information for a specific ingredient
DELETE /api/ingredients/:ingredientId : Delete a specific ingredient
Recipe Endpoints:

GET /api/recipes : Get a list of all recipes
GET /api/recipes/:recipeId : Get information for a specific recipe
POST /api/recipes : Create a new recipe
PUT /api/recipes/:recipeId : Update information for a specific recipe
DELETE /api/recipes/:recipeId : Delete a specific recipe
Shopping List Endpoints:

GET /api/shopping-lists : Get a list of all shopping lists
GET /api/shopping-lists/:shoppingListId : Get information for a specific shopping list
POST /api/shopping-lists : Create a new shopping list
PUT /api/shopping-lists/:shoppingListId : Update information for a specific shopping list
DELETE /api/shopping-lists/:shoppingListId : Delete a specific shopping list

JSON data example::

User:
{
"email": "john@example.com",
"username": "john.doe",
"password": "mypassword",
"firstName": "John",
"lastName": "Doe",
"profilePicture": "https://example.com/profile.jpg",
"savedRecipes": ["60d5d5f2ce03605f40a3d7cc", "60d5d5f2ce03605f40a3d7cd"],
"shoppingLists": ["60d5d5f2ce03605f40a3d7ce", "60d5d5f2ce03605f40a3d7cf"]
}

Ingredient:
{
"name": "Tomato",
"type": "Vegetable",
"nutrition": {
"calories": 18,
"protein": 0.9,
"fat": 0.2,
"carbs": 3.9
}
}

Recipe:
{
"name": "Tomato Pasta",
"user": "60d5d5f2ce03605f40a3d7c9",
"guide": "1. Cook pasta.\n2. Heat olive oil in a pan.\n3. Add garlic and onions and cook until translucent.\n4. Add canned tomatoes and cook for 10 minutes.\n5. Add cooked pasta to the sauce and mix well.",
"time": 30,
"ingredients": [
{
"name": "Pasta",
"amount": "250g"
},
{
"name": "Canned tomatoes",
"amount": "400g"
},
{
"name": "Garlic",
"amount": "2 cloves"
},
{
"name": "Onions",
"amount": "1/2 onion"
},
{
"name": "Olive oil",
"amount": "2 tbsp"
}
],
"image": "https://example.com/tomato-pasta.jpg",
"ratings": [4, 5, 4, 3, 5]
}

Shopping List:
{
"{
"name": "Grocery List",
"user": "60957e701a0f143d847c6a8f", // user's object id
"date": "2022-04-01T10:00:00.000Z",
"recipeIngredients": [
{
"recipeId": "60957e701a0f143d847c6a91", // recipe's object id
"ingredients": [
{
"name": "flour",
"amount": "2 cups"
},
{
"name": "sugar",
"amount": "1 cup"
},
{
"name": "butter",
"amount": "1/2 cup"
}
]
},
{
"recipeId": "60957e701a0f143d847c6a92", // recipe's object id
"ingredients": [
{
"name": "chicken breasts",
"amount": "2"
},
{
"name": "garlic",
"amount": "2 cloves"
},
{
"name": "lemon juice",
"amount": "1/4 cup"
},
{
"name": "olive oil",
"amount": "2 tablespoons"
}
]
}
]
}

}



Components:

// Future scope:

Home page
Search bar
Recipe list
Recipe detail page
Login form
Registration form
User profile page
Saved recipes list
Create recipe form
Edit recipe form
Shopping list
Shopping list item
Navigation bar
Footer
Error boundary
Loading spinner
 //Modal
Toast notification
 //Pagination
 //Image uploader
Logout button
 //Social media sharing buttons
Privacy policy page
Terms of service page.

