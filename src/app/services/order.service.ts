import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroment/environment';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { ShoppingCart } from '../interfaces/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.apiBaseUrl;
    this.myApiUrl = 'orders'
  }

  getOrders(idUser: number): Observable<Order[]> {
    // const token = localStorage.getItem("token");
    // const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    // Correct return statement and ensure you're fetching an array of Product
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}/${idUser}`);
  }

  getOrdersAll(): Observable<Order[]> {
    // const token = localStorage.getItem("token");
    // const headers = new HttpHeaders().set('authorization', `Bearer ${token}`);
    // Correct return statement and ensure you're fetching an array of Product
    return this.http.get<Order[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  createOrder(cart: ShoppingCart) {
    const userString = localStorage.getItem("user");

    // Verificar si se puede convertir a número
    const userId = userString ? parseInt(userString, 10) : undefined;

    if (userId !== undefined) {
      cart.idUser = userId;
    } else {
      // Manejar el error, por ejemplo, arrojando una excepción
      throw new Error("El usuario no está definido en localStorage.");
    }

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, cart);
  }
}
