import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes).toString('utf-8');

    const splitBuffer = buffer.split(/\r?\n/);

    const pathJSON = path.join(process.cwd(), 'data.json');

    const result = splitBuffer.map((item) => {
      const eachData = item.split(';');

      return {
        device_id: eachData[0] || null,
        elevation: eachData[1] || null,
        datetime: eachData[2] || null,
        latitude: eachData[3] || null,
        longitude: eachData[4] || null,
        battery_percentage: eachData[5] || null,
        position: eachData[6] || null,
      };
    });

    const readJSON = fs.readFileSync(pathJSON, 'utf8');

    if (readJSON === '') {
      fs.writeFileSync(pathJSON, JSON.stringify(result));

      return NextResponse.json(
        { result: null, message: 'Success adding new data', code: 200 },
        { status: 200 }
      );
    } else {
      const convert = JSON.parse(readJSON) as any[];
      result.forEach((item) => {
        convert.push(item);
      });
      fs.writeFileSync(pathJSON, JSON.stringify(convert));

      return NextResponse.json(
        { result: null, message: 'Success updateing new data', code: 200 },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        result: null,
        message: 'Failed to read data',
        code: 500,
        detail: error,
      },
      { status: 500 }
    );
  }
}
