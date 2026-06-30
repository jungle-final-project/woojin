import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, FileText, LifeBuoy, LogIn, LogOut, Search, ShieldCheck, UserRound } from 'lucide-react';
import { getCurrentUser, type CurrentUser } from '../../features/auth/authApi';
import { AUTH_CHANGED_EVENT, ApiError, clearToken, getToken } from '../../lib/api';
import { PrimaryNav } from './PrimaryNav';

export function AppHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [checkingUser, setCheckingUser] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCurrentUser() {
      if (!getToken()) {
        setUser(null);
        setCheckingUser(false);
        return;
      }

      setCheckingUser(true);
      try {
        const currentUser = await getCurrentUser();
        if (!cancelled) {
          setUser(currentUser);
        }
      } catch (error) {
        if (!cancelled) {
          setUser(null);
        }
        if (error instanceof ApiError && error.status === 401) {
          clearToken();
        }
      } finally {
        if (!cancelled) {
          setCheckingUser(false);
        }
      }
    }

    void loadCurrentUser();
    window.addEventListener(AUTH_CHANGED_EVENT, loadCurrentUser);
    window.addEventListener('storage', loadCurrentUser);

    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_CHANGED_EVENT, loadCurrentUser);
      window.removeEventListener('storage', loadCurrentUser);
    };
  }, []);

  function logout() {
    clearToken();
    navigate('/login');
  }

  return (
    <>
      <div className="bg-brand-navy text-xs text-slate-200">
        <div className="mx-auto flex min-h-[30px] w-full max-w-[1320px] flex-col gap-1 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
          <span>BuildGraph AI prototype · 검증형 PC 컨설팅</span>
          <span>{user ? `로그인됨 · ${user.email} · ${user.role}` : checkingUser ? '로그인 상태 확인 중' : '로그인 필요 · 회원가입 · 관리자 · PC Agent'}</span>
        </div>
      </div>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1320px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8 xl:px-0">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded bg-brand-blue text-sm font-bold text-white">BG</div>
            <div>
              <div className="text-xl font-bold leading-5 text-brand-navy">BuildGraph AI</div>
              <div className="text-xs text-slate-500">AI PC consulting platform</div>
            </div>
          </Link>
          <div className="order-last flex h-11 w-full items-center rounded border border-slate-300 bg-slate-50 px-3 lg:order-none lg:ml-6 lg:w-[min(38vw,560px)]">
            <Search size={17} className="text-slate-400" />
            <input className="ml-2 flex-1 bg-transparent text-sm outline-none" placeholder="예: QHD 게임용 200만원 PC" />
            <button className="rounded bg-brand-blue px-4 py-1.5 text-xs font-semibold text-white">검색</button>
          </div>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            <HeaderButton to="/requirements/new" icon={<Bot size={15} />} label="AI 견적" />
            <HeaderButton to="/my/quotes" icon={<FileText size={15} />} label="내 견적함" />
            <HeaderButton to="/support/new" icon={<LifeBuoy size={15} />} label="AS 접수" />
            {user ? (
              <>
                <div className="flex h-9 max-w-[170px] items-center gap-2 rounded border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 sm:max-w-none">
                  {user.role === 'ADMIN' ? <ShieldCheck size={15} /> : <UserRound size={15} />}
                  <span className="truncate">{user.name || user.email}</span>
                </div>
                <button onClick={logout} className="flex h-9 items-center gap-1 rounded bg-brand-navy px-3 text-xs font-semibold text-white">
                  <LogOut size={15} />
                  로그아웃
                </button>
              </>
            ) : (
              <HeaderButton to="/login" icon={<LogIn size={15} />} label="로그인" dark />
            )}
          </div>
        </div>
      </header>
      <PrimaryNav />
    </>
  );
}

function HeaderButton({ to, icon, label, dark }: { to: string; icon: ReactNode; label: string; dark?: boolean }) {
  return (
    <Link to={to} className={`flex h-9 items-center gap-1 whitespace-nowrap rounded px-3 text-xs font-semibold ${dark ? 'bg-brand-navy text-white' : 'border border-slate-300 bg-white text-slate-700'}`}>
      {icon}
      {label}
    </Link>
  );
}
