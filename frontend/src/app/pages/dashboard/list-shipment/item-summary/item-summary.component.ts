import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IProduct, IShipmentItem } from 'src/app/core/models/warehouse-models';
import { WarehouseService } from 'src/app/core/services/warehouse.service';

@Component({
  selector: 'app-item-summary',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.scss']
})
export class ItemSummaryComponent {

  internalItem?: IProduct;
  @Input() set item(value: IShipmentItem) {
    this.internalItem = this.warehouseService.transformItem(value);
  } 

  constructor(private warehouseService: WarehouseService) { }

}
