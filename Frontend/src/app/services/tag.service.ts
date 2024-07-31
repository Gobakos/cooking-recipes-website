import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiPath } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class TagService {
  constructor(public http: HttpClient) {}

  getTags(): Observable<any> {
    // Retrive all tags
    return this.http.get(ApiPath.HOST + ApiPath.GETTAGS);
  }

  getRecipesByTag(tagName: any): Observable<any> {
    // Retrive all recipes of a specific tag
    return this.http.get(
      ApiPath.HOST + ApiPath.GETRECIPESBYTAGS + "?tag_name=" + tagName
    );
  }
}
