import { NextResponse } from 'next/server';

let clients = [
    { id: 1, name: "Acme Corp", contact: "John Doe", email: "john@acme.com", phone: "+82 10-1234-5678", projects: 3, totalValue: "₩ 45,000,000" },
    { id: 2, name: "Stark Industries", contact: "Tony Stark", email: "tony@stark.com", phone: "+82 10-9876-5432", projects: 1, totalValue: "₩ 8,500,000" },
    { id: 3, name: "Wayne Enterprises", contact: "Bruce Wayne", email: "bruce@wayne.com", phone: "+82 10-1111-2222", projects: 2, totalValue: "₩ 22,000,000" },
];

export async function GET() {
    return NextResponse.json(clients);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newClient = {
        id: clients.length + 1,
        ...body,
        projects: 0,
        totalValue: "₩ 0"
    };
    clients.push(newClient);
    return NextResponse.json(newClient, { status: 201 });
}
