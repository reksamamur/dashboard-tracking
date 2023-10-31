import { z } from 'zod';

export const libraryAttendanceSchema = z.object({
  _id: z.string(),

  deviceId: z.string(),

  isActive: z.boolean(),

  dateTime: z.number(),

  libraryId: z.string(),
  libraryName: z.string(),
  libraryPosition: z.string(),
  elevation: z.string(),

  timeIn: z.number(),
  timeOut: z.number(),

  latitude: z.string(),
  longitude: z.string(),
});

export type LibraryAttendance = z.infer<typeof libraryAttendanceSchema>;
