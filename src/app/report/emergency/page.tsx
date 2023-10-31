import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Datatable } from '@/components/molecule/Datatable';
import { emergencyColumns } from '@/components/module/Report/DatatableColumns';
import { Emergency } from '@/model';

async function fetchEmergencyAttendance() {
  const res = await fetch('https://api.npoint.io/4f5b33cb311ed2da2b8d');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json() as Promise<Emergency[]>;
}

export default async function Emergency() {
  const data = await fetchEmergencyAttendance();

  return (
    <Card className='col-auto row-auto'>
      <CardHeader>
        <CardTitle className='font-semibold text-sm'>Emergency</CardTitle>
        <CardDescription>Report for Emergency activity</CardDescription>
      </CardHeader> 
      <CardContent>
        <Datatable data={data} columns={emergencyColumns} />
      </CardContent>
    </Card>
  );
}
