 export interface Review {
    comment: string;
    createdBy: {
      email: string;
    };
    id: string;
    rating: number;
    recipe: {
      mealHeadline: string;
    };
}

 export interface RecipesQuery {
    recipes: {
      category: {
        category: string;
        id: string;
      };
      createdBy: {
        email: string;
        id: string;
      };
      ingredients: {
        measure: string;
        name: string;
      }[];
      instructions: string;
      mealHeadline: string;
      mealThumbnail: string;
      mealVideo: string;
      reviews: {
        comment: string;
        id: string;
        rating: number;
        createdBy: {
          email: string;
        };
      }[];
    }[];
  }

  export interface TokenPayload {
    _id: string;
    email: string;
    role: string;
  }

  export interface TokenInput {
    token: string;
  }

  export interface RecipeInput {
    mealHeadline: string;
    category: string;
    createdBy: string;
    ingredients: { name: string; measure: string }[];
    instructions: string;
    mealThumbnail?: string;
    mealVideo?: string;
    token: string;
  }

  export interface Ingredient {
    name: string;
    measure: string;
  }

  export interface LoginInput {
    email: string;
    password: string;
  }

  export interface LoginData {
    login: {
      token: string;
    };
  }

  export interface LoginVariables {
    input: LoginInput;
  }

  export type NavLink = {
    id: string;
    title: string;
    onClick?: () => void;
  };

  export interface Meal {
    id: string;
    mealThumbnail: string;
    mealHeadline: string;
    category: {
      category: string;
    };
  }

  export interface Review {
    comment: string;
    createdBy: {
      email: string;
    };
    id: string;
    rating: number;
    recipe: {
      mealHeadline: string;
    };
  }

  export interface ReviewInput {
    comment: string;
    rating: number;
    createdBy: string;
    recipe: string;
  }

  export interface TheMealDb {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
    strCategory: string;
    strTags: string;
  }

  export 
  interface Category {
    idCategory: string;
    strCategory: string;
  }
