'use client';

import { ColumnDef } from '@tanstack/react-table';

import { BusAttendance } from '@/model/bus-attendance';
import { DataTableColumnHeader } from '@/components/module/Report/Datatable/Header';
import { cn } from '@/lib/utils';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const columns: ColumnDef<BusAttendance>[] = [
  {
    id: 'no',
    header: () => <span>No</span>,
    cell: ({ row }) => <span>{row.index + 1}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'vehicleId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Vehicle Id' />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.getValue('vehicleId')}</span>;
    },
  },
  {
    accessorKey: 'directionName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Direction Name' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-medium capitalize w-full'>
          {row.getValue('directionName')}
        </span>
      );
    },
  },
  {
    id: 'latlong',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Latitude, Longitude' />
    ),
    cell: ({ row }) => (
      <span>
        {row.original.latitude}, {row.original.longitude}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <div className='inline-flex gap-2 items-center'>
          <span
            className={cn(
              'rounded-full h-2 w-2 border',
              row.getValue('isActive')
                ? 'bg-green-600 border-green-900'
                : 'bg-zinc-600 border-zinc-900'
            )}
          ></span>
          <span>{row.getValue('isActive') ? 'Active' : 'Deactive'}</span>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Datetime' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-medium'>
          {dayjs
            .unix(row.getValue('dateTime'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
  {
    accessorKey: 'tripStartTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trip Start' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-medium'>
          {dayjs
            .unix(row.getValue('tripStartTime'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
  {
    accessorKey: 'tripEndTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Trip End' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-medium'>
          {dayjs
            .unix(row.getValue('tripEndTime'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
];
