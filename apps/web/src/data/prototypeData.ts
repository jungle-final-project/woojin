export const categories = ['AI 추천', '셀프 견적', 'CPU', '메인보드', 'RAM', 'GPU', 'SSD', '파워', '케이스', '목표가 알림', 'PC Agent', 'AS 접수'];

export const parts = [
  { id: 'cpu-7600', category: 'CPU', name: 'AMD Ryzen 5 7600', price: 259000, status: 'PASS', score: 94 },
  { id: 'mb-b650', category: 'MAINBOARD', name: 'B650M WiFi', price: 179000, status: 'PASS', score: 91 },
  { id: 'ram-32', category: 'RAM', name: 'DDR5 32GB 5600', price: 128000, status: 'PASS', score: 96 },
  { id: 'gpu-4070s', category: 'GPU', name: 'RTX 4070 SUPER 12GB', price: 890000, status: 'WARN', score: 89 },
  { id: 'ssd-1tb', category: 'SSD', name: 'NVMe Gen4 1TB', price: 99000, status: 'PASS', score: 88 },
  { id: 'psu-750', category: 'PSU', name: '750W 80+ Gold', price: 126000, status: 'PASS', score: 93 }
];

export const builds = [
  { id: 'bg-1001', name: 'QHD 게임 균형형', price: 1980000, confidence: 'MEDIUM', warning: 'PSU 여유율 확인 필요', useCase: 'QHD gaming' },
  { id: 'bg-1002', name: '개발 + 게임 혼합형', price: 2120000, confidence: 'HIGH', warning: 'RAM 32GB 권장', useCase: 'dev + gaming' },
  { id: 'bg-1003', name: 'AI 실습 입문형', price: 1620000, confidence: 'MEDIUM', warning: 'VRAM 한계 가능성', useCase: 'AI practice' }
];

export const tickets = [
  { id: 'AS-1031', user: 'user@example.com', symptom: '게임 중 프레임 급락', status: 'OPEN', cause: 'GPU 온도 과열 가능성', confidence: 'MEDIUM' },
  { id: 'AS-1032', user: 'dev@example.com', symptom: 'IDE 실행 시 메모리 부족', status: 'IN_PROGRESS', cause: 'RAM 사용률 92% 반복', confidence: 'HIGH' }
];

export const toolRows = [
  { tool: 'compatibility', status: 'PASS', confidence: 'HIGH', summary: 'CPU와 메인보드 소켓 호환' },
  { tool: 'power', status: 'WARN', confidence: 'MEDIUM', summary: '피크 전력 기준 PSU 여유율 낮음' },
  { tool: 'performance', status: 'PASS', confidence: 'MEDIUM', summary: 'QHD 게임 기준 GPU 우선 구성 적합' },
  { tool: 'price', status: 'PASS', confidence: 'LOW', summary: '최근 스냅샷 기준 예산 내 구성' }
];

export const agentStateRows = [
  { step: '1', state: 'INPUT_RECEIVED', owner: 'Frontend', api: 'POST /api/requirements/parse', output: 'Requirement' },
  { step: '2', state: 'RAG_SEARCHED', owner: 'RAG Service', api: 'GET /api/rag/search', output: 'RagEvidence[]' },
  { step: '3', state: 'TOOLS_CALLED', owner: 'Agent Orchestrator', api: 'POST /api/agent/sessions/:id/run', output: 'ToolInvocation[]' },
  { step: '4', state: 'SUMMARY_READY', owner: 'Agent + LLM', api: 'GET /api/agent/sessions/:id', output: 'Build explanation' },
  { step: '5', state: 'FALLBACK_READY', owner: 'Backend', api: 'same session', output: 'Seed result when LLM fails' }
];

export const toolInvocationRows = [
  { id: 'tool-compat-001', tool: 'compatibility', status: 'PASS', confidence: 'HIGH', latency: '120ms', summary: 'CPU와 메인보드 소켓 호환' },
  { id: 'tool-power-001', tool: 'power', status: 'WARN', confidence: 'MEDIUM', latency: '168ms', summary: '피크 전력 기준 PSU 여유율 낮음' },
  { id: 'tool-perf-001', tool: 'performance', status: 'PASS', confidence: 'MEDIUM', latency: '210ms', summary: 'QHD 게임 기준 GPU 우선 구성 적합' },
  { id: 'tool-price-001', tool: 'price', status: 'PASS', confidence: 'LOW', latency: '340ms', summary: '최근 스냅샷 기준 예산 내 구성' }
];

export const ragEvidenceRows = [
  { id: 'rag-psu-001', sourceId: 'psu-rule-001', summary: 'GPU 피크 전력과 CPU TDP 합산 후 여유율 적용', score: '0.91', owner: '3번 Agent/RAG' },
  { id: 'rag-qhd-001', sourceId: 'qhd-gaming-4070s', summary: 'QHD 게임 기준 GPU 우선 구성 근거', score: '0.84', owner: '3번 Agent/RAG' },
  { id: 'rag-log-001', sourceId: 'as-thermal-001', summary: 'GPU 온도 상승과 프레임 드랍 간 단순 상관 규칙', score: '0.78', owner: '4번 Log/AS' }
];

export const adminTicketDetailRows = [
  { field: 'ticketId', value: 'AS-1031' },
  { field: 'user', value: 'user@example.com' },
  { field: 'symptom', value: '게임 중 프레임 급락' },
  { field: 'logRange', value: '최근 30분' },
  { field: 'consent', value: '로그 업로드 명시 동의 필요' },
  { field: 'retention', value: '업로드 로그 30일 보관 후 삭제 예정' },
  { field: 'causeCandidate1', value: 'GPU 온도 과열 가능성' },
  { field: 'causeCandidate2', value: '드라이버 오류 이벤트 반복 가능성' },
  { field: 'upgradeCandidate', value: '케이스 쿨링 또는 GPU 상위 모델 후보 표시' }
];
