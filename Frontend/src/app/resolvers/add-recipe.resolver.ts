import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { CategoryService } from "../services/category.service";
import { TagService } from "../services/tag.service";
import { Observable, catchError, forkJoin, map, of, take } from "rxjs";
import { IngredientService } from "../services/ingredient.service";

@Injectable({ providedIn: "root" })
export class addRecipeResolver implements Resolve<any> {
  constructor(
    private categoryService: CategoryService,
    private tagService: TagService,
    private ingrService: IngredientService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin({
      // Fetching categories, descriptions, ingredients, and tags
      categories: this.categoryService.getCategories().pipe(take(1)),
      descriptions: this.ingrService.getDescriptions().pipe(take(1)),
      ingredients: this.ingrService.getIngredients().pipe(take(1)),
      tags: this.tagService.getTags().pipe(take(1)),
    }).pipe(
      map((data) => ({
        // Mapping fetched data
        categories: data.categories,
        descriptions: data.descriptions,
        tags: data.tags,
        ingredients: data.ingredients,
      })),
      catchError((error) => {
        // Handles error and returns empty object
        console.error("Error fetching data:", error);
        return of({});
      })
    );
  }
}
