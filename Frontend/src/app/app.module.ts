import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { HttpClientModule } from "@angular/common/http";
import { httpInterceptorProviders } from "./interceptors/http.interceptor";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe, AsyncPipe } from "@angular/common";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatChipsModule } from "@angular/material/chips";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./auth/register/register.component";
import { LoginComponent } from "./auth/login/login.component";
import { RecipesListingComponent } from "./recipes-listing/recipes-listing.component";
import { ResultsComponent } from "./results/results.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { MyrecipesComponent } from "./myrecipes/myrecipes.component";
import { AddRecipeComponent } from "./add-recipe/add-recipe.component";
import { MenuOptionsComponent } from "./menu-options/menu-options.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    RecipesListingComponent,
    ResultsComponent,
    RecipeComponent,
    MyrecipesComponent,
    AddRecipeComponent,
    MenuOptionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [provideAnimationsAsync(), httpInterceptorProviders, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
