import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from '@/components/molecule/Datatable';
import { libraryAttendanceColumns } from '@/components/module/Report/DatatableColumns';
import { LibraryAttendance } from '@/model';

async function fetchLibraryAttendance() {
  const res = await fetch('https://api.npoint.io/1b9deaf28475dcaebb11');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<LibraryAttendance[]>;
}

export default async function SchoolFacilitiesAttendance() {
  const data = await fetchLibraryAttendance();

  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>
          Library Attendance
        </CardTitle>
        <CardDescription>Report for libraryattendance activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Datatable
          data={data}
          columns={libraryAttendanceColumns}
          placeholder='Filter device id'
          columnFilter='deviceId'
        />
      </CardContent>
    </Card>
  );
}
