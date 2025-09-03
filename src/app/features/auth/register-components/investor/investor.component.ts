import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investor',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './investor.component.html',
  styleUrl: './investor.component.css'
})
export class InvestorComponent {
  investorData = {
    fullName: '',
    email: '',
    phone: '',
    investmentType: '',
    investmentRange: '',
    sectors: [],
    password: '',
    confirmPassword: '',
    terms: false
  };

  onSubmit() {
    console.log('Form submitted:', this.investorData);
    // Add your form submission logic here
  }
}
