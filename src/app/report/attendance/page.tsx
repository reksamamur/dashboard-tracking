import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from '@/components/molecule/Datatable';
import { attendanceColumns } from '@/components/module/Report/DatatableColumns';
import { SchoolGateAttendance } from '@/model/school-gate-attendance';

async function fetchAttendance() {
  const res = await fetch('https://api.npoint.io/8129ae18f9adb8499234');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<SchoolGateAttendance[]>;
}

export default async function Attendance() {
  const data = await fetchAttendance();
  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>Attendance</CardTitle>
        <CardDescription>Report for attendance activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Datatable
          data={data}
          columns={attendanceColumns}
          placeholder='Filter device id'
          columnFilter='deviceId'
        />
      </CardContent>
    </Card>
  );
}
