'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SchemaUploadType, SchemaUpload } from "@/model/timeline";

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UploadProps {
  processUpload: (value: SchemaUploadType) => void;
}

export default function Upload({ processUpload }: UploadProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SchemaUploadType>({
    resolver: zodResolver(SchemaUpload),
  });

  return (
    <>
      <form onSubmit={handleSubmit(processUpload)}>
        <div className='space-y-2'>
          <Controller
            name='file'
            control={control}
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <Card className='p-4 flex items-center justify-between'>
                <input
                  id='file'
                  type='file'
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  className='
                    text-base 
                    text-zinc-500
                    file:mr-5 
                    file:py-2 
                    file:px-6
                    file:rounded-md 
                    file:border
                    file:text-sm 
                    file:font-medium
                    file:bg-blue-50 
                    file:text-blue-700
                    hover:file:cursor-pointer 
                    hover:file:bg-blue-100
                    hover:file:text-blue-950
                '
                  onChange={(e) => {
                    onChange(e.target.files?.[0]);
                  }}
                />

                <Button type='submit' variant='outline' size='sm'>
                  Upload
                </Button>
              </Card>
            )}
          />
        </div>
      </form>
    </>
  );
}
