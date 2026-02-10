# Vercel 배포 가이드

친구들에게 자랑할 시간입니다! 🚀

---

## 📋 사전 준비

1. **GitHub 리포지토리 생성**
   - GitHub에서 새 리포지토리 생성
   - 리포지토리 이름: `guardian-agency-os`
   - Public 또는 Private 선택

2. **로컬 프로젝트를 GitHub에 Push**
   ```bash
   cd "c:/Users/als44/OneDrive/바탕 화면/100ma/guardian-agent"
   
   # Git 초기화 (아직 안 했다면)
   git init
   
   # .gitignore 확인 (.env.local이 포함되어 있는지 확인)
   
   # 모든 파일 추가
   git add .
   
   # 커밋
   git commit -m "Initial commit: Guardian Agency OS"
   
   # GitHub 리포지토리 연결
   git remote add origin https://github.com/YOUR_USERNAME/guardian-agency-os.git
   
   # Push
   git push -u origin main
   ```

---

## 🚀 Vercel 배포

### 1단계: Vercel 계정 생성
1. [Vercel](https://vercel.com)에 접속
2. **Sign Up with GitHub** 클릭
3. GitHub 계정으로 로그인

### 2단계: 프로젝트 Import
1. Vercel Dashboard에서 **Add New** → **Project** 클릭
2. GitHub 리포지토리 목록에서 `guardian-agency-os` 선택
3. **Import** 클릭

### 3단계: 환경 변수 설정
**매우 중요!** `.env.local`의 모든 환경 변수를 Vercel에 추가해야 합니다.

Vercel Project Settings에서:
1. **Settings** →  **Environment Variables** 클릭
2. 다음 변수들을 추가:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL (Vercel이 제공하는 URL로 업데이트할 예정)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

> ⚠️ **주의**: `NEXT_PUBLIC_APP_URL`은 배포 후 Vercel이 제공하는 실제 URL로 업데이트해야 합니다.

### 4단계: 배포
1. **Deploy** 버튼 클릭
2. 약 2-3분 기다리면 배포 완료!
3. Vercel이 제공하는 URL 확인 (예: `https://guardian-agency-os.vercel.app`)

---

## 🔄 배포 후 설정 업데이트

### 1. App URL 업데이트
배포가 완료되면:
1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `NEXT_PUBLIC_APP_URL` 값을 실제 Vercel URL로 업데이트
   ```
   NEXT_PUBLIC_APP_URL=https://guardian-agency-os.vercel.app
   ```
3. **Save** 클릭
4. **Deployments** → 최신 배포 → **Redeploy** 클릭

### 2. Supabase Redirect URLs 업데이트
Supabase Dashboard에서:
1. **Authentication** → **URL Configuration**
2. **Site URL**에 Vercel URL 추가:
   ```
   https://guardian-agency-os.vercel.app
   ```
3. **Redirect URLs**에 OAuth 콜백 URL 추가:
   ```
   https://guardian-agency-os.vercel.app/auth/callback
   ```

### 3. Stripe Webhook 설정 (중요!)
Stripe Dashboard에서:
1. **Developers** → **Webhooks** 클릭
2. **Add endpoint** 클릭
3. Endpoint URL 입력:
   ```
   https://guardian-agency-os.vercel.app/api/webhooks/stripe
   ```
4. 다음 이벤트 선택:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Webhook signing secret 복사
6. Vercel Environment Variables에 `STRIPE_WEBHOOK_SECRET` 업데이트
7. Vercel에서 Redeploy

---

## 🎉 완료!

이제 친구들에게 자랑할 준비 완료! 

**공유 링크**: `https://guardian-agency-os.vercel.app`

---

## 📱 모바일 테스트

모바일에서도 완벽하게 작동합니다:
- **QR 코드**: Vercel Dashboard에서 QR 코드 생성 가능
- **친구 공유**: URL을 카카오톡/문자로 공유

---

## 🔧 자동 배포 설정

Vercel은 자동으로 설정됩니다:
- **main 브랜치에 Push** → 자동 Production 배포
- **다른 브랜치에 Push** → 자동 Preview 배포
- **Pull Request** → 자동 Preview 링크 생성

코드를 수정하고 `git push`만 하면 자동으로 배포됩니다!

```bash
git add .
git commit -m "Add new feature"
git push
```

2-3분 후 변경사항이 반영됩니다!

---

## 🎯 Next Steps

1. ✅ Supabase 프로젝트 생성 완료
2. ✅ Environment Variables 설정 완료  
3. ✅ Vercel 배포 완료
4. 🔄 OAuth URLs 업데이트
5. 🔄 Stripe Webhook 설정
6. 🎉 친구들에게 자랑!
