import { NextResponse } from 'next/server';

const MAX_MESSAGE_LENGTH = 5000;

interface RefineMessageRequest {
    message: string;
    tone?: 'professional' | 'soft' | 'direct';
}

function validateInput(body: any): RefineMessageRequest | null {
    if (!body || typeof body !== 'object') return null;
    if (!body.message || typeof body.message !== 'string') return null;
    if (body.message.trim().length === 0) return null;
    if (body.message.length > MAX_MESSAGE_LENGTH) return null;

    return {
        message: body.message.trim(),
        tone: body.tone || undefined
    };
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = validateInput(body);

        if (!validated) {
            return NextResponse.json(
                { error: '잘못된 요청입니다. 메시지는 필수이며 5000자를 초과할 수 없습니다.' },
                { status: 400 }
            );
        }

        // AI 처리 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({
            original_critique: "초안은 직접적이지만 다소 공격적일 수 있습니다. 불만을 명확히 전달하지만 장기적인 관계에 해를 끼칠 위험이 있습니다.",
            options: [
                {
                    tone: "전문적이고 단호함",
                    content: "도와드리고 싶지만, 현재 요청 사항은 협의된 범위를 벗어납니다. 이러한 추가 작업을 진행하려면 예산 조정이 필요합니다. 어떻게 진행하실지 논의해보시겠습니까?",
                    explanation: "감정적이지 않으면서 명확한 경계를 설정합니다. 범위와 예산의 관계에 초점을 맞춥니다."
                },
                {
                    tone: "부드럽고 협력적",
                    content: "이 기능들을 포함시키고 싶지만, 현재 합의된 예산으로는 최대 용량으로 작업 중입니다. 일부 작업을 교체하거나 2단계 계약을 시작하는 것은 어떨까요?",
                    explanation: "'우리'라는 표현을 사용하여 파트너십을 구축합니다. 장기적으로 유지하고 싶은 클라이언트에게 좋습니다."
                },
                {
                    tone: "직접적이고 간결함",
                    content: "이러한 업데이트는 범위를 벗어납니다. 추가 작업에 대한 견적서를 첨부합니다. 진행하기 전에 승인이 필요합니다.",
                    explanation: "거래 관계나 일정이 촉박할 때 최적입니다."
                }
            ],
            disclaimer: "제안된 메시지는 참고용이며, 귀하의 상황에 맞게 조정하여 사용하세요."
        });

    } catch (error) {
        console.error('[POST /api/ai/refine-message]', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Invalid JSON format' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: '메시지 정제 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
