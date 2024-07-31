import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiPath } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(public http: HttpClient) {}

  getCategories(): Observable<any> {
    // Retrive all categories & subcategories
    return this.http.get(ApiPath.HOST + ApiPath.GETGATEGORIES);
  }

  getRecipesByCategory(id: any): Observable<any> {
    // Retrive all recipes of a specific category
    return this.http.get(ApiPath.HOST + ApiPath.GETRECIPESBYCATEGORY + "?id=" + id);
  }

  getRecipesBySubcategory(id: any): Observable<any> {
    // Retrive all recipes of a specific subcategory
    return this.http.get(ApiPath.HOST + ApiPath.GETRECIPESBYSUBCATEGORY + "?id=" + id);
  }
}
