import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/environment';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiBaseUrl;
    this.myApiUrl = 'products'
  }

  getProducts(): Observable<Product[]> {
    // const token = localStorage.getItem("token");
    // const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    // Correct return statement and ensure you're fetching an array of Product
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  editProduct(product: Product) {
    return this.http.put(`${this.myAppUrl}${this.myApiUrl}/${product.id}`, product);
  }

  deleteProduct(producId: number) {
    return this.http.delete(`${this.myAppUrl}${this.myApiUrl}/${producId}`);
  }

  saveProduct(product: Product) {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, product);
  }
}
