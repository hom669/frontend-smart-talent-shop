import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  listOrders: Order[] = []
  idUser: any = null;

  constructor(private _orderService: OrderService, private _utilityService: UtilityService) {

  }

  ngOnInit(): void {
    this.setUser();
    this.getOrdersById();
  }

  getOrdersById() {
    this._orderService.getOrdersAll().subscribe(data => {
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
