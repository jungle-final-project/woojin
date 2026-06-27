import { Link } from 'react-router-dom';
import { AdminShell, DataTable, MetricCard, Panel, StateMessage, StatusBadge } from '../../components/ui';
import { adminTicketDetailRows, agentStateRows, parts, ragEvidenceRows, tickets, toolInvocationRows } from '../../data/prototypeData';
import { supportRows } from '../support/SupportPages';

export function AdminDashboardPage() {
  return (
    <AdminShell title="운영 대시보드">
      <div className="grid grid-cols-4 gap-4">
        <MetricCard label="LLM Queue" value="18초" tone="orange" />
        <MetricCard label="API p95" value="420ms" tone="green" />
        <MetricCard label="AS OPEN" value="12건" tone="orange" />
        <MetricCard label="추천 성공률" value="94%" tone="green" />
      </div>
      <div className="mt-5 grid grid-cols-[1fr_420px] gap-5">
        <Panel title="최근 Agent 세션">
          <DataTable columns={['id', 'user', 'status', 'action']} rows={[
            { id: 'demo-session', user: 'user@example.com', status: <StatusBadge status="PASS" />, action: <Link className="font-bold text-brand-blue" to="/admin/agent-sessions/demo-session">상세</Link> },
            { id: 'session-1002', user: 'dev@example.com', status: <StatusBadge status="WARN" />, action: '대기' }
          ]} />
        </Panel>
        <Panel title="운영 경고">
          <StateMessage type="warn" title="가격 Job 지연" body="네이버 API mock job이 마지막 갱신 후 23시간 경과했습니다." />
        </Panel>
      </div>
    </AdminShell>
  );
}

export function AgentSessionAdminPage() {
  return (
    <AdminShell title="Agent / RAG / Tool 근거 상세">
      <div className="grid grid-cols-[1fr_520px] gap-5">
        <Panel title="Agent 상태 전이" subtitle="3번 담당자가 session/run/fallback을 구현할 기준 상태">
          <DataTable columns={['step', 'state', 'owner', 'api', 'output']} rows={agentStateRows} />
        </Panel>
        <Panel title="실행 정책">
          <StateMessage type="info" title="제한된 Agent" body="무제한 자율 Agent가 아니라 RAG 검색, Tool 검증, 설명 생성 순서를 고정한 오케스트레이터로 구현합니다." />
          <div className="mt-4 rounded bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-200">
            QUEUED → RUNNING → RAG_SEARCHED → TOOLS_CALLED → SUMMARY_READY<br />
            실패 시: FAILED → FALLBACK_READY
          </div>
        </Panel>
        <Panel title="Tool 호출 이력">
          <DataTable columns={['id', 'tool', 'status', 'confidence', 'latency', 'summary']} rows={toolInvocationRows.map((row) => ({ ...row, id: <Link className="font-bold text-brand-blue" to={`/admin/tool-invocations/${row.id}`}>{row.id}</Link>, status: <StatusBadge status={row.status} />, confidence: <StatusBadge status={row.confidence} /> }))} />
        </Panel>
        <Panel title="RAG Evidence">
          <DataTable columns={['id', 'sourceId', 'summary', 'score', 'owner']} rows={ragEvidenceRows.map((row) => ({ ...row, id: <Link className="font-bold text-brand-blue" to={`/admin/rag-evidence/${row.id}`}>{row.id}</Link> }))} />
        </Panel>
      </div>
    </AdminShell>
  );
}

