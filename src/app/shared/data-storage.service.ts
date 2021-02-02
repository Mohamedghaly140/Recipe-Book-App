import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipe-book-angular-app-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((res) => console.log(res));
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-book-angular-app-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes: Recipe[]) => this.recipeService.setRecipes(recipes))
      );
  }
}
