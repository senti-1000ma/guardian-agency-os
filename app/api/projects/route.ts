import { NextResponse } from 'next/server';

// Mock Database (In-memory for prototype)
let projects = [
    { id: 1, name: "E-Commerce Rebranding", client: "Acme Corp", status: "Active", progress: 65, dueDate: "2024-10-24", budget: "₩ 15,000,000" },
    { id: 2, name: "Mobile App UX Design", client: "Stark Ind", status: "In Review", progress: 90, dueDate: "2024-10-15", budget: "₩ 8,500,000" },
    { id: 3, name: "Corporate Website", client: "Wayne Ent", status: "Planning", progress: 10, dueDate: "2024-11-01", budget: "₩ 22,000,000" },
    { id: 4, name: "Marketing Campaign", client: "Cyberdyne", status: "On Hold", progress: 45, dueDate: "2024-12-10", budget: "₩ 5,000,000" },
];

export async function GET() {
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    const body = await request.json();
    const newProject = {
        id: projects.length + 1,
        ...body,
        status: "Planning",
        progress: 0
    };
    projects.push(newProject);
    return NextResponse.json(newProject, { status: 201 });
}
