import { OrderService } from './../../../services/order/order.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders$!: Observable<Order[]>;

  constructor(private orderService: OrderService) {
    this.orders$ = this.orderService.getOrders();
  }
}
