# 에듀웨이브교육원 홈페이지

직장 내 교육 전문기관을 위한 완전한 웹사이트입니다.

## 🎯 주요 기능

- ✅ 반응형 웹 디자인 (모바일/태블릿/PC 모두 지원)
- ✅ 강사 소개 페이지
- ✅ 강의 프로그램 상세 페이지
- ✅ 강의 신청 폼
- ✅ Google Sheets 자동 연동
- ✅ Google Calendar 일정 자동 생성 (선택사항)
- ✅ GitHub Pages 무료 호스팅
- ✅ 커스텀 도메인 연결 가능

## 📁 파일 구조

```
eduwave-website/
├── index.html          # 메인 홈페이지
├── about.html          # 강사 소개
├── courses.html        # 강의 소개
├── apply.html          # 강의 신청
├── styles.css          # 디자인 스타일
├── script.js           # JavaScript 기능
├── google-script.gs    # Google Apps Script 코드
├── CNAME              # 도메인 연결 파일
├── images/            # 이미지 폴더
│   └── README.md      # 이미지 가이드
└── README.md          # 이 파일
```

## 🚀 빠른 시작 (완전 초보자용)

### 1단계: 파일 다운로드
1. 이 ZIP 파일을 다운로드했다면 압축을 풉니다
2. 폴더를 바탕화면에 놓습니다

### 2단계: 내용 수정하기
1. 각 HTML 파일을 메모장이나 텍스트 에디터로 엽니다
2. `✏️ 수정 가능:` 주석이 있는 부분을 찾습니다
3. 따옴표 안의 텍스트만 수정합니다
4. 저장합니다

**예시:**
```html
<!-- ✏️ 수정 가능: 강사 이름 -->
<h2>김선생</h2>
```
→ "김선생"을 여러분의 이름으로 바꾸세요

### 3단계: 이미지 준비하기
1. `images` 폴더를 엽니다
2. 필요한 이미지를 준비합니다:
   - hero-image.jpg (메인 이미지)
   - instructor.jpg (강사 사진)
   - course-1.jpg, course-2.jpg 등 (강의 이미지)
3. 자세한 내용은 `images/README.md` 참조

### 4단계: GitHub에 업로드
1. https://github.com 가입 및 로그인
2. 우측 상단 **+** 버튼 > **New repository**
3. Repository name: `eduwave-website` 입력
4. **Public** 선택
5. **Create repository** 클릭
6. **uploading an existing file** 클릭
7. 모든 파일을 드래그 앤 드롭
8. **Commit changes** 클릭

### 5단계: GitHub Pages 활성화
1. Repository에서 **Settings** 탭 클릭
2. 좌측 메뉴 **Pages** 클릭
3. Source: **main** 선택
4. **Save** 클릭
5. 1-2분 후 사이트 주소 확인
   - 형식: `https://사용자명.github.io/eduwave-website/`

## 📝 수정 가능한 내용

### HTML 파일에서 수정:
- ✏️ 표시가 있는 모든 텍스트
- 기관명, 강사명, 연락처
- 강의 제목 및 설명
- 경력 및 학력 사항

### CSS 파일에서 수정:
- 색상 (파일 최상단의 변수들)
- 폰트 크기
- 간격

### 수정하면 안 되는 것:
- ⚠️ 표시가 있는 부분
- HTML 태그 (`<div>`, `<p>` 등)
- class나 id 속성

## 🔗 Google Sheets 연동 설정

### 준비물:
- Google 계정

### 설정 단계:

#### 1. Google Sheets 준비
1. https://sheets.google.com 접속
2. **+ 새로 만들기** 클릭
3. 제목: "에듀웨이브_강의신청" 입력
4. 첫 번째 줄에 열 제목 입력:
   ```
   신청일시 | 기관명 | 담당자명 | 연락처 | 이메일 | 희망강의 | 희망날짜 | 희망시간 | 예상인원 | 교육장소 | 추가요청사항
   ```

#### 2. Apps Script 열기
1. 상단 메뉴 **확장 프로그램** > **Apps Script**
2. 기존 코드 모두 지우기
3. `google-script.gs` 파일의 내용 전체 복사
4. 붙여넣기
5. 저장 (💾 아이콘)

#### 3. 배포하기
1. 우측 상단 **배포** > **새 배포**
2. ⚙️ 아이콘 (유형 선택) > **웹 앱** 선택
3. 설정:
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자** ⚠️ 매우 중요!
4. **배포** 클릭

#### 4. 권한 승인
1. **액세스 권한 부여** 클릭
2. 계정 선택
3. "Google에서 확인하지 않은 앱" 나오면:
   - **고급** 클릭
   - **[프로젝트명](으)로 이동** 클릭
   - **허용** 클릭

#### 5. URL 복사
1. "웹 앱 URL" 나타남
2. 전체 복사 (예: `https://script.google.com/macros/s/AKfycby.../exec`)

#### 6. script.js에 URL 붙여넣기
1. `script.js` 파일 열기
2. 이 부분 찾기:
   ```javascript
   const SCRIPT_URL = ""; // ← 여기에 URL 붙여넣기
   ```
3. 따옴표 안에 URL 붙여넣기:
   ```javascript
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
   ```
4. 저장
5. GitHub에 파일 다시 업로드

#### 7. 테스트
1. 웹사이트에서 강의 신청 해보기
2. Google Sheets 확인
3. 데이터가 들어왔으면 성공! 🎉

## 📅 Google Calendar 연동 (선택사항)

