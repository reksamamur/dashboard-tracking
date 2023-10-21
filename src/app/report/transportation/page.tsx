import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from "@/components/module/Report/Datatable";
import { busAttendanceColumns } from '@/components/module/Report/Datatable/Columns';
import { BusAttendance } from "@/model/bus-attendance";

async function fetchBusAttendance() {
  const res = await fetch('https://api.npoint.io/9a5f0c8865345c39a7de');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<BusAttendance[]>;
}

export default async function Transportation() {
  const data = await fetchBusAttendance()
  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>Bus Attendance</CardTitle>
        <CardDescription>Report for bus attendance activity</CardDescription>
      </CardHeader>
      <CardContent>
        <Datatable data={data} columns={busAttendanceColumns} />
      </CardContent>
    </Card>
  );
}
