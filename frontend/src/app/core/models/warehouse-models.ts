export interface IProduct {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
}

export interface IShipment extends ICreateShipmentDTO {
  id: string;
  created: Date;
  status: EShipmentStatus;
}
export interface ICreateShipmentDTO {
  companyName: string;
  scheduledDate: Date;
  items: IShipmentItem[];
}

export interface IShipmentItem {
  productRef: number;
  quantity: number;
}

export enum EShipmentStatus {
  CREATED = 'CREATED',
  PREPARED = 'PREPARED',
  SHIPPED = 'SHIPPED',
}
