import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './farmer.component.html',
  styleUrl: './farmer.component.css'
})
export class FarmerComponent {
  farmerData = {
    fullName: '',
    email: '',
    phone: '',
    farmName: '',
    farmLocation: '',
    farmSize: '',
    farmingType: '',
    crops: [] as string[],
    experience: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  constructor(private router: Router) {}

  onCropChange(event: any) {
    const cropValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add crop to array if not already present
      if (!this.farmerData.crops.includes(cropValue)) {
        this.farmerData.crops.push(cropValue);
      }
    } else {
      // Remove crop from array
      const index = this.farmerData.crops.indexOf(cropValue);
      if (index > -1) {
        this.farmerData.crops.splice(index, 1);
      }
    }
  }

  onSubmit() {
    if (this.validateForm()) {
      console.log('Farmer registration data:', this.farmerData);

      // Here you would typically call your authentication service
      // For now, we'll just show a success message and redirect
      alert('Farmer registration successful! Please check your email for verification.');

      // Redirect to login page
      this.router.navigate(['/login']);
    }
  }

  private validateForm(): boolean {
    // Check if passwords match
    if (this.farmerData.password !== this.farmerData.confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }

    // Check password strength (basic validation)
    if (this.farmerData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return false;
    }

    // Check if at least one crop is selected
    if (this.farmerData.crops.length === 0) {
      alert('Please select at least one crop/product that you grow!');
      return false;
    }

    // Check if terms are accepted
    if (!this.farmerData.terms) {
      alert('Please accept the terms and conditions!');
      return false;
    }

    return true;
  }
}
