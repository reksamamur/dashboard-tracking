import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from '@/components/molecule/Datatable';
import { classroomAttendanceColumns } from '@/components/module/Report/DatatableColumns';
import { ClassroomAttendance } from '@/model';

async function fetchClassroomAttendance() {
  const res = await fetch('https://api.npoint.io/5e3a4d5d3baec078121e');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<ClassroomAttendance[]>;
}

export default async function ClassroomAttendance() {
  const data = await fetchClassroomAttendance();
  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>
          Classroom Attendance
        </CardTitle>
        <CardDescription>
          Report for classroom attendance activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Datatable
          data={data}
          columns={classroomAttendanceColumns}
          placeholder='Filter device id'
          columnFilter='deviceId'
        />
      </CardContent>
    </Card>
  );
}
