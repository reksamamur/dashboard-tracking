'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Emergency } from '@/model';
import { DataTableColumnHeader } from '@/components/molecule/Datatable/Header';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const columns: ColumnDef<Emergency>[] = [
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
    accessorKey: 'emergencyId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emergency ID" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium capitalize w-full">
          {row.getValue('emergencyId')}
        </span>
      );
    },
  },
  {
    accessorKey: 'emergencyPosition',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Emergency Position" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium capitalize w-full">
          {row.getValue('emergencyPosition')}
        </span>
      );
    },
  },

  {
    id: 'latlongin',
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
    accessorKey: 'timeInEmergency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time In Emergency" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {dayjs
            .unix(row.getValue('timeInEmergency'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
  {
    accessorKey: 'timeOutEmergency',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time Out Emergency" />
    ),
    cell: ({ row }) => {
      return (
        <span className="font-medium">
          {dayjs
            .unix(row.getValue('timeOutEmergency'))
            .tz('Asia/Kuala_Lumpur')
            .format('dddd, MMMM D, YYYY h:mm A')}
        </span>
      );
    },
  },
];
