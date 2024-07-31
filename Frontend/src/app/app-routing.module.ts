import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { ResultsComponent } from "./results/results.component";
import { MyrecipesComponent } from "./myrecipes/myrecipes.component";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { addRecipeResolver } from "./resolvers/add-recipe.resolver";

const routes: Routes = [
  { path: "home", component: HomeComponent, title: "Αρχική" },
  { path: "register", component: RegisterComponent, title: "Εγγραφή" },
  { path: "login", component: LoginComponent, title: "Σύνδεση" },
  { path: "recipe/:id", component: RecipeComponent },
  { path: "results/category/:id", component: ResultsComponent, title: "Αποτελέσματα - Κατηγορία" },
  { path: "results/subcategory/:id", component: ResultsComponent, title: "Αποτελέσματα - Υποκατηγορία" },
  { path: "results/tag/:tagName", component: ResultsComponent, title: "Αποτελέσματα - Ετικέτα" },
  { path: "results/search/:searchText", component: ResultsComponent, title: "Αποτελέσματα - Αναζήτηση" },
  { path: "myrecipes", component: MyrecipesComponent, title: "Οι Συνταγές μου" },
  { path: "addrecipe", component: AddRecipeComponent, resolve: {data: addRecipeResolver}, title: "Προσθήκη Συνταγής" },
  { path: "editrecipe/:id", component: AddRecipeComponent, resolve: {data: addRecipeResolver}, title: "Επεξεργασία Συνταγής" },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
