import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/api/products`;

  constructor(private http: HttpClient) {}

  // Product Listings
  listProducts(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  getProductDetails(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}`);
  }

  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }

  // Product Categories
  listCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getCategoryDetails(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${categoryId}`);
  }

  // Product Reviews
  listProductReviews(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}/reviews`);
  }

  addProductReview(productId: string, reviewData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${productId}/reviews`, reviewData);
  }

  // Product Images
  uploadProductImage(productId: string, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post(`${this.apiUrl}/${productId}/images`, formData);
  }

  deleteProductImage(productId: string, imageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}/images/${imageId}`);
  }

  // Product Search
  searchProducts(query: string, filters?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, {
      params: { query, ...filters }
    });
  }

  // Product Availability
  checkAvailability(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}/availability`);
  }

  updateAvailability(productId: string, availabilityData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}/availability`, availabilityData);
  }

  // Product Pricing
  updatePricing(productId: string, pricingData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}/pricing`, pricingData);
  }

  // Product Analytics
  getProductAnalytics(productId: string, dateRange?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${productId}/analytics`, {
      params: dateRange
    });
  }
}
