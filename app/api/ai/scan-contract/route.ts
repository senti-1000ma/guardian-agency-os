import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Logic to analyze file (Mocked for now)
    // In production, this would parse the PDF and send text to an LLM.

    return NextResponse.json({
        summary: "The contract contains several standard protective clauses but includes 2 critical risks regarding liability and intellectual property.",
        risk_score: 65,
        red_flags: [
            {
                clause: "The Service Provider agrees to indemnify the Client against all losses, damages, and expenses...",
                risk_level: "High",
                explanation: "This indemnification clause is too broad. It could make you liable for damages completely unrelated to your work.",
                recommendation: "Limit indemnification to direct damages caused by your gross negligence or willful misconduct."
            },
            {
                clause: "All Intellectual Property Rights created during the term shall belong exclusively to the Client...",
                risk_level: "Medium",
                explanation: "You are assigning ALL IP rights, which might include your pre-existing tools or methodologies.",
                recommendation: "Exclude 'Background IP' and 'Pre-existing Materials' from this assignment."
            }
        ]
    });
}
