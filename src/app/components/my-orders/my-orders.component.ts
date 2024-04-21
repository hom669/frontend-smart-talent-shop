import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  listOrders: Order[] = []
  idUser: any = null;

  constructor(private _orderService: OrderService, private _utilityService: UtilityService) {

  }

  ngOnInit(): void {
    this.setUser();
    this.getOrdersById();
  }

  getOrdersById() {
    this._orderService.getOrders(this.idUser).subscribe(data => {
      this.listOrders = data;

    })
  }

  setUser() {
    const user = localStorage.getItem("user");
    this.idUser = user;

  }

  setDateFormat(dateString: string): string {
    return this._utilityService.extractDateFromTimestamp(dateString);
  }

  setMoneyFormat(numero: number): string {
    return this._utilityService.formatNumberWithSeparators(numero);
  }
}
