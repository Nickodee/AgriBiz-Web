import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/api/notifications`;

  constructor(private http: HttpClient) {}

  // Get notifications
  listNotifications(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getNotificationDetails(notificationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${notificationId}`);
  }

  // Mark notifications as read
  markAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
  }

  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/read-all`, {});
  }

  // Delete notifications
  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${notificationId}`);
  }

  clearAllNotifications(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear-all`);
  }

  // Notification preferences
  getNotificationPreferences(): Observable<any> {
    return this.http.get(`${this.apiUrl}/preferences`);
  }

  updateNotificationPreferences(preferences: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences`, preferences);
  }

  // Subscribe/Unsubscribe from notification types
  subscribeToNotificationType(type: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/subscribe/${type}`, {});
  }

  unsubscribeFromNotificationType(type: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/unsubscribe/${type}`, {});
  }
}
