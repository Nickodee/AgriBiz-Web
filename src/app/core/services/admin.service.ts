import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/api/admin`;

  constructor(private http: HttpClient) {}

  // User Management
  listUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUserStatus(userId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/status`, { status });
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // Analytics and Reports
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/stats`);
  }

  getTransactionReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/transactions`, {
      params: { startDate, endDate }
    });
  }

  getUserActivityReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports/user-activity`, {
      params: { startDate, endDate }
    });
  }

  // Content Management
  listContent(): Observable<any> {
    return this.http.get(`${this.apiUrl}/content`);
  }

  updateContent(contentId: string, contentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/content/${contentId}`, contentData);
  }

  // System Settings
  getSystemSettings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/settings`);
  }

  updateSystemSettings(settings: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/settings`, settings);
  }

  // Verification Management
  listPendingVerifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/verifications/pending`);
  }

  approveVerification(verificationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/verifications/${verificationId}/approve`, {});
  }

  rejectVerification(verificationId: string, reason: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/verifications/${verificationId}/reject`, { reason });
  }

  // Support Tickets
  listSupportTickets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/support-tickets`);
  }

  getSupportTicketDetails(ticketId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/support-tickets/${ticketId}`);
  }

  updateTicketStatus(ticketId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/support-tickets/${ticketId}/status`, { status });
  }

  respondToTicket(ticketId: string, response: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/support-tickets/${ticketId}/responses`, { response });
  }
}
