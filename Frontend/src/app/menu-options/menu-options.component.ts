import { Component, EventEmitter, Input, Output } from "@angular/core";
import { StorageService } from "../services/storage.service";
import { Router } from "@angular/router";

@Component({
  selector: "menu-options",
  templateUrl: "./menu-options.component.html",
  styleUrl: "./menu-options.component.scss",
})
export class MenuOptionsComponent {
  @Input({ required: true }) categories: any; // Input: Categories data
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>(); // Output: Emit button click event

  constructor(public storageService: StorageService, public router: Router) {}

  // Handle button click event
  onButtonClick() {
    this.buttonClick.emit();
  }

  // Handle logout action
  onLogout() {
    this.storageService.clear(); // Clear storage data
    this.router.navigateByUrl(""); // Navigate to home page
    console.log("onLogout() from menu-options-component OK");
  }
}
