import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiPath } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  constructor(public http: HttpClient) {}

  getRecipes(): Observable<any> {
    // Retrive 6 random recipes for home page
    return this.http.get(ApiPath.HOST + ApiPath.GETRECIPES);
  }

  getRecipe(id: any): Observable<any> {
    // Retrive the recipe with a specific id
    return this.http.get(ApiPath.HOST + ApiPath.GETRECIPE + "?id=" + id);
  }

  getMyRecipes(): Observable<any> {
    // Retrive user's recipes
    return this.http.get(ApiPath.HOST + ApiPath.MYRECIPES);
  }

  addRecipe(object: any): Observable<any> {
    // Add a new recipe
    return this.http.post(ApiPath.HOST + ApiPath.ADDRECIPE, object);
  }

  editRecipe(object: any): Observable<any> {
    // Edit a recipe
    return this.http.post(ApiPath.HOST + ApiPath.EDITRECIPE, object);
  }

  deleteRecipe(id: number) {
    // Delete a recipe
    return this.http.delete(ApiPath.HOST + ApiPath.MYRECIPES + "?id=" + id, {
      responseType: "text",
    });
  }

  uploadRecipePhoto(data: File, id: any, fileExtension: string) {
    // Upload Recipe Photo
    const formdata: FormData = new FormData();
    const photoName = id + "." + fileExtension; // Concatenate id and file extension
    const newFile = new File([data], photoName, { type: data.type }); // Create new file with the modified photo name
    formdata.append("photoFile", newFile);
    return this.http.post(ApiPath.HOST + ApiPath.FILEUPLOAD, formdata);
  }

  getRecipesByName(searchText: string) {
    // Retrive recipes by title
    return this.http.get(
      ApiPath.HOST + ApiPath.GETRECIPESBYNAME + "?name=" + searchText
    );
  }
}
