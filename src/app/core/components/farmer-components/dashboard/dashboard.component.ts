import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
  nationalId: string | null;
  address: string | null;
  phoneNumber: string | null;
  bio: string | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: UserData | null = null;

  ngOnInit() {
    this.loadUserData();
  }

  private loadUserData() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.userData = JSON.parse(userString);
    }
  }
}
