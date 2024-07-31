import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "myrecipes",
  templateUrl: "./myrecipes.component.html",
  styleUrl: "./myrecipes.component.scss",
})
export class MyrecipesComponent implements OnInit {
  recipes: any[] = []; // Array to hold user's recipes

  // Define columns to be displayed in the table
  displayedColumns: string[] = [
    "photo",
    "recipe_title",
    "created",
    "updated",
    "actions",
  ];

  constructor(
    public recipeService: RecipeService,
    public router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Retrieve user's recipes when component initializes
    this.recipeService.getMyRecipes().subscribe({
      next: (response) => {
        this.recipes = response; // Initialize retrieved recipes to the array
        console.log("getMyRecipes() from myrecipies.component OK");
      },
      error: (error) => {
        console.error("getMyRecipes() from myrecipies.component ERROR");
        console.error(error);
      },
    });
  }

  // Format date string to readable format
  formatDate(isoString: string) {
    // Transform ISO string to Date object
    const date = new Date(isoString);
    // Format the date using DatePipe
    return this.datePipe.transform(date, "medium");
  }

  // Delete a recipe
  deleteRecipe(id: number) {
    Swal.fire({
      title: "Είσαι σίγουρος πως θέλεις να διαγραφεί η συνταγή;",
      icon: "question",
      confirmButtonText: "Διαγραφή",
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.recipeService.deleteRecipe(id).subscribe({
          next: (response) => {
            console.log(response);
            if (response == "Recipe deleted successfully") {
              // Reload recipes after successful deletion
              this.ngOnInit();
            } else {
              // Display error message if deletion fails
              Swal.fire({
                title: "Η διαγραφή απέτυχε!",
                // text: res.message,
                icon: "error",
                confirmButtonText: "Προσπαθήστε ξανά",
              }).then(() => {
                window.location.reload();
              });
            }
          },
          error: (error) => {
            console.error("deleteRecipe() from myrecipes.component ERROR");
            console.error(error);
          },
        });
      }
    });
  }
}
