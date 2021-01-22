import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  constructor() {}

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('tomatos', 11),
  ];

  getIngredients() {
    return [...this.ingredients];
  }

  // ingredientAdded = new EventEmitter<Ingredient>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
