import { Component } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs";
import { RecipeService } from "../services/recipe.service";
import { TagService } from "../services/tag.service";

@Component({
  selector: "results",
  templateUrl: "./results.component.html",
  styleUrl: "./results.component.scss",
})
export class ResultsComponent {
  showContent: boolean = false;
  recipes!: any;

  constructor(
    public categoryService: CategoryService,
    public recipeService: RecipeService,
    public tagService: TagService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Determine the type of search based on the URL path
    if (this.route.snapshot.url[1].path == "category") {
      // If Category
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.categoryService.getRecipesByCategory(params.get("id"))
          )
        )
        .subscribe({
          next: (response) => {
            // Handle response for category search
            this.recipes = response;
            console.log("getCategory() from result.component OK");
            this.showContent = true;
          },
          error: (error) => {
            // Handle error for category search
            console.error("getCategory() from result.component ERROR");
            console.error(error);
          },
        });
    } else if (this.route.snapshot.url[1].path == "subcategory") {
      // If Subcategory
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.categoryService.getRecipesBySubcategory(params.get("id"))
          )
        )
        .subscribe({
          next: (response) => {
            // Handle response for subcategory search
            this.recipes = response;
            console.log("getSubcategory() from result.component OK");
            this.showContent = true;
          },
          error: (error) => {
            // Handle error for subcategory search
            console.error("getSubcategory() from result.component ERROR");
            console.error(error);
          },
        });
    } else if (this.route.snapshot.url[1].path == "search") {
      // If Search
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.recipeService.getRecipesByName(params.get("searchText")!)
          )
        )
        .subscribe({
          next: (response) => {
            // Handle response for search by name
            this.recipes = response;
            console.log("getRecipesByName() from result.component OK");
            this.showContent = true;
          },
          error: (error) => {
            // Handle error for search by name
            console.error("getRecipesByName() from result.component ERROR");
            console.error(error);
          },
        });
    } else if (this.route.snapshot.url[1].path == "tag") {
      // If Tag
      this.route.paramMap
        .pipe(
          switchMap((params: ParamMap) =>
            this.tagService.getRecipesByTag(params.get("tagName"))
          )
        )
        .subscribe({
          next: (response) => {
            // Handle response for search by tag
            this.recipes = response;
            console.log("getRecipesByTag() from result.component OK");
            this.showContent = true;
          },
          error: (error) => {
            // Handle error for search by tag
            console.error("getRecipesByTag() from result.component ERROR");
            console.error(error);
          },
        });
    } else {
      // If none of the known paths are matched
      console.log("No known path!");
    }
  }
}
