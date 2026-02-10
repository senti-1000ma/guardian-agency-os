'use client';

import { motion } from "framer-motion";
import { Shield, MessageSquare, Lock, Globe, CheckCircle, ArrowRight, Zap, Layout, CreditCard, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
            <Shield className="w-6 h-6 text-cyan-400" />
            <span>Guardian OS</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <Link href="#features" className="hover:text-cyan-400 transition-colors">기능 소개</Link>
            <Link href="#pricing" className="hover:text-cyan-400 transition-colors">요금제</Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors">리소스</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-400 hover:text-white hidden sm:block">로그인</Link>
            <Link href="/dashboard">
              <button className="bg-cyan-500 text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-cyan-400 transition-all shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]">
                시작하기
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-cyan-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              The Ultimate Agency OS
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white leading-tight">
              당신은 혼자가 아닙니다. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                1인 기업을 위한 완벽한 에이전시.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              계약서 검토부터 클라이언트 포털, 자동 정산까지.<br className="hidden md:block" />
              Guardian OS는 프리랜서를 위한 '경영지원팀'이자 '법무팀'입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <button className="flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-50 transition-all">
                  무료로 시작하기 <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="flex items-center justify-center gap-2 bg-slate-900 text-white border border-slate-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:border-slate-600">
                기능 살펴보기
              </button>
            </div>

            {/* Dashboard Preview Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="mt-20 relative mx-auto max-w-5xl rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <div className="p-4 border-b border-slate-800 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <div className="aspect-[16/9] bg-slate-900 flex items-center justify-center text-slate-600">
                {/* Placeholder for Dashboard Image */}
                <div className="text-center">
                  <Layout className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Guardian Dashboard Preview</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">필요한 모든 기능을 하나로.</h2>
            <p className="text-slate-400 text-lg">파편화된 툴들을 하나로 통합하세요. 계약, 소통, 정산이 물 흐르듯 연결됩니다.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-cyan-400" />}
              title="비즈니스 외교관"
              desc="거친 표현을 정중하게, 캐주얼한 말을 프로페셔널하게. AI가 당신의 메일을 '대기업 임원'의 품격으로 다듬어줍니다."
              delay={0.1}
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-indigo-400" />}
              title="독소조항 탐지기"
              desc="'수정 횟수 무제한'? '저작권 포기'? 계약서 스캔 한번으로 숨겨진 독소 조항을 찾아내고 법적 대응 논리를 제공합니다."
              delay={0.2}
            />
            <FeatureCard
              icon={<Layout className="w-8 h-8 text-purple-400" />}
              title="클라이언트 포털"
              desc="카톡으로 파일 보내지 마세요. 나만의 브랜드가 적용된 전용 포털에서 고객이 직접 시안을 확인하고 결제하게 하세요."
              delay={0.3}
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8 text-emerald-400" />}
              title="오토 인보이스"
              desc="마일스톤에 맞춰 청구서를 자동 발행합니다. 미입금 시 정중하지만 단호한 독촉 메일까지 AI가 알아서 보냅니다."
              delay={0.4}
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="스마트 스케줄링"
              desc="채팅에서 '다음 주 수요일 미팅'이라고 말하면 캘린더에 자동 등록됩니다. 계약 마감일도 놓치지 않도록 챙겨줍니다."
              delay={0.5}
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-rose-400" />}
              title="스쿼드 결성 (Coming Soon)"
              desc="큰 프로젝트가 들어왔나요? 검증된 가디언 유저들과 일시적인 팀(Squad)을 꾸려 규모의 한계를 뛰어넘으세요."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* How it works Section (New) */}
      <section id="how-it-works" className="py-32 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">복잡한 비즈니스, <br />AI로 심플하게.</h2>
            <p className="text-slate-400 text-lg">가디언 OS가 당신의 업무 흐름을 어떻게 자동화하는지 확인하세요.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -z-10" />

            <StepStep
              step="01"
              title="계약서 업로드"
              desc="클라이언트에게 받은 PDF 계약서를 드래그하여 업로드합니다. AI가 3초 만에 분석을 시작합니다."
            />
            <StepStep
              step="02"
              title="독소조항 제거"
              desc="'무제한 수정', '저작권 양도' 등 위험한 조항을 찾아내고, 수정 제안 멘트를 생성합니다."
            />
            <StepStep
              step="03"
              title="프로젝트 시작"
              desc="계약이 체결되면 클라이언트 포털이 생성되고, 웰컴 키트가 자동 발송됩니다."
            />
            <StepStep
              step="04"
              title="정산 및 완료"
              desc="마일스톤 승인 시 인보이스가 발행되며, 입금 확인 후 최종 파일이 전달됩니다."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-950 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">합리적인 투자, 확실한 리턴.</h2>
            <p className="text-slate-400 text-lg">변호사 선임 비용의 1/100 가격으로 법무팀과 경영지원팀을 고용하세요.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <PricingCard
              title="Starter"
              price="Free"
              desc="이제 막 시작하는 프리랜서를 위해."
              features={[
                "AI 문장 다듬기 (월 50회)",
                "기본 계약서 검토 (월 3건)",
                "프로젝트 관리 대시보드",
                "표준 계약서 템플릿 제공"
              ]}
            />

            {/* Pro Plan (Best Value) */}
            <PricingCard
              title="Pro"
              price="$29"
              period="/월"
              desc="전업 1인 기업가를 위한 완전한 무기."
              isPopular={true}
              features={[
                "무제한 AI 문장 다듬기",
                "독소조항 탐지기 무제한",
                "클라이언트 포털 (Custom Branding)",
                "오토 인보이스 & 넛지 시스템",
                "우선 지원 (Priority Support)"
              ]}
            />

            {/* Agency Plan */}
            <PricingCard
              title="Agency"
              price="$99"
              period="/월"
              desc="작은 팀으로 확장하는 분들을 위해."
              features={[
                "최대 5명 팀원 초대",
                "멀티 브랜드 (사업자 2개 이상 관리)",
                "API 액세스 권한",
                "전담 AI 매니저 배정",
                "High-Volume 사용량 제공"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-slate-500 text-sm border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Shield className="w-5 h-5 text-slate-400" />
            <span className="font-bold text-slate-200">Guardian OS</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">기능</a>
            <a href="#" className="hover:text-white transition-colors">요금제</a>
            <a href="#" className="hover:text-white transition-colors">로그인</a>
          </div>
          <div className="mt-4 md:mt-0">
            &copy; 2026 Guardian Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)] transition-all group"
    >
      <div className="mb-6 bg-slate-800 p-4 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed break-keep">
        {desc}
      </p>
    </motion.div>
  );
}

