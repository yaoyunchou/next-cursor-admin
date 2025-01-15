import { NextResponse } from 'next/server';

const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  }
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  return NextResponse.json(newUser);
} 