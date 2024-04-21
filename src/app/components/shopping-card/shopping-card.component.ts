import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ShoppingCart } from '../../interfaces/shoppingCart';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { ErrorService } from '../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-shopping-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-card.component.html',
  styleUrl: './shopping-card.component.css'
})
export class ShoppingCardComponent {
  cartNow: ShoppingCart = {
    items: [],
    total: 0,
  };


  constructor(private _utilityService: UtilityService, private _cartService: CartService, private _orderService: OrderService, private router: Router, private _errorService: ErrorService, private toastr: ToastrService,) {

  }


  closeCart() {
    this._cartService.toggleShowCart()
  }

  ngOnInit(): void {
    this.cartNow = this._cartService.getCart();
  }

  removeProduct(productId: number) {
    this._cartService.removeProduct(productId)
    this._cartService.updateCartItemCount();
  }

  clearCart() {
    this._cartService.clearCart()
    this._cartService.updateCartItemCount();
  }

  buyCart(cart: ShoppingCart) {
    console.log(cart);
    this._orderService.createOrder(cart);

    this._orderService.createOrder(cart).subscribe({
      next: (v) => {
        this.toastr.success(`El Pedido fue registrado con exito`, 'Pedido Registrado', {
          positionClass: 'toast-top-right',
        })
        this._cartService.clearCart();
        this._cartService.updateCartItemCount();
        this.closeCart();
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      },
      complete: () => {
        console.info('Complete');
      }

    })

  }

  setMoneyFormat(numero: number): string {
    return this._utilityService.formatNumberWithSeparators(numero);
  }

}
