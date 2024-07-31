import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "register",
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  registerForm!: FormGroup; // Form group for register fields
  hide = true; // Flag to toggle password visibility

  constructor(
    public fb: FormBuilder, // FormBuilder service for creating forms
    public authService: AuthService, // Authentication service
    public router: Router // Router service for navigation
  ) {
    this.initForm(); // Initialize the login form
  }

  // Initialize the login form
  initForm() {
    this.registerForm = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }

  // Submit the register form
  submit() {
    // Call the register method from the authentication service
    this.authService.register(this.registerForm.value).subscribe({
      // Handle successful response
      next: (response) => {
        // Check if register is successful
        if (response.message == "User registered!") {
          console.log("Register from register.component OK");
          Swal.fire({
            title: "Η εγγραφή ολοκληρώθηκε επιτυχώς!",
            icon: "success",
            confirmButtonText: "Σύνδεση",
          }).then((result: any) => {
            if (result.isConfirmed) {
              // Navigate to login page
              this.router.navigate(["/login"]);
            }
          });
        } else {
          // If register fails, display error message
          Swal.fire({
            title: "Η εγγραφή απέτυχε!",
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
          title: "Η εγγραφή απέτυχε!",
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
