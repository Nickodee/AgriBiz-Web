import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = `${environment.apiUrl}/api/transactions`;

  constructor(private http: HttpClient) {}

  // Transaction Operations
  listTransactions(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getTransactionDetails(transactionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${transactionId}`);
  }

  createTransaction(transactionData: any): Observable<any> {
    return this.http.post(this.apiUrl, transactionData);
  }

  updateTransactionStatus(transactionId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}/status`, { status });
  }

  // Payment Processing
  initiatePayment(transactionId: string, paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${transactionId}/payments`, paymentData);
  }

  confirmPayment(transactionId: string, paymentId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}/payments/${paymentId}/confirm`, {});
  }

  // Transaction History
  getUserTransactionHistory(userId: string, params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}/history`, { params });
  }

  // Transaction Analytics
  getTransactionAnalytics(dateRange?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/analytics`, {
      params: dateRange
    });
  }

  // Refunds
  initiateRefund(transactionId: string, refundData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${transactionId}/refunds`, refundData);
  }

  getRefundStatus(transactionId: string, refundId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${transactionId}/refunds/${refundId}`);
  }

  // Transaction Reports
  generateTransactionReport(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/reports`, { params });
  }

  // Invoice Management
  generateInvoice(transactionId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${transactionId}/invoice`);
  }

  // Transaction Notifications
  getTransactionNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}/notifications`);
  }

  markNotificationAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${notificationId}/read`, {});
  }

  // Dispute Management
  createDispute(transactionId: string, disputeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${transactionId}/disputes`, disputeData);
  }

  getDisputeDetails(transactionId: string, disputeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${transactionId}/disputes/${disputeId}`);
  }

  updateDisputeStatus(transactionId: string, disputeId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transactionId}/disputes/${disputeId}/status`, { status });
  }
}
