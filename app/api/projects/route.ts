import { NextResponse } from 'next/server';

// Mock Database (In-memory for prototype)
let projects = [
    { id: 1, name: "E-Commerce Rebranding", client: "Acme Corp", status: "Active", progress: 65, dueDate: "2024-10-24", budget: "₩ 15,000,000" },
    { id: 2, name: "Mobile App UX Design", client: "Stark Ind", status: "In Review", progress: 90, dueDate: "2024-10-15", budget: "₩ 8,500,000" },
    { id: 3, name: "Corporate Website", client: "Wayne Ent", status: "Planning", progress: 10, dueDate: "2024-11-01", budget: "₩ 22,000,000" },
    { id: 4, name: "Marketing Campaign", client: "Cyberdyne", status: "On Hold", progress: 45, dueDate: "2024-12-10", budget: "₩ 5,000,000" },
];

let projectIdCounter = 4;

// 입력 검증 함수
interface CreateProjectRequest {
    name: string;
    client: string;
    dueDate: string;
    budget: string;
}

function validateProjectInput(body: any): CreateProjectRequest | null {
    if (!body || typeof body !== 'object') return null;
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) return null;
    if (!body.client || typeof body.client !== 'string' || body.client.trim().length === 0) return null;
    if (!body.dueDate || typeof body.dueDate !== 'string') return null;
    if (!body.budget || typeof body.budget !== 'string') return null;

    return {
        name: body.name.trim().substring(0, 100),
        client: body.client.trim().substring(0, 50),
        dueDate: body.dueDate,
        budget: body.budget
    };
}

export async function GET() {
    try {
        return NextResponse.json(projects);
    } catch (error) {
        console.error('[GET /api/projects]', error);
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = validateProjectInput(body);

        if (!validated) {
            return NextResponse.json(
                { error: 'Invalid input data. Required fields: name, client, dueDate, budget' },
                { status: 400 }
            );
        }

        const newProject = {
            id: ++projectIdCounter,
            ...validated,
            status: "Planning",
            progress: 0
        };

        projects.push(newProject);
        return NextResponse.json(newProject, { status: 201 });

    } catch (error) {
        console.error('[POST /api/projects]', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Invalid JSON format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        );
    }
}
