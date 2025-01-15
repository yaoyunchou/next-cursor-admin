import { NextResponse } from 'next/server';

let settings = {
  siteName: 'CMS系统',
  siteDescription: '一个现代化的内容管理系统',
  maintenance: false,
  emailNotification: true,
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  settings = { ...settings, ...body };
  return NextResponse.json(settings);
} 