import { NextResponse } from 'next/server';

let profile = {
  username: 'admin',
  email: 'admin@example.com',
  avatar: '/avatar.png',
  phone: '13800138000',
  bio: '系统管理员',
};

export async function GET() {
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const body = await request.json();
  profile = { ...profile, ...body };
  return NextResponse.json(profile);
} 