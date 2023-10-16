export interface Today {
  _id: string;
  slug: string;
  userId: string;
  name: string;
  isActive: boolean;
  locationId: string;
  location: string;
  timeIn: number;
  timeOut: number;
  deviceId: string;
  batteryPercentage: number;
}
