'use client';

import { ColumnDef } from '@tanstack/react-table';

import { LibraryAttendance } from '@/model';
import { DataTableColumnHeader } from '@/components/molecule/Datatable/Header';
import { cn } from '@/lib/utils';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const columns: ColumnDef<LibraryAttendance>[] = [
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
      <DataTableColumnHeader column={column} title="Device Id" />
    ),
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue('deviceId')}</span>;
    },
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="inline-flex gap-2 items-center">
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
      <DataTableColumnHeader column={column} title="Datetime" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {dayjs
            .unix(row.getValue('dateTime'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
  {
    accessorKey: 'libraryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Library Name" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium capitalize w-full">
          {row.getValue('libraryName')}
        </span>
      );
    },
  },
  {
    accessorKey: 'libraryPosition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Library Position" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium capitalize w-full">
          {row.getValue('libraryPosition')}
        </span>
      );
    },
  },
  {
    accessorKey: 'elevation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Elevation" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium capitalize w-full">
          {row.getValue('elevation')}
        </span>
      );
    },
  },
  {
    id: 'latlong',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Latitude, Longitude" />
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
    accessorKey: 'timeIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time In" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {dayjs
            .unix(row.getValue('timeIn'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
  {
    accessorKey: 'timeOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Out" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {dayjs
            .unix(row.getValue('timeOut'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
];
