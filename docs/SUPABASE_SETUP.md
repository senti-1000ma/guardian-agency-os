# Supabase 설정 가이드

## 1️⃣ Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: guardian-agency-os
   - **Database Password**: 안전한 비밀번호 생성 (저장 필수!)
   - **Region**: Northeast Asia (Seoul)
4. "Create new project" 클릭 (약 2분 소요)

---

## 2️⃣ API 키 복사

프로젝트 생성 후:
1. 좌측 메뉴에서 **Settings** → **API** 클릭
2. 다음 값들을 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

3. `.env.local` 파일에 붙여넣기:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 3️⃣ Database Schema 설정

Supabase SQL Editor에서 다음 SQL 실행:

```sql
-- Users table (Supabase Auth 자동 생성, 확장용)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  company_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policy
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Plans table
create table public.plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  stripe_price_id text unique,
  price integer not null,
  interval text not null, -- 'month' or 'year'
  features jsonb,
  limits jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default plans
insert into public.plans (name, stripe_price_id, price, interval, features, limits) values
  ('Starter', null, 0, 'month', 
   '["AI 문장 다듬기 (월 50회)", "기본 계약서 검토 (월 3건)", "프로젝트 관리 대시보드", "표준 계약서 템플릿"]'::jsonb,
   '{"ai_refine": 50, "contract_scan": 3, "projects": 5}'::jsonb),
  ('Pro', 'price_stripe_pro_monthly', 29, 'month',
   '["무제한 AI 문장 다듬기", "독소조항 탐지기 무제한", "클라이언트 포털", "오토 인보이스", "우선 지원"]'::jsonb,
   '{"ai_refine": -1, "contract_scan": -1, "projects": -1}'::jsonb),
  ('Agency', 'price_stripe_agency_monthly', 99, 'month',
   '["최대 5명 팀원", "멀티 브랜드", "API 액세스", "전담 매니저", "High-Volume"]'::jsonb,
   '{"ai_refine": -1, "contract_scan": -1, "projects": -1, "team_members": 5}'::jsonb);

-- Subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_id uuid references public.plans on delete cascade not null,
  status text not null, -- 'active', 'canceled', 'past_due'
  stripe_subscription_id text unique,
  stripe_customer_id text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscriptions."
  on subscriptions for select
  using ( auth.uid() = user_id );

-- Payment history
create table public.payment_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  subscription_id uuid references public.subscriptions on delete set null,
  amount integer not null,
  currency text default 'usd',
  status text not null,
  stripe_invoice_id text unique,
  stripe_payment_intent_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.payment_history enable row level security;

create policy "Users can view their own payment history."
  on payment_history for select
  using ( auth.uid() = user_id );

-- Function: Handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger: Create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 4️⃣ Authentication Settings

Supabase Dashboard에서:
1. **Authentication** → **Providers** 클릭
2. **Email** 활성화 (기본 활성화됨)
3. **Google OAuth** 설정 (선택):
   - Google Cloud Console에서 OAuth 클라이언트 ID 생성
   - Authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`
   - Client ID와 Secret 입력
4. **GitHub OAuth** 설정 (선택):
   - GitHub Settings → Developer settings → OAuth Apps
   - Authorization callback URL: `https://your-project.supabase.co/auth/v1/callback`
   - Client ID와 Secret 입력

---

## 5️⃣ 확인

`.env.local` 파일이 올바르게 설정되었는지 확인:
```bash
cat .env.local
```

모든 키가 채워졌다면 서버 재시작:
```bash
npm run dev
```

---

## ✅ 완료!

이제 Supabase가 준비되었습니다. 다음 단계로 진행하시면 됩니다.
