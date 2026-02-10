import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
        original_critique: "The draft is direct but arguably too aggressive. It conveys frustration clearly but risks damaging the long-term relationship.",
        options: [
            {
                tone: "Professional & Firm",
                content: "While I want to help, the current requests are outside our rigorous scope. To proceed with these additions, we'll need to adjust the budget accordingly. Let's discuss how you'd like to move forward.",
                explanation: "Sets clear boundaries without being emotional. Focuses on the scope/budget relationship."
            },
            {
                tone: "Soft & Collaborative",
                content: "I'd love to squeeze these features in, but we're currently operating at max capacity for the agreed budget. Maybe we can swap some tasks or open a Phase 2 contract?",
                explanation: "Uses 'we' language to build partnership. Good for clients you want to keep long-term."
            },
            {
                tone: "Direct & Concise",
                content: "These updates are out of scope. Please see the attached estimate for the additional work. Approval is needed before we can proceed.",
                explanation: "Best for transactional relationships or when timelines are tight."
            }
        ]
    });
}
