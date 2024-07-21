import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from 'src/app/core/base-component/base.component';
import { ICreateShipmentDTO, IShipment, IShipmentItem } from 'src/app/core/models/warehouse-models';
import { WarehouseService } from 'src/app/core/services/warehouse.service';
import { DatePickerComponent } from "../../../core/ui/components/date-picker/date-picker.component";
import { ItemSummaryComponent } from "../list-shipment/item-summary/item-summary.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePickerComponent, ItemSummaryComponent],
  templateUrl: './shipment-form.component.html',
  styleUrls: ['./shipment-form.component.scss']
})
export class ShipmentFormComponent extends BaseComponent {

  shipmentForm = new FormGroup({
    companyName: new FormControl<string>('', { nonNullable: true }),
    scheduledDate: new FormControl<Date>(new Date()),
    items: new FormControl<IShipmentItem[]>([]),
    status: new FormControl<string>(''),
  });

  @Input()
  itemsToAdd: IShipmentItem[] = [];
  @Output() shipmentCreated = new EventEmitter<IShipment>();


  constructor(private warehouseService: WarehouseService) {
    super();
  }

  onDateChange(event: Date) {
    this.shipmentForm.get('scheduledDate')?.setValue(event);
  }
  createShipment(): void {
    const shipment: ICreateShipmentDTO = {
      companyName: this.shipmentForm.get('companyName')?.value!,
      scheduledDate: this.shipmentForm.get('scheduledDate')?.value!,
      items: this.itemsToAdd,
    }
    this.warehouseService.createShipment(shipment).subscribe(shipment => {
      this.shipmentCreated.emit(shipment);
      this.shipmentForm.reset();
    })
  }

}
