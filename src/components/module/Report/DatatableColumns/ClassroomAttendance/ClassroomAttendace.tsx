'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ClassroomAttendance } from '@/model';
import { DataTableColumnHeader } from '@/components/molecule/Datatable/Header';
import { cn } from '@/lib/utils';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const columns: ColumnDef<ClassroomAttendance>[] = [
  {
    id: 'no',
    header: () => <span>No</span>,
    cell: ({ row }) => <span>{row.index + 1}</span>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'deviceId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Device Id' />
    ),
    cell: ({ row }) => {
      return <span className='font-medium'>{row.getValue('deviceId')}</span>;
    },
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
    accessorKey: 'classroomName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Classroom Name' />
    ),
    cell: ({ row }) => {
      return (
        <span className='font-medium capitalize w-full'>
          {row.getValue('classroomName')}
        </span>
      );
    },
  },
  {
    id: 'timeIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Time In' />
    ),
    columns: [
      {
        accessorKey: 'timeIn',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Time In' />
        ),
        cell: ({ row }) => {
          return (
            <span className='font-medium'>
              {dayjs
                .unix(row.getValue('timeIn'))
                .tz('Asia/Kuala_Lumpur')
                .format('dddd, MMMM D, YYYY h:mm A')}
            </span>
          );
        },
      },
      {
        id: 'latlongin',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title='Latitude In, Longitude In'
          />
        ),
        cell: ({ row }) => (
          <span>
            {row.original.latitudeIn}, {row.original.longitudeIn}
          </span>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
  },
  {
    id: 'timeOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Time Out' />
    ),
    columns: [
      {
        accessorKey: 'timeOut',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Time Out' />
        ),
        cell: ({ row }) => {
          return (
            <span className='font-medium'>
              {dayjs
                .unix(row.getValue('timeOut'))
                .tz('Asia/Kuala_Lumpur')
                .format('dddd, MMMM D, YYYY h:mm A')}
            </span>
          );
        },
      },
      {
        id: 'latlongout',
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title='Latitude Out, Longitude Out'
          />
        ),
        cell: ({ row }) => (
          <span>
            {row.original.latitudeOut}, {row.original.longitudeOut}
          </span>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
  },
];