function StepStep({ step, title, desc }: { step: string, title: string, desc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: parseInt(step) * 0.1 }}
      className="relative text-center md:text-left pt-6"
    >
      <div className="w-12 h-12 rounded-full bg-slate-800 border-4 border-slate-950 flex items-center justify-center font-bold text-cyan-400 text-lg mb-4 mx-auto md:mx-0 relative z-10 shadow-xl group-hover:scale-110 transition-transform">
        {step}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function PricingCard({ title, price, period = "", desc, features, isPopular = false }: { title: string, price: string, period?: string, desc: string, features: string[], isPopular?: boolean }) {
  return (
    <div className={`relative p-8 rounded-3xl border flex flex-col h-full ${isPopular ? 'bg-slate-900 border-cyan-500 shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]' : 'bg-slate-950 border-slate-800'}`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide shadow-lg">
          Most Popular
        </div>
      )}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-slate-300 mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-slate-500">{period}</span>
        </div>
        <p className="text-slate-400 text-sm mt-4">{desc}</p>
      </div>
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckCircle className={`w-5 h-5 shrink-0 ${isPopular ? 'text-cyan-400' : 'text-slate-600'}`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${isPopular ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
        {title === 'Starter' ? '무료로 시작하기' : '구독하기'}
      </button>
    </div>
  )
}
