import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  private apiUrl = `${environment.apiUrl}/api/farmers`;

  constructor(private http: HttpClient) {}

  getFarmerProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  updateFarmerProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, profileData);
  }

  listFarms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/farms`);
  }

  getFarmDetails(farmId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/farms/${farmId}`);
  }

  addFarm(farmData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/farms`, farmData);
  }

  updateFarm(farmId: string, farmData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/farms/${farmId}`, farmData);
  }

  deleteFarm(farmId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/farms/${farmId}`);
  }

  listCrops(farmId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/farms/${farmId}/crops`);
  }

  addCrop(farmId: string, cropData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/farms/${farmId}/crops`, cropData);
  }

  updateCrop(farmId: string, cropId: string, cropData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/farms/${farmId}/crops/${cropId}`, cropData);
  }

  deleteCrop(farmId: string, cropId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/farms/${farmId}/crops/${cropId}`);
  }
}
