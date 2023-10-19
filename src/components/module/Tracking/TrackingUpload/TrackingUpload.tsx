'use client';

import { useState, useEffect } from 'react';

import { Upload } from '@/components/module/Tracking/Upload';
import { TrackingTable } from '@/components/module/Tracking/TrackingTable';

import { useMutation, useQuery } from 'react-query';

import { SchemaUploadType } from '@/model/timeline';

type FileUploadProp = {
  file: FormData;
};

export default function TrackingUpload() {
  const [dataTracking, setDataTracking] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ file }: FileUploadProp) => {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: file,
      });

      return res.json();
    },
    onSuccess: () => {
      handleRefresh()
    }
  });

  const { isError, isLoading, refetch } = useQuery({
    queryKey: ['timeline'],
    queryFn: async () => {
      const fetchTimeline = async () => {
        const result = await fetch(
          'https://api.npoint.io/c636b4ab8e6e0935dfb7'
        );
        return result.json();
      };

      return await fetchTimeline();
    },
    onSuccess: (item) => {
      setDataTracking(item ?? []);
      setFetching(false);
    },
  });

  const processUpload = (values: SchemaUploadType) => {
    const formFile = new FormData();
    formFile.append('file', values.file);

    mutation.mutate({
      file: formFile,
    });
  };

  const handleRefresh = () => {
    refetch();
    setFetching(true);
  };

  return (
    <>
      <Upload processUpload={(value) => processUpload(value)} />
      <TrackingTable
        dataTracking={dataTracking}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
        refresh={handleRefresh}
      />
    </>
  );
}
