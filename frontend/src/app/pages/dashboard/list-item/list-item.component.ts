import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct, IShipmentItem } from 'src/app/core/models/warehouse-models';


@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: IProduct;
  @Output() addToShipment: EventEmitter<IShipmentItem> = new EventEmitter<IShipmentItem>()

  constructor() { }
}
