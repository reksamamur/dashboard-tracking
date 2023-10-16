'use client';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

import {
  BatteryFull,
  BatteryMedium,
  BatteryLow,
  UserCircle2,
} from 'lucide-react';

import { Today } from '@/model';
import { TodayData } from '@/data';
import Link from 'next/link';

const columnHelper = createColumnHelper<Today>();

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => (
      <h6 className='font-semibold inline-flex gap-2 items-center'>
        {' '}
        <UserCircle2 className='text-zinc-700' /> {info.getValue()}
      </h6>
    ),
    header: () => <span>Name</span>,
  }),
  columnHelper.accessor('isActive', {
    cell: (info) => (
      <Badge
        className={cn(
          'font-bold',
          info.getValue()
            ? 'bg-emerald-600 hover:bg-emerald-950'
            : 'bg-red-500 hover:bg-red-950'
        )}
      >
        {info.getValue() ? 'Active' : 'Non Active'}
      </Badge>
    ),
    header: () => <span>Active</span>,
  }),
  columnHelper.accessor('batteryPercentage', {
    header: () => <span>Battery</span>,
    cell: (info) => {
      if (info.getValue() >= 70) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryFull className='text-emerald-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }

      if (info.getValue() >= 30 && info.getValue() <= 70) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryMedium className='text-yellow-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }

      if (info.getValue() < 30) {
        return (
          <div className='flex flex-col xl:flex-row justify-start items-center gap-2 font-semibold'>
            <BatteryLow className='text-red-600' />
            <span>{info.getValue()} %</span>
          </div>
        );
      }
    },
  }),
  columnHelper.accessor('location', {
    header: () => <span>Location</span>,
    cell: (info) => <h6 className='font-medium'>{info.getValue()}</h6>,
  }),
  columnHelper.accessor('timeIn', {
    header: () => <span>Time In</span>,
    cell: (info) => (
      <span className='text-xs font-medium'>
        {dayjs
          .unix(info.getValue())
          .tz('Asia/Kuala_Lumpur')
          .format('HH:mm:ss A')}
      </span>
    ),
  }),
  columnHelper.accessor('timeOut', {
    header: () => <span>Time Out</span>,
    cell: (info) => (
      <span className='text-xs font-medium'>
        {dayjs
          .unix(info.getValue())
          .tz('Asia/Kuala_Lumpur')
          .format('HH:mm:ss A')}
      </span>
    ),
  }),
];

export default function TodayTable() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [data, setData] = React.useState(() => [...TodayData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className='col-auto row-auto xl:col-span-2 xl:row-span-2'>
      <CardHeader>
        <div className='w-full flex justify-between items-center'>
          <CardTitle className='font-semibold text-sm'>Today</CardTitle>
          <Button
            variant='ghost'
            size='sm'
            className='transition-colors duration-200 text-blue-500 hover:text-blue-700 hover:bg-blue-50'
          >
            See timeline
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table className='table-auto overflow-scroll w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-start'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} onClick={() => console.log(row)} className='cursor-pointer'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
