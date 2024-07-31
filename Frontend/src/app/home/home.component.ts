import { Component } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { Router } from "@angular/router";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  showContent: boolean = false; // Flag to control content visibility
  searchTerm: any; // Store search term
  randomRecipes!: any; // Store random recipes

  constructor(public recipeService: RecipeService, public router: Router) {
    // Fetch random recipes from the recipe service
    this.recipeService.getRecipes().subscribe({
      next: (response) => {
        this.randomRecipes = response; // Assign response to randomRecipes variable
        console.log("getRecipes() from home.component OK"); // Log success message
        this.showContent = true; // Set showContent flag to true to display content
      },
      error: (error) => {
        console.error("getRecipes() from home.component ERROR"); // Log error message
        console.error(error); // Log error details
      },
    });
  }

  // Handle search
  search() {
    if (this.searchTerm) {
      // Navigate to search results page with the search term
      this.router.navigate(["/results/search/" + this.searchTerm]);
    } else {
      return;
    }
  }
}
