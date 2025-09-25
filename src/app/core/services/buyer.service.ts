import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {
  private apiUrl = `${environment.apiUrl}/api/buyers`;

  constructor(private http: HttpClient) {}

  getBuyerProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateBuyerProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  listOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/${orderId}`);
  }

  placeOrder(orderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, orderData);
  }

  updateOrder(orderId: string, orderData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}`, orderData);
  }

  cancelOrder(orderId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}`);
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`, {
      params: { search: query }
    });
  }

  getProductDetails(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  listFavorites(): Observable<any> {
    return this.http.get(`${this.apiUrl}/favorites`);
  }

  addToFavorites(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, { productId });
  }

  removeFromFavorites(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${productId}`);
  }
}
