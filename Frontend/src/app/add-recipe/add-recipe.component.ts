import { Component, ElementRef, ViewChild, inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormControl,
  FormArray,
  FormGroup,
} from "@angular/forms";
import { RecipeService } from "../services/recipe.service";
import Swal from "sweetalert2";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-recipe",
  templateUrl: "./add-recipe.component.html",
  styleUrl: "./add-recipe.component.scss",
})
export class AddRecipeComponent {
  addrecipeForm: FormGroup; // Form group for recipe fields

  // Categories Field
  categories: any[] = []; // List of categories
  selected_category: any; // Selected category
  selected_subcategory: any; // Selected subcategory

  // Measure Field
  descriptions: any[] = []; // List of measurement descriptions
  @ViewChild("measureInput") measureInput!: ElementRef<HTMLInputElement>; // Reference to measurement input field
  measureFilteredOptions: any; // Filtered measurement options

  // Ingredient Field
  ingredientList: any[] = []; // List of ingredients
  @ViewChild("ingredientInput") ingredientInput!: ElementRef<HTMLInputElement>; // Reference to ingredient input field
  ingredientsFilteredOptions: any; // Filtered ingredient options

  // Tag Field
  tagControl = new FormControl(""); // Form control for tags
  filteredTags: any; // Filtered tag options
  selectedTags: string[] = []; // Selected tags
  tagsList: any[] = []; // List of tags
  @ViewChild("tagInput") tagInput!: ElementRef<HTMLInputElement>; // Reference to tag input field
  announcer = inject(LiveAnnouncer); // Announcer for accessibility

  // Photo Field
  photoData!: File; // Uploaded photo data
  fileExtension!: string; // Photo file extension

  // Edit Recipe
  recipe: any; // Recipe object

  constructor(
    public fb: FormBuilder, // FormBuilder service for creating forms
    public recipeService: RecipeService, // Recipe service for managing recipes
    public activatedroute: ActivatedRoute, // ActivatedRoute for retrieving route information
    public router: Router // Router for navigation
  ) {
    // Retrieve data from route resolver
    this.activatedroute.data.subscribe((res: any) => {
      this.categories = res.data.categories; // Assign categories data
      this.selected_category = ""; // Initialize selected category
      this.selected_subcategory = ""; // Initialize selected subcategory

      this.descriptions = res.data.descriptions; // Initialize measurement descriptions
      this.measureFilteredOptions = this.descriptions; // Initialize filtered measurement options

      this.ingredientList = res.data.ingredients; // Initialize ingredients data
      this.ingredientsFilteredOptions = this.ingredientList; // Initialize filtered ingredient options

      this.tagsList = res.data.tags; // Initialize tags data
      this.filteredTags = this.tagsList; // Initialize filtered tag options
    });

    // Initialize the form with FormBuilder
    this.addrecipeForm = this.fb.group({
      titlo: [null, Validators.required],
      category: [null, Validators.required],
      subcategory: [null],
      level: [null, Validators.required],
      recipe_portion: [null, Validators.required],
      time_create: [null, Validators.required],
      time_prepare: [null, Validators.required],
      ingredients: this.fb.array([], Validators.required),
      perigrafh: [null, Validators.required],
      tags: this.fb.array([], Validators.required),
      photo: ["", Validators.required],
    });

    // If in edit mode, pre-fill the form with recipe data
    if (this.activatedroute.snapshot.url[0].path == "editrecipe") {
      const id = this.activatedroute.snapshot.paramMap.get("id");
      if (id) {
        this.recipeService.getRecipe(id).subscribe((response: any) => {
          this.recipe = response; // Initialize edit recipe

          // Find and assign selected category based on recipe data
          this.selected_category = this.categories.find(
            (x) => x.category_name == response.category.category_name
          );

          // Set form values with recipe data
          this.addrecipeForm.setValue({
            titlo: response.recipe_title,
            category: this.selected_category,
            subcategory: response.subcategory?.subcategory_name || null,
            level: response.level,
            recipe_portion: response.recipe_portion,
            time_create: response.recipe_time_create,
            time_prepare: response.recipe_time_prepare,
            ingredients: [],
            perigrafh: response.recipe_description,
            tags: [],
            photo: null,
          });

          this.addrecipeForm.get("photo")?.clearValidators();
          this.addrecipeForm.get("photo")?.updateValueAndValidity(); // Remove photo control from form

          // Add each ingredient from recipe data to form array
          response.ingredients.forEach((element: any) => {
            const ingredientForm = this.fb.group({
              quantity: [element.recipe_ingredients.quantity],
              description: [element.recipe_ingredients.description],
              ingredient_name: [element.ingredient_name],
            });
            this.ingredients.push(ingredientForm); // Push ingredient form group to form array
          });

          // Add each tag from recipe data to form array
          response.tags.forEach((element: any) => {
            const tagForm = this.fb.group({
              tag_name: [element.tag_name],
            });
            this.tags.push(tagForm); // Push tag form group to form array
            this.selectedTags.push(element.tag_name); // Push tag name to selected tags array
          });
        });
      }
    }
  }

  // Getter for ingredients form array
  get ingredients() {
    return this.addrecipeForm.controls["ingredients"] as FormArray;
  }

