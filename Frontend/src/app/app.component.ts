import { Component } from "@angular/core";
import { CategoryService } from "./services/category.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  categories: any;

  constructor(public categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log("getCategories() from app.component OK");
      },
      error: (error) => {
        console.error("getCategories() from app.component ERROR");
        console.error(error);
      },
    });
  }
}