export function ToolInvocationAdminPage() {
  return (
    <AdminShell title="Tool Invocation 상세">
      <div className="grid grid-cols-[1fr_420px] gap-5">
        <Panel title="호출 상세" subtitle="2번/3번 담당자가 Tool request, result, evidence 저장을 연결할 화면">
          <DataTable columns={['필드', '값']} rows={[
            { 필드: 'invocationId', 값: 'tool-power-001' },
            { 필드: 'tool', 값: 'power' },
            { 필드: 'status', 값: <StatusBadge status="WARN" /> },
            { 필드: 'confidence', 값: <StatusBadge status="MEDIUM" /> },
            { 필드: 'latency', 값: '168ms' },
            { 필드: 'sessionId', 값: 'demo-session' }
          ]} />
        </Panel>
        <Panel title="표준 응답 형식">
          <div className="rounded bg-slate-950 p-5 font-mono text-xs leading-6 text-slate-200">
            {'{'}<br />
            &nbsp;&nbsp;"status": "PASS | WARN | FAIL",<br />
            &nbsp;&nbsp;"score": 0.82,<br />
            &nbsp;&nbsp;"confidence": "LOW | MEDIUM | HIGH",<br />
            &nbsp;&nbsp;"warnings": ["피크 전력 여유율 부족"],<br />
            &nbsp;&nbsp;"evidence": ["psu-rule-001"]<br />
            {'}'}
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}

export function RagEvidenceAdminPage() {
  return (
    <AdminShell title="RAG Evidence 상세">
      <div className="grid grid-cols-[1fr_420px] gap-5">
        <Panel title="근거 문서" subtitle="3번 담당자가 pgvector 검색 결과와 source metadata를 연결할 화면">
          <DataTable columns={['필드', '값']} rows={[
            { 필드: 'evidenceId', 값: 'rag-psu-001' },
            { 필드: 'sourceId', 값: 'psu-rule-001' },
            { 필드: 'score', 값: '0.91' },
            { 필드: 'usedBy', 값: 'tool-power-001' },
            { 필드: 'summary', 값: 'GPU 피크 전력과 CPU TDP 합산 후 여유율 적용' }
          ]} />
        </Panel>
        <Panel title="구현 메모">
          <StateMessage type="info" title="자동 학습 아님" body="Feedback Loop는 모델 자동 학습이 아니라 오차와 개선 후보를 관리자 화면에 기록하는 방식입니다." />
        </Panel>
      </div>
    </AdminShell>
  );
}

export function AdminPartsPage() {
  return (
    <AdminShell title="부품 / 가격 관리자">
      <div className="grid grid-cols-[1fr_360px] gap-5">
        <Panel title="부품 DB">
          <DataTable columns={['id', 'category', 'name', 'price', 'status']} rows={parts.map((part) => ({ ...part, price: `${part.price.toLocaleString()}원`, status: <StatusBadge status={part.status} /> }))} />
        </Panel>
        <Panel title="가격 Job 상태">
          <StateMessage type="info" title="목표가 비교 기준" body="배송비/쿠폰/카드할인 제외 표시 가격 기준으로 하루 1회 스냅샷을 저장합니다." />
          <button className="mt-5 w-full rounded bg-brand-blue px-4 py-3 text-sm font-bold text-white">가격 Job 실행</button>
        </Panel>
      </div>
    </AdminShell>
  );
}

export function AdminTicketsPage() {
  return (
    <AdminShell title="AS 티켓 관리자">
      <div className="grid grid-cols-[1fr_480px] gap-5">
        <Panel title="티켓 큐">
          <DataTable columns={['id', 'user', 'symptom', 'status', 'cause']} rows={supportRows.map((row) => ({ ...row, id: <Link className="font-bold text-brand-blue" to={`/admin/as-tickets/${row.id}`}>{row.id}</Link> }))} />
        </Panel>
        <Panel title="선택 티켓 상세">
          <DataTable columns={['필드', '값']} rows={[
            { 필드: 'ticketId', 값: tickets[0].id },
            { 필드: '원인 후보', 값: tickets[0].cause },
            { 필드: '최근 로그', 값: 'GPU 88도, 사용률 96%, VRAM 89%' },
            { 필드: '추천 조치', 값: '쿨링 확인 및 드라이버 재설치 안내' }
          ]} />
          <div className="mt-5 flex gap-3">
            <button className="rounded bg-brand-blue px-4 py-3 text-sm font-bold text-white">담당자 배정</button>
            <button className="rounded border border-slate-300 px-4 py-3 text-sm font-bold">상태 저장</button>
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}

export function AdminTicketDetailPage() {
  return (
    <AdminShell title="AS 티켓 상세">
      <div className="grid grid-cols-[1fr_440px] gap-5">
        <Panel title="티켓 / 로그 / 동의 정책" subtitle="4번 담당자가 로그 업로드와 얕은 AS 후보를 연결할 기준 화면">
          <DataTable columns={['field', 'value']} rows={adminTicketDetailRows} />
        </Panel>
        <Panel title="관리자 조치">
          <StateMessage type="warn" title="사용자 화면 노출 제한" body="사용자에게는 티켓 번호와 접수 상태만 표시하고, 원인 후보와 로그 요약은 관리자 화면에서만 확인합니다." />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button className="rounded bg-brand-blue px-4 py-3 text-sm font-bold text-white">담당자 배정</button>
            <button className="rounded border border-slate-300 px-4 py-3 text-sm font-bold">상태 저장</button>
            <button className="rounded border border-slate-300 px-4 py-3 text-sm font-bold">로그 다운로드</button>
            <button className="rounded border border-slate-300 px-4 py-3 text-sm font-bold">업그레이드 후보 등록</button>
          </div>
        </Panel>
      </div>
    </AdminShell>
  );
}
