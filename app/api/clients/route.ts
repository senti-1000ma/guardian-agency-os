import { NextResponse } from 'next/server';

let clients = [
    { id: 1, name: "Acme Corp", contact: "John Doe", email: "john@acme.com", phone: "+82 10-1234-5678", projects: 3, totalValue: "₩ 45,000,000" },
    { id: 2, name: "Stark Industries", contact: "Tony Stark", email: "tony@stark.com", phone: "+82 10-9876-5432", projects: 1, totalValue: "₩ 8,500,000" },
    { id: 3, name: "Wayne Enterprises", contact: "Bruce Wayne", email: "bruce@wayne.com", phone: "+82 10-1111-2222", projects: 2, totalValue: "₩ 22,000,000" },
];

let clientIdCounter = 3;

// 입력 검증
interface CreateClientRequest {
    name: string;
    contact: string;
    email: string;
    phone: string;
}

function validateClientInput(body: any): CreateClientRequest | null {
    if (!body || typeof body !== 'object') return null;
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) return null;
    if (!body.contact || typeof body.contact !== 'string' || body.contact.trim().length === 0) return null;
    if (!body.email || typeof body.email !== 'string' || !isValidEmail(body.email)) return null;
    if (!body.phone || typeof body.phone !== 'string') return null;

    return {
        name: body.name.trim().substring(0, 100),
        contact: body.contact.trim().substring(0, 50),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim()
    };
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export async function GET() {
    try {
        return NextResponse.json(clients);
    } catch (error) {
        console.error('[GET /api/clients]', error);
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = validateClientInput(body);

        if (!validated) {
            return NextResponse.json(
                { error: 'Invalid input data. Required fields: name, contact, email (valid format), phone' },
                { status: 400 }
            );
        }

        const newClient = {
            id: ++clientIdCounter,
            ...validated,
            projects: 0,
            totalValue: "₩ 0"
        };

        clients.push(newClient);
        return NextResponse.json(newClient, { status: 201 });

    } catch (error) {
        console.error('[POST /api/clients]', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Invalid JSON format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create client' },
            { status: 500 }
        );
    }
}
