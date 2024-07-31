import { Component, Input } from "@angular/core";

@Component({
  selector: "recipes-listing",
  templateUrl: "./recipes-listing.component.html",
  styleUrl: "./recipes-listing.component.scss",
})
export class RecipesListingComponent {
  @Input() recipes: any[] = []; // Input property to receive recipes array from parent component

  // determine text representation of recipe difficulty based on its level
  difficultyText(recipe: any) {
    if (recipe.level < 0 || recipe.level > 5) {
      return ""; // Return empty string if level is invalid
    }
    if (recipe.level <= 2) {
      return "Εύκολη";
    } else if (recipe.level > 2 && recipe.level <= 4) {
      return "Μέτρια";
    } else {
      return "Δύσκολη";
    }
  }
}
