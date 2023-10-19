import { z } from 'zod';

export const SchemaUpload = z.object({
  file: z.custom<File>((v) => v instanceof File, {
    message: 'File is required',
  }),
});

export type SchemaUploadType = z.infer<typeof SchemaUpload>;

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

export interface Tracking {
  device_id: string;
  elevation: string;
  datetime: number;
  latitude: string;
  longitude: string;
  battery_percentage: string;
  position: string;
}
