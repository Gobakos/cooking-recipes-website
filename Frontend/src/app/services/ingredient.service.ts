import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiPath } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class IngredientService {
  constructor(public http: HttpClient) {}

  getIngredients(): Observable<any> {
    // Retrive all ingredients
    return this.http.get(ApiPath.HOST + ApiPath.GETINGREDIENTS);
  }

  getDescriptions(): Observable<any> {
    // Retrive all descriptions
    return this.http.get(ApiPath.HOST + ApiPath.GETDESCRIPTIONS);
  }
}
