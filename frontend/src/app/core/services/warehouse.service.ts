import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICreateShipmentDTO, IProduct, IShipment, IShipmentItem } from '../models/warehouse-models';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  itemsCache: IProduct[] = [];

  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // cannot make this a pipe, because pipe would need to reference this service to get cache
  //and would not retransform after changes
  transformItem(shipmentItem: IShipmentItem): IProduct | undefined {
    const foundItem = this.itemsCache.find(i => i.id === shipmentItem.productRef);
    if (foundItem) {
      return {...foundItem, quantity: shipmentItem.quantity, unitPrice: foundItem.unitPrice * shipmentItem.quantity};
    }
    return undefined;
  }

  fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.API_URL + '/products').pipe(tap( products => this.itemsCache = products));
  }


  fetchShipments(): Observable<IShipment[]> {
    return this.http.get<IShipment[]>(this.API_URL + '/shipments');
  }


  editShipment(updatedShipment: IShipment): Observable<IShipment> {
    return this.http.put<IShipment>(`${this.API_URL}/shipments/${updatedShipment.id}`, updatedShipment);
  }

  createShipment(shipment: ICreateShipmentDTO): Observable<IShipment> {
    return this.http.post<IShipment>(`${this.API_URL}/shipments`, shipment);
  }


  deleteShipment(id: string): Observable<IShipment> {
    return this.http.delete<IShipment>(`${this.API_URL}/shipments/${id}`);
  }
}
