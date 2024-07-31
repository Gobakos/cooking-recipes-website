import { Component, OnInit } from "@angular/core";
import { RecipeService } from "../services/recipe.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "recipe",
  templateUrl: "./recipe.component.html",
  styleUrl: "./recipe.component.scss",
})
export class RecipeComponent implements OnInit {
  showContent: boolean = false;
  recipe!: any;

  constructor(
    public recipeService: RecipeService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipeService.getRecipe(this.route.snapshot.params["id"]).subscribe({
      next: (response) => {
        this.recipe = response;
        console.log("getRecipe() from recipe.component OK");
        this.showContent = true;
      },
      error: (error) => {
        console.error("getRecipe() from recipe.component ERROR");
        console.error(error);
      },
    });
  }

  difficultyText() {
    if (this.recipe.level < 0 || this.recipe.level > 5) {
      return "";
    }
    if (this.recipe.level <= 2) {
      return "Εύκολη";
    } else if (this.recipe.level > 2 && this.recipe.level <= 4) {
      return "Μέτρια";
    } else {
      return "Δύσκολη";
    }
  }

  calculateTime(time: number) {
    var date = new Date(time * 60 /* sec per min */ * 1000 /* msec per sec */);
    return (
      ("0" + date.getUTCHours()).slice(-2) +
      ":" +
      ("0" + date.getUTCMinutes()).slice(-2)
    );
  }

  description() {
    return this.recipe.recipe_description.split(". ", 30);
  }
}
