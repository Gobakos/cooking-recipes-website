import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  loginForm!: FormGroup; // Form group for login fields
  hide = true; // Flag to toggle password visibility

  constructor(
    public fb: FormBuilder, // FormBuilder service for creating forms
    public authService: AuthService, // Authentication service
    public storageService: StorageService, // Service for managing storage
    public router: Router // Router service for navigation
  ) {
    this.initForm(); // Initialize the login form
  }

  // Initialize the login form
  initForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  // Submit the login form
  submit() {
    // Call the login method from the authentication service
    this.authService.login(this.loginForm.value).subscribe({
      // Handle successful response
      next: (response) => {
        // Check if login is successful
        if (response.message == "Success") {
          console.log("Login from login.component OK");
          // Save access token to local storage
          this.storageService.saveToken(response.accessToken);
          // Navigate to home page
          this.router.navigate(["/home"]);
        } else {
          // If login fails, display error message
          Swal.fire({
            title: "Η σύνδεση απέτυχε!",
            text: response.message,
            icon: "error",
            confirmButtonText: "Προσπαθήστε ξανά",
          }).then(() => {
            // Reset the form
            this.initForm();
          });
        }
      },
      // Handle error response
      error: (error) => {
        // Display error message
        Swal.fire({
          title: "Η σύνδεση απέτυχε!",
          text: error.error.message,
          icon: "error",
          confirmButtonText: "Προσπαθήστε ξανά",
        }).then(() => {
          // Reset the form
          this.initForm();
        });
      },
    });
  }
}
