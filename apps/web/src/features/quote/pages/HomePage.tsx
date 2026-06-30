import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Bot,
  Cable,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  GitBranch,
  HardDrive,
  LifeBuoy,
  Monitor,
  SearchCheck,
  ShieldCheck,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { Screen, StatusBadge } from '../../../components/ui';
import type { BuildSummary } from '../types';
import { builds } from '../mocks/quoteMock';

const quickCategories: Array<{ label: string; detail: string; to: string; icon: LucideIcon }> = [
  { label: 'CPU', detail: '작업 성능 기준', to: '/self-quote?category=CPU', icon: Cpu },
  { label: 'GPU', detail: 'QHD/AI 실습 기준', to: '/self-quote?category=GPU', icon: Monitor },
  { label: 'RAM', detail: '개발/멀티태스킹', to: '/self-quote?category=RAM', icon: Database },
  { label: 'SSD', detail: '프로젝트 저장공간', to: '/self-quote?category=STORAGE', icon: HardDrive },
  { label: '파워', detail: '피크 전력 여유율', to: '/self-quote?category=PSU', icon: Zap },
  { label: '쿨러', detail: '발열/소음 여유', to: '/self-quote?category=COOLER', icon: Activity }
];

const verificationStages: Array<{ title: string; detail: string; meta: string; icon: LucideIcon }> = [
  { title: '요구사항 파싱', detail: '예산, 용도, 선호 브랜드를 구조화합니다.', meta: 'LLM', icon: FileText },
  { title: 'RAG 근거', detail: '내부 자산, 가격, AS 기준을 함께 검색합니다.', meta: 'Evidence', icon: Database },
  { title: 'Tool 검증', detail: '호환성, 전력, 규격, 성능 범위를 확인합니다.', meta: 'PASS/WARN/FAIL', icon: SearchCheck },
  { title: '추천 Build', detail: '2~3개 조합과 경고를 비교 가능한 형태로 남깁니다.', meta: 'Result', icon: GitBranch }
];

const summaryStats = [
  { label: 'Tool check', value: '5종', detail: '호환성 · 전력 · 규격 · 성능 · 가격' },
  { label: '추천안', value: '2-3개', detail: '예산형, 균형형, 목적 특화형 비교' },
  { label: 'AS 로그', value: '30분', detail: '명시 동의 후 최근 로그만 업로드' }
];

