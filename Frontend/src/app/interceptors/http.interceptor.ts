import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService, public router: Router) {}

  // Intercept method to intercept HTTP requests
  intercept(
    req: HttpRequest<any>, // Incoming HTTP request
    next: HttpHandler // Handler for the next interceptor in the chain
  ): Observable<HttpEvent<any>> {
    // Observable that emits HTTP events
    const token = this.storageService.getToken(); // Get token from storage service
    if (token != null) {
      // If token is not null
      req = this.addTokenHeader(req, token); // Add token to request headers
    }

    // Handle the request and response
    return next.handle(req).pipe(
      catchError((error) => {
        // Catch errors
        if (error.status === 401) {
          // If unauthorized error
          this.storageService.clear(); // Clear storage
          location.reload(); // Reload page
          this.router.navigate(["/login"]); // Navigate to login page
        }
        return throwError(() => error); // Return error
      })
    );
  }

  // Method to add token to request headers
  addTokenHeader(req: any, token: string) {
    return req.clone({ headers: req.headers.set("accesstoken", token) });
  }
}

// Provider for HTTP interceptor
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
