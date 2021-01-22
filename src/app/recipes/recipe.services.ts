import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

export class RecipeService {
  constructor() {}

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'this is a simply test recipe',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    ),
    new Recipe(
      'An other test recipe',
      'this is a simply test recipe',
      'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg'
    ),
  ];

  getRecipes() {
    return [...this.recipes]
  }

  recipeSelected = new EventEmitter<Recipe>()
}