export function HomePage() {
  return (
    <Screen>
      <div className="space-y-5">
        <div className="text-xs font-semibold text-slate-500">Home / AI PC consulting</div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
          <section className="panel relative overflow-hidden p-5 sm:p-7">
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-blue via-emerald-500 to-amber-400" />
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-brand-pale px-3 py-1 text-xs font-bold text-brand-blue">
                <ShieldCheck size={14} />
                근거와 검증 결과를 함께 저장하는 PC 컨설팅
              </div>
              <h1 className="max-w-2xl break-keep text-2xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                검증 근거가 남는 AI PC 견적
              </h1>
              <p className="mt-4 max-w-2xl break-keep text-sm leading-6 text-slate-600 sm:text-base">
                예산과 사용 목적을 자연어로 입력하면 BuildGraph AI가 요구사항을 정리하고, RAG 근거와 Tool 검증을 거쳐 추천 조합과 경고를 한 화면에 남깁니다.
              </p>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_240px]">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase text-slate-500">요구사항 입력</span>
                <textarea
                  className="h-36 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-100"
                  defaultValue="200만원 안에서 QHD 게임과 개발을 같이 할 PC 추천해줘. NVIDIA 선호."
                />
              </label>

              <div className="flex flex-col justify-between gap-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <Cable size={14} />
                    현재 연결 경로
                  </div>
                  <div className="mt-2 text-sm font-black text-slate-950">POST /api/requirements/parse</div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">요구사항 분석 후 추천 API로 이어지는 P0 흐름입니다.</p>
                </div>
                <div className="grid gap-2">
                  <Link
                    to="/requirements/new"
                    className="flex min-h-11 items-center justify-center gap-2 rounded bg-brand-blue px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#004f95] focus:outline-none focus:ring-4 focus:ring-blue-200"
                  >
                    <Bot size={17} />
                    AI 견적 생성
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/self-quote"
                    className="flex min-h-11 items-center justify-center gap-2 rounded border border-slate-300 bg-white px-4 text-sm font-bold text-slate-800 transition hover:border-brand-blue hover:text-brand-blue focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    셀프 견적 보기
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <aside className="panel p-5 sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-slate-950">검증 파이프라인</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">LLM 설명과 결정 로직을 분리해 결과를 검토 가능하게 남깁니다.</p>
              </div>
              <StatusBadge status="ACTIVE" />
            </div>
            <div className="space-y-1">
              {verificationStages.map((stage, index) => (
                <div key={stage.title} className="grid grid-cols-[32px_1fr] gap-3 py-3">
                  <div className="flex flex-col items-center">
                    <div className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-brand-blue">
                      <stage.icon size={16} />
                    </div>
                    {index < verificationStages.length - 1 ? <div className="mt-2 h-8 w-px bg-slate-200" /> : null}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-black text-slate-950">{stage.title}</h3>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-500">{stage.meta}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <section className="grid gap-3 sm:grid-cols-3">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="panel p-4">
              <div className="text-xs font-bold uppercase text-slate-500">{stat.label}</div>
              <div className="mt-2 text-2xl font-black text-slate-950">{stat.value}</div>
              <div className="mt-1 text-xs leading-5 text-slate-500">{stat.detail}</div>
            </div>
          ))}
        </section>

        <section className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="panel p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950">추천 Build 샘플</h2>
                <p className="mt-1 text-xs text-slate-500">P0 범위의 추천, Tool 경고, 부품 변경 진입을 한 번에 확인합니다.</p>
              </div>
              <Link to="/my/quotes" className="text-sm font-bold text-brand-blue hover:underline">내 견적함 보기</Link>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {builds.map((build) => (
                <BuildPreviewCard key={build.id} build={build} />
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <section className="panel p-5">
              <div className="mb-4">
                <h2 className="text-lg font-black text-slate-950">부품 바로가기</h2>
                <p className="mt-1 text-xs text-slate-500">내부 자산과 저장된 가격 기준으로 직접 비교합니다.</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickCategories.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 transition hover:border-brand-blue hover:bg-brand-pale focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    <div className="flex items-center gap-2 text-sm font-black text-slate-950">
                      <item.icon size={16} className="text-brand-blue" />
                      {item.label}
                    </div>
                    <div className="mt-1 text-[11px] leading-4 text-slate-500">{item.detail}</div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="panel p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded bg-emerald-50 text-emerald-700">
                  <LifeBuoy size={18} />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-950">PC Agent / AS</h2>
                  <p className="text-xs text-slate-500">사용자 화면에는 티켓 번호만 제공합니다.</p>
                </div>
              </div>
              <div className="space-y-2 text-xs leading-5 text-slate-600">
                <div className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />최근 30분 JSONL 로그 업로드</div>
                <div className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />명시 동의 후 AS 티켓 생성</div>
                <div className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" />관리자 화면에서 원인 후보 검토</div>
              </div>
              <Link to="/support/new" className="mt-4 flex min-h-10 items-center justify-center rounded border border-slate-300 bg-white text-sm font-bold text-slate-800 hover:border-brand-blue hover:text-brand-blue">
                AS 접수로 이동
              </Link>
            </section>
          </div>
        </section>
      </div>
    </Screen>
  );
}

function BuildPreviewCard({ build }: { build: BuildSummary }) {
  const primaryWarning = build.warnings?.[0]?.message;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-brand-blue">{build.recommendedFor ?? '맞춤 추천'}</div>
          <h3 className="mt-1 text-base font-black leading-5 text-slate-950">{build.name}</h3>
        </div>
        <StatusBadge status={build.confidence} />
      </div>
      <p className="min-h-10 text-xs leading-5 text-slate-500">{build.summary ?? '내부 자산과 저장된 현재가 기준으로 구성했습니다.'}</p>
      <div className="mt-4 text-xl font-black text-slate-950">{build.totalPrice.toLocaleString()}원</div>
      <div className="mt-3 rounded bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
        {primaryWarning ?? '주요 조건 충족'}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link to={`/builds/${build.id}`} className="rounded bg-brand-blue px-3 py-2 text-xs font-bold text-white hover:bg-[#004f95]">상세 보기</Link>
        <Link to={`/builds/${build.id}/change-part`} className="rounded border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:border-brand-blue hover:text-brand-blue">부품 변경</Link>
      </div>
    </article>
  );
}
