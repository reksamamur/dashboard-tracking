import { z } from 'zod';

export const emergencySchema = z.object({
  _id: z.string(),

  dateTime: z.number(),

  deviceId: z.string(),

  latitude: z.string(),
  longitude: z.string(),

  emergencyId: z.string(),
  emergencyPosition: z.string(),

  timeInEmergency: z.number(),
  timeOutEmergency: z.number(),
});

export type Emergency = z.infer<typeof emergencySchema>;
