import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IShipment } from 'src/app/core/models/warehouse-models';
import { ItemSummaryComponent } from './item-summary/item-summary.component';

@Component({
  selector: 'app-list-shipment',
  standalone: true,
  imports: [CommonModule, ItemSummaryComponent],
  templateUrl: './list-shipment.component.html',
  styleUrls: ['./list-shipment.component.scss']
})
export class ListShipmentComponent {
  @Input() shipments: IShipment[] = [];
  @Output() addToShipment: EventEmitter<void> = new EventEmitter<void>()

  constructor() { }
}
