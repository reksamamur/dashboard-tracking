import { z } from 'zod';

export const classroomAttendanceSchema = z.object({
  _id: z.string(),

  deviceId: z.string(),

  isActive: z.boolean(),

  dateTime: z.number(),

  classroomId: z.string(),
  classroomName: z.string(),
  timeIn: z.number(),
  latitudeIn: z.string(),
  longitudeIn: z.string(),
  timeOut: z.number(),
  latitudeOut: z.string(),
  longitudeOut: z.string(),
});

export type ClassroomAttendance = z.infer<typeof classroomAttendanceSchema>;
