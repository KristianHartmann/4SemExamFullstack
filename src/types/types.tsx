 interface Review {
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

 interface RecipesQuery {
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

  export type {
    Review,
    RecipesQuery
  };
