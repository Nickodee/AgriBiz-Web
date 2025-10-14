import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Profile {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface Business {
  name: string;
  type: 'individual' | 'cooperative' | 'company';
  registrationNumber: string;
  taxId: string;
}

interface NotificationSettings {
  email: boolean;
  sms: boolean;
  marketing: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  twoFactor: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SettingsComponent implements OnInit {
  profile: Profile = {
    avatar: '',
    name: '',
    email: '',
    phone: '',
    location: ''
  };

  business: Business = {
    name: '',
    type: 'individual',
    registrationNumber: '',
    taxId: ''
  };

  notifications: NotificationSettings = {
    email: true,
    sms: true,
    marketing: false
  };

  security: SecuritySettings = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactor: false
  };

  constructor() {}

  ngOnInit(): void {
    // TODO: Load user settings from a service
    this.loadUserSettings();
  }

  uploadAvatar(): void {
    // TODO: Implement file upload functionality
    console.log('Upload avatar clicked');
  }

  changePassword(): void {
    if (this.security.newPassword !== this.security.confirmPassword) {
      // TODO: Show error message
      console.error('Passwords do not match');
      return;
    }

    // TODO: Implement password change logic
    console.log('Changing password...');
  }

  saveChanges(): void {
    // TODO: Implement save functionality
    console.log('Saving changes...');
    console.log({
      profile: this.profile,
      business: this.business,
      notifications: this.notifications,
      security: this.security
    });
  }

  resetChanges(): void {
    // TODO: Implement reset functionality
    this.loadUserSettings();
  }

  private loadUserSettings(): void {
    // TODO: Load settings from a service
    // For now, loading mock data
    this.profile = {
      avatar: 'assets/default-avatar.png',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+254 123 456 789',
      location: 'Nairobi, Kenya'
    };

    this.business = {
      name: 'Doe Farms',
      type: 'individual',
      registrationNumber: 'BUS123456',
      taxId: 'TAX987654'
    };
  }
}
