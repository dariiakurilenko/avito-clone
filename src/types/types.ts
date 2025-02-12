export interface Item {
    id: number;
    name: string;
    description: string;
    location: string;
    type?: string;
    propertyType?: string;
    area?: number;
    rooms?: number;
    price?: number;
    brand?: string;
    model?: string;
    year?: number;
    mileage?: number;
    serviceType?: string;
    experience?: number;
    cost?: number;
    workSchedule?: string;
  }

  export interface CardType {
    id: number;
    name: string;
    location: string;
    type?: string;
    price?: number;
    cost?: number;
  }