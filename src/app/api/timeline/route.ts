import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const pathJSON = path.resolve(process.cwd(), 'public', 'data.json');

    const readJSON = fs.readFileSync(pathJSON, 'utf8');

    if (readJSON !== '') {
      return NextResponse.json(
        { result: JSON.parse(readJSON), message: 'Success', code: 200 },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { result: [], message: 'Data Empty', code: 404, path: pathJSON },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { result: [], message: 'Failed to read data', code: 500, detail: error },
      { status: 500 }
    );
  }
}
