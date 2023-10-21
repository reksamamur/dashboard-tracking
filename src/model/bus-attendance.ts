import { z } from 'zod';

export const bustAttendanceSchema = z.object({
  _id: z.string(),

  timeIn: z.string(),
  timeOut: z.string(),

  tripId: z.string(),
  routeId: z.string(),

  vehicleId: z.string(),

  dateTime: z.number(),

  isActive: z.boolean(),

  latitude: z.string(),
  longitude: z.string(),

  directionId: z.string(),
  directionName: z.string(),

  tripStartTime: z.string(),
  tripEndTime: z.string(),
});

export type BusAttendance = z.infer<typeof bustAttendanceSchema>;