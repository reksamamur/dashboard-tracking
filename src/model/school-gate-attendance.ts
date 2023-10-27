import { z } from 'zod';

export const schoolGateAttendanceSchema = z.object({
  _id: z.string(),

  deviceId: z.string(),

  isActive: z.boolean(),

  dateTime: z.number(),

  gateInId: z.string(),
  gateInName: z.string(),
  timeIn: z.number(),
  latitudeIn: z.string(),
  longitudeIn: z.string(),

  gateOutId: z.string(),
  gateOutName: z.string(),
  timeOut: z.number(),
  latitudeOut: z.string(),
  longitudeOut: z.string(),
});

export type SchoolGateAttendance = z.infer<typeof schoolGateAttendanceSchema>;