  // Add a new ingredient form group to the form array
  addIngredient() {
    const ingredientForm = this.fb.group({
      quantity: [null, Validators.required],
      description: [null, Validators.required],
      ingredient_name: [null, Validators.required],
    });

    this.ingredients.push(ingredientForm); // Push new ingredient form group to form array
  }

  // Delete an ingredient form group from the form array
  deleteIngredient(ingredientIndex: number) {
    this.ingredients.removeAt(ingredientIndex); // Remove ingredient form group at specified index
  }

  // Filter measure options based on user input
  measureFilter(input: HTMLInputElement): void {
    const filterValue = input.value.toLowerCase(); // Convert input value to lowercase for case-insensitive filtering
    // Filter measurement options based on description containing input value
    this.measureFilteredOptions = this.descriptions.filter((m: any) =>
      m.description.toLowerCase().includes(filterValue)
    );
  }

  // Filter ingredient options based on user input
  ingredientsFilter(input: HTMLInputElement): void {
    const filterValue = input.value.toLowerCase(); // Convert input value to lowercase for case-insensitive filtering
    // Filter ingredient options based on name containing input value
    this.ingredientsFilteredOptions = this.ingredientList.filter((i: any) =>
      i.ingredient_name.toLowerCase().includes(filterValue)
    );
  }

  // Getter for tags form array
  get tags() {
    return this.addrecipeForm.controls["tags"] as FormArray;
  }

  // Remove a tag from the selected tags
  remove(tag: any): void {
    const index = this.selectedTags.indexOf(tag); // Get index of tag in selected tags array

    if (index >= 0) {
      this.selectedTags.splice(index, 1); // Remove tag from selected tags array
      this.tags.removeAt(index); // Remove tag form group from tags form array
      this.announcer.announce(`Removed ${tag}`); // Announce tag removal for accessibility
    }
  }

  // Handle selection of a tag
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedTags.push(event.option.value); // Push selected tag to selected tags array
    const tagForm = this.fb.group({
      tag_name: [event.option.value, Validators.required],
    });
    this.tags.push(tagForm); // Push new tag form group to tags form array
    this.tagInput.nativeElement.value = ""; // Clear tag input field value
    this.tagControl.setValue(null); // Reset tag control value
  }

  // Filter tags based on user input
  tagsFilter(input: HTMLInputElement): void {
    // Return if input element is not provided
    if (!input) return;

    const filterValue = input.value.toLowerCase(); // Convert input value to lowercase for case-insensitive filtering
    // Filter tags based on name containing input value
    this.filteredTags = this.tagsList.filter((t: any) =>
      t.tag_name.toLowerCase().includes(filterValue)
    );
  }

  // Handle file selection for photo upload
  onFileSelect(event: any) {
    this.photoData = event.target.files[0]; // Get selected file data
    this.fileExtension = this.photoData.name.split(".").pop()!; // Extract file extension
  }

  // Submit the form data
  submit() {
    // Check if the form is for editing a recipe
    if (this.activatedroute.snapshot.url[0].path == "editrecipe") {
      let object = this.addrecipeForm.value; // Get form data
      object.recipe_id = this.recipe.recipe_id; // Add recipe ID to form data

      // Send edited recipe data to the server
      this.recipeService.editRecipe(object).subscribe({
        next: (response) => {
          // If a photo is selected, upload it to the server
          if (this.photoData) {
            this.recipeService
              .uploadRecipePhoto(
                this.photoData,
                this.recipe.recipe_id,
                this.fileExtension
              )
              .subscribe((res) => {
                console.log("Photo uploaded!"); // Log success message
              });
          }
          Swal.fire({
            title: "Η ενημέρωση ολοκληρώθηκε επιτυχώς!",
            icon: "success",
            confirmButtonText: "ΟΚ",
          }).then((result: any) => {
            if (result.isConfirmed) {
              // Redirect user to the list of their recipes
              this.router.navigate(["/myrecipes"]);
            }
          });
        },
        error: (error) => {
          // Notify user if editing fails
          Swal.fire({
            title: "Η επεξεργασία της συνταγής απέτυχε!",
            text: error.error.message,
            icon: "error",
            confirmButtonText: "Προσπαθήστε ξανά",
          });
        },
      });
    } else {
      // Send new recipe data to the server
      this.recipeService.addRecipe(this.addrecipeForm.value).subscribe({
        next: (response) => {
          console.log("Recipe added!"); // Log success message
          // If a photo is selected, upload it to the server
          if (this.photoData) {
            this.recipeService
              .uploadRecipePhoto(
                this.photoData,
                response.recipe_id,
                this.fileExtension
              )
              .subscribe((res) => {
                console.log("Photo uploaded!"); // Log success message
              });
          }
          // Redirect user to the list of their recipes
          this.router.navigate(["/myrecipes"]);
        },
        error: (error) => {
          // Notify user if recipe addition fails
          Swal.fire({
            title: "Η προσθηκη της συνταγής απέτυχε!",
            text: error.error.message,
            icon: "error",
            confirmButtonText: "Προσπαθήστε ξανά",
          });
        },
      });
    }
  }
}
