import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private recipeService: RecipeService
  ) {}

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          'https://recipe-book-angular-app-default-rtdb.firebaseio.com/recipes.json',
          {
            params: new HttpParams().set('auth', user.token),
          }
        );
      }),
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
