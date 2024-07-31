import { Injectable } from "@angular/core";

const TOKEN_KEY = "TOKEN_KEY";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  saveToken(token: any) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  clear() {
    window.localStorage.clear();
  }
}
