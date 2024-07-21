import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from "./list-item/list-item.component";
import { ICreateShipmentDTO, IProduct, IShipment, IShipmentItem } from "../../core/models/warehouse-models";
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { BaseComponent } from 'src/app/core/base-component/base.component';
import { ListShipmentComponent } from './list-shipment/list-shipment.component';
import { ShipmentFormComponent } from './shipment-form/shipment-form.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ListItemComponent, ListShipmentComponent, ShipmentFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  items: IProduct[] = [];
  shipments: IShipment[] = [];
  itemsToAdd: IShipmentItem[] = [];

  constructor(private warehouseService: WarehouseService) {
    super();
  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.warehouseService.fetchProducts().subscribe(
        products => { this.items = products; }
      )
    );
    this.subscriptions.push(
      this.warehouseService.fetchShipments().subscribe(
        shipments => { this.shipments = shipments; }
      )
    );
  }

  onShipmentCreated(shipment: IShipment): void {
    this.shipments.push(shipment);
  }
  onAddToShipment(item: IShipmentItem) {
    const existingItemIndex = this.itemsToAdd.findIndex(i => i.productRef === item.productRef);
    if (existingItemIndex > -1) {
      this.itemsToAdd[existingItemIndex] = {
        productRef: item.productRef,
        quantity: this.itemsToAdd[existingItemIndex].quantity + 1,
      }
    } else {
      this.itemsToAdd.push(item);
    }
  }

}
