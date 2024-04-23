import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ShoppingCardComponent } from '../shopping-card/shopping-card.component';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { AdminProductsComponent } from '../admin-products/admin-products.component';
import { UtilityService } from '../../services/utility.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ShoppingCardComponent, AdminProductsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public isAdmin: boolean = false;
  public listProduct: Product[] = [];
  public productQuantities: { [key: number]: number } = {};
  public showShoppingCart: boolean = false;
  public cartSubscription: Subscription | null = null;
  public filteredProducts: Product[] = [];
  public searchSubscription: Subscription | null = null;

  constructor(private toastr: ToastrService, private _productService: ProductService, private _cartService: CartService, private _searchService: SearchService, private _utilityService: UtilityService) {

  }

  getProductQuantity(productId: number): number {
    return this.productQuantities[productId] ?? 1; // Si no está definido, devuelve 0
  }

  onQuantityChange(productId: number, value: string) {
    const quantity = parseInt(value, 10); // Convertir a número entero
    if (!isNaN(quantity)) {
      this.productQuantities[productId] = quantity; // Guardar la cantidad
    }
  }

  addToCart(product: Product) {
    const quantity = this.getProductQuantity(product.id);
    if (quantity > 0) { // Asegurarse de que la cantidad sea mayor que 0
      this._cartService.addProduct(product.id, product.name, product.price, quantity, product.description, product.image); // Agregar al carrito
      this.productQuantities[product.id] = 1; // Resetear la cantidad
    }

    const cartNow = this._cartService.getCart();
    this._cartService.updateCartItemCount();

    this.toastr.success(`El producto ${product.name} por (${quantity}) fue agregado con exito`, 'Revise su Carrito')

  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
      this.filteredProducts = data;

    })

  }

  verifyAdmin() {
    const profile = localStorage.getItem("profile");
    profile === 'Administrador' ? this.isAdmin = true : this.isAdmin = false;

  }

  ngOnInit(): void {
    this.getProducts();
    this.verifyAdmin();
    // Suscribirse al observable showCart
    this.cartSubscription = this._cartService.showCartObservable.subscribe((showCart) => {
      this.showShoppingCart = showCart; // Actualiza el estado del carrito
    });

    this.searchSubscription = this._searchService.searchTermObservable.subscribe((term) => {
      console.log(term)
      if (term) {
        this.filteredProducts = this.listProduct.filter((product) => {
          return product.name.toLowerCase().includes(term.toLowerCase());
        });
      } else {
        this.filteredProducts = this.listProduct;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe(); // Desuscribirse para evitar memory leaks
    }
  }

  setMoneyFormat(numero: number): string {
    return this._utilityService.formatNumberWithSeparators(numero);
  }

}
