import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCart } from '../interfaces/shoppingCart';
import { CartItem } from '../interfaces/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ShoppingCart = {
    items: [],
    total: 0,
  };

  private showCart: boolean = false;

  private cartSubject = new BehaviorSubject<ShoppingCart>(this.cart);
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private showCartSubject = new BehaviorSubject<boolean>(this.showCart);

  // Observable para suscribirse a los cambios en el carrito
  public cartObservable = this.cartSubject.asObservable();
  public cartItemCountObservable = this.cartItemCountSubject.asObservable();
  public showCartObservable = this.showCartSubject.asObservable();

  constructor() {
    this.loadCartFromLocalStorage(); // Cargar carrito desde localStorage al iniciar
    this.updateCartItemCount();
  }

  // Método para agregar un producto al carrito
  addProduct(productId: number, productName: string, unitPrice: number, quantity: number, description: string, image: string) {
    const existingItem = this.cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice += unitPrice * quantity;
    } else {
      const newItem: CartItem = {
        productId,
        productName,
        unitPrice,
        quantity,
        description,
        image,
        totalPrice: unitPrice * quantity,
      };
      this.cart.items.push(newItem);
    }

    this.updateCartTotal();
    this.saveCartToLocalStorage(); // Guardar el carrito después de agregar
  }

  // Método para obtener el carrito actual
  getCart(): ShoppingCart {
    return this.cart;
  }

  // Método para eliminar un producto del carrito
  removeProduct(productId: number) {
    this.cart.items = this.cart.items.filter((item) => item.productId !== productId);
    this.updateCartTotal();
    this.saveCartToLocalStorage(); // Guardar el carrito después de eliminar
  }

  // Método para obtener el estado de showCart
  getShowCart(): boolean {
    return this.showCart;
  }

  // Método para cambiar el estado de showCart
  toggleShowCart(): void {
    this.showCart = !this.showCart;
    this.showCartSubject.next(this.showCart); // Notificar a los suscriptores
  }

  clearCart() {
    // Método para limpiar todos los elementos del carrito
    this.cart.items = [];
    this.cart.total = 0;

    // Notificar a los suscriptores y guardar cambios
    this.cartSubject.next(this.cart);
    this.saveCartToLocalStorage();
  }

  // Método para calcular el total del carrito
  private updateCartTotal() {
    this.cart.total = this.cart.items.reduce((total, item) => total + item.totalPrice, 0);
    this.cartSubject.next(this.cart);
  }

  // Actualiza el número total de elementos en el carrito
  public updateCartItemCount() {
    const itemCount = this.cart.items.reduce((count, item) => count + item.quantity, 0);
    this.cartItemCountSubject.next(itemCount); // Actualiza el Observable
  }

  // Método para guardar el carrito en localStorage
  private saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }

  // Método para cargar el carrito desde localStorage
  private loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.cartSubject.next(this.cart); // Notificar a los suscriptores del nuevo carrito cargado
      this.updateCartItemCount(); // Actualizar el conteo de elementos cuando se carga
    }
  }

  private removeCartFromLocalStorage() {
    localStorage.removeItem('shoppingCart');
  }
}
