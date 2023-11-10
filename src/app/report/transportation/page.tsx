import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from '@/components/molecule/Datatable';
import { busAttendanceColumns } from '@/components/module/Report/DatatableColumns';
import { BusAttendance } from '@/model/bus-attendance';

import { DoughnutBustAttendance } from '@/components/module/Report/Charts/Doughnut/BusAttendance';

async function fetchBusAttendance() {
  const res = await fetch('https://api.npoint.io/9a5f0c8865345c39a7de');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<BusAttendance[]>;
}

export default async function Transportation() {
  const data = await fetchBusAttendance();

  return (
    <div className='space-y-2'>
      <Card className='flex flex-col justify-between xl:flex-row xl:items-center'>
        <CardHeader className='flex-1'>
          <CardTitle className='font-semibold text-sm'>
            Bus Attendance Statistic
          </CardTitle>
          <CardDescription>
            Report for bus attendance highlight statistic
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 flex gap-10 p-6'>
          <div className='flex gap-2 items-center'>
            <DoughnutBustAttendance firstValue={90} secondValue={10} />
            <div>
              <CardTitle className='font-semibold text-sm'>
                Active Bus
              </CardTitle>
              <CardDescription>90% Active bus</CardDescription>
            </div>
          </div>
          <div className='flex gap-2 items-center'>
            <DoughnutBustAttendance firstValue={60} secondValue={30} />
            <div>
              <CardTitle className='font-semibold text-sm'>
                Ontime Bus
              </CardTitle>
              <CardDescription>60% Ontime bus</CardDescription>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className='col-auto row-auto'>
        <CardHeader>
          <CardTitle className='font-semibold text-sm'>
            Bus Attendance
          </CardTitle>
          <CardDescription>Report for bus attendance activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Datatable
            data={data}
            columns={busAttendanceColumns}
            placeholder='Filter vehicle id'
            columnFilter='vehicleId'
          />
        </CardContent>
      </Card>
    </div>
  );
}
