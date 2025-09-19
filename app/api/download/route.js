import { NextResponse } from "next/server";
import { createReadStream } from "fs";
import { join } from "path";

export async function GET() {
  const filePath = join(process.cwd(), "public", "hasinaquiz.apk");

  const headers = new Headers();
  headers.append("Content-Disposition", "attachment; filename=hasinaquiz.apk");
  headers.append("Content-Type", "application/vnd.android.package-archive");

  return new NextResponse(createReadStream(filePath), { headers });
}