### 1. Calendar ID 찾기
1. https://calendar.google.com 접속
2. 좌측 "내 캘린더" 목록에서 사용할 캘린더 찾기
3. ⋮ (점 3개) > **설정 및 공유**
4. "캘린더 통합" 섹션에서 "캘린더 ID" 복사
   - 형식: `your-email@gmail.com`

### 2. Apps Script 수정
1. Google Sheets > 확장 프로그램 > Apps Script
2. 맨 위에 이 줄 찾기:
   ```javascript
   // const CALENDAR_ID = "your-email@gmail.com";
   ```
3. 주석 제거하고 Calendar ID 입력:
   ```javascript
   const CALENDAR_ID = "your-email@gmail.com";
   ```
4. 저장

### 3. 재배포
1. **배포** > **배포 관리**
2. ✏️ 아이콘 > **새 버전**
3. **배포** 클릭
4. URL은 변경 없음 (그대로 사용)

### 4. 권한 재승인
- 코드 실행 시 권한 요청 나오면 승인

## 🌐 도메인 연결 (선택사항)

### 1. 도메인 구매
추천 업체:
- 가비아: https://www.gabia.com
- 후이즈: https://www.whois.co.kr

비용: 연간 15,000~20,000원

### 2. DNS 설정
도메인 업체 관리 페이지에서:

**A 레코드 추가 (4개):**
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**CNAME 레코드 추가:**
- 호스트: `www`
- 값: `사용자명.github.io`

### 3. CNAME 파일 수정
1. `CNAME` 파일 열기
2. 구매한 도메인 입력 (예: `eduwave.com`)
3. 저장 및 GitHub에 업로드

### 4. GitHub Pages 설정
1. Settings > Pages
2. Custom domain에 도메인 입력
3. **Save** 클릭
4. "Enforce HTTPS" 체크 (24시간 후)

### 5. 대기
- DNS 전파: 1-48시간
- 보통 1-2시간이면 작동

## ❓ 자주 묻는 질문

### Q: 수정했는데 사이트에 반영이 안 돼요
A: 다음을 시도하세요:
1. 브라우저 캐시 삭제 (Ctrl+Shift+R)
2. 5-10분 대기 (GitHub Pages 반영 시간)
3. 시크릿 모드로 확인
4. GitHub에서 파일이 제대로 업로드됐는지 확인

### Q: 폼을 제출했는데 Google Sheets에 안 들어가요
A: 체크리스트:
- [ ] `script.js`에 Google Apps Script URL이 입력됐나요?
- [ ] URL이 따옴표 안에 있나요?
- [ ] Apps Script 배포 시 "모든 사용자" 선택했나요?
- [ ] 권한을 승인했나요?
- [ ] 브라우저 콘솔(F12)에 오류가 있나요?

### Q: 이미지가 X로 표시돼요
A: 다음을 확인하세요:
- [ ] 이미지 파일이 `images` 폴더 안에 있나요?
- [ ] 파일명이 HTML과 정확히 일치하나요?
- [ ] 파일명에 한글이나 띄어쓰기가 없나요?
- [ ] 대소문자가 일치하나요? (photo.jpg ≠ Photo.jpg)

### Q: 모바일에서 이상하게 보여요
A: CSS 파일의 반응형 코드를 수정하지 않았는지 확인하세요. 원본 파일을 다시 받아 비교해보세요.

### Q: 비용이 드나요?
A: 
- GitHub Pages: **무료**
- Google Sheets/Calendar: **무료**
- 도메인: 연간 15,000~20,000원 (선택사항)

## 🛠️ GitHub에서 파일 수정하기

### 방법 1: 웹에서 직접 수정
1. GitHub Repository 접속
2. 수정할 파일 클릭
3. 연필 ✏️ 아이콘 클릭
4. 내용 수정
5. 하단 **Commit changes** 클릭

### 방법 2: 파일 재업로드
1. 로컬에서 파일 수정
2. GitHub에서 기존 파일 삭제
3. 새 파일 업로드
4. Commit

## 📞 도움이 필요하면

### 1. 문서 확인
- 이 README 파일
- `images/README.md` (이미지 가이드)
- 각 파일의 주석

### 2. 브라우저 개발자 도구
- F12 키 > Console 탭
- 오류 메시지 확인

### 3. GitHub Issues
- Repository에서 Issues 탭
- 문제 상황 설명 및 스크린샷 첨부

## 📋 체크리스트

배포 완료 확인:
- [ ] GitHub에 모든 파일 업로드 완료
- [ ] GitHub Pages 활성화 완료
- [ ] 사이트 주소로 접속 가능
- [ ] 모든 페이지 정상 작동
- [ ] 이미지 모두 표시됨
- [ ] Google Sheets 연동 완료
- [ ] 강의 신청 폼 작동 테스트 완료
- [ ] 모바일에서 확인 완료

## 🎨 커스터마이징 팁

### 색상 변경
`styles.css` 파일 상단:
```css
:root {
    --primary-color: #1e40af;  /* 원하는 색상 코드로 변경 */
    --accent-color: #dc2626;
}
```

색상 선택 사이트:
- https://htmlcolorcodes.com/kr/

### 로고 추가
네비게이션의 텍스트 로고를 이미지로 교체:
```html
<a href="index.html" class="logo">
    <img src="images/logo.png" alt="에듀웨이브교육원" style="height: 40px;">
</a>
```

## 📄 라이선스

이 프로젝트는 자유롭게 사용 가능합니다.

## 🙏 크레딧

- 폰트: Google Fonts (Noto Sans KR, Playfair Display)
- 아이콘: Unicode Emoji

---

**제작:** Claude AI  
**버전:** 1.0.0  
**최종 수정:** 2024년 12월

💡 **팁:** 수정하기 전에 항상 백업을 만드세요!
