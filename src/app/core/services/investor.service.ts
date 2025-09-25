import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  private apiUrl = `${environment.apiUrl}/api/investors`;

  constructor(private http: HttpClient) {}

  getInvestorProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateInvestorProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  listInvestments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/investments`);
  }

  getInvestmentDetails(investmentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/investments/${investmentId}`);
  }

  makeInvestment(investmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/investments`, investmentData);
  }

  updateInvestment(investmentId: string, investmentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/investments/${investmentId}`, investmentData);
  }

  withdrawInvestment(investmentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/investments/${investmentId}`);
  }

  getPortfolioSummary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/portfolio`);
  }

  getInvestmentOpportunities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/opportunities`);
  }

  getInvestmentReturns(): Observable<any> {
    return this.http.get(`${this.apiUrl}/returns`);
  }
}
