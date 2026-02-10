import { NextResponse } from 'next/server';

const MAX_FILE_SIZE = 10 * 1024 * 1024;  // 10MB
const ALLOWED_FILE_TYPES = ['application/pdf', 'pdf'];

export async function POST(request: Request) {
    try {
        // 파일 크기 체크 (헤더 기반)
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: '파일이 너무 큽니다. 최대 10MB까지 업로드 가능합니다.' },
                { status: 413 }
            );
        }

        // FormData 파싱
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json(
                { error: '파일이 제공되지 않았습니다.' },
                { status: 400 }
            );
        }

        // 파일 크기 재검증
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { error: '파일이 너무 큽니다. 최대 10MB까지 업로드 가능합니다.' },
                { status: 413 }
            );
        }

        // 파일 타입 검증
        const isValidType = ALLOWED_FILE_TYPES.some(type =>
            file.type.includes(type) || file.name.toLowerCase().endsWith('.pdf')
        );

        if (!isValidType) {
            return NextResponse.json(
                { error: 'PDF 파일만 업로드 가능합니다.' },
                { status: 400 }
            );
        }

        // AI 처리 시뮬레이션 (실제로는 여기서 LLM API 호출)
        await new Promise(resolve => setTimeout(resolve, 2500));

        // 법무팀 피드백 반영: "독소조항" → "주의 필요 조항"
        return NextResponse.json({
            summary: "계약서에는 일반적인 보호 조항들이 포함되어 있으나, 책임과 지적재산권 관련하여 주의가 필요한 2개 조항이 발견되었습니다.",
            risk_score: 65,
            clauses_to_review: [
                {
                    clause: "용역 제공자는 클라이언트의 모든 손실, 손해 및 비용에 대해 배상할 책임이 있다...",
                    attention_level: "높음",
                    explanation: "이 배상 조항은 범위가 매우 넓습니다. 귀하의 업무와 직접 관련이 없는 손해에 대해서도 책임을 져야 할 수 있습니다.",
                    consideration: "배상 범위를 중대한 과실이나 고의적 위법행위로 인한 직접 손해로 제한하는 것을 고려해보세요."
                },
                {
                    clause: "계약 기간 중 생성된 모든 지적재산권은 클라이언트에게 독점적으로 귀속된다...",
                    attention_level: "중간",
                    explanation: "이 조항에 따르면 귀하가 이미 보유하고 있던 도구나 방법론까지 포함될 수 있습니다.",
                    consideration: "'기존 자산' 및 '사전 보유 자료'를 이 권리 양도에서 제외하는 것을 고려해보세요."
                }
            ],
            disclaimer: "본 분석은 참고용 정보이며, 법률적 조언이 아닙니다. 정확한 판단은 변호사와 상담하시기 바랍니다."
        });

    } catch (error) {
        console.error('[POST /api/ai/scan-contract]', error);

        if (error instanceof Error && error.message.includes('Failed to parse body')) {
            return NextResponse.json(
                { error: '잘못된 파일 형식입니다.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: '계약서 분석 중 오류가 발생했습니다.' },
            { status: 500 }
        );
    }
}
