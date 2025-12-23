// ===========================================
// 에듀웨이브교육원 JavaScript
// ===========================================

// ⚠️⚠️⚠️ 중요: Google Sheets 연동 설정 ⚠️⚠️⚠️
// 
// 1. Google Sheets에서 Apps Script를 배포하세요
// 2. 웹 앱 URL을 복사하세요
// 3. 아래 빈 따옴표 안에 URL을 붙여넣으세요
// 
// 예시: const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
//
const SCRIPT_URL = ""; // ← 여기에 Google Apps Script 웹앱 URL 붙여넣기

// ⚠️ 주의: 위 URL을 입력하지 않으면 폼이 작동하지 않습니다!

// ===========================================
// 모바일 메뉴
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // 햄버거 아이콘 애니메이션
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // 메뉴 링크 클릭 시 모바일 메뉴 닫기
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===========================================
// 폼 제출 처리
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // URL 확인
    if (!SCRIPT_URL || SCRIPT_URL === "") {
        console.error('❌ 오류: Google Sheets URL이 설정되지 않았습니다!');
        console.error('→ script.js 파일을 열어 SCRIPT_URL을 설정하세요.');
        showError('시스템 설정 오류입니다. 관리자에게 문의해주세요.');
        return;
    }
    
    // 버튼 비활성화 및 로딩 표시
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingText = document.getElementById('loadingText');
    
    submitBtn.disabled = true;
    submitText.style.display = 'none';
    loadingText.style.display = 'inline';
    
    // 폼 데이터 수집
    const formData = {
        organization: document.getElementById('organization').value,
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        participants: document.getElementById('participants').value,
        location: document.getElementById('location').value,
        notes: document.getElementById('notes').value,
        timestamp: new Date().toISOString()
    };
    
    try {
        // Google Apps Script로 데이터 전송
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        // no-cors 모드에서는 응답을 읽을 수 없으므로
        // 전송이 완료되면 성공으로 간주
        showSuccess();
        
    } catch (error) {
        console.error('전송 오류:', error);
        showError('신청서 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        
        // 버튼 다시 활성화
        submitBtn.disabled = false;
        submitText.style.display = 'inline';
        loadingText.style.display = 'none';
    }
}

// ===========================================
// 성공 메시지 표시
// ===========================================

function showSuccess() {
    const form = document.getElementById('applicationForm');
    const successMessage = document.getElementById('successMessage');
    
    form.style.display = 'none';
    successMessage.style.display = 'block';
    
    // 페이지 상단으로 스크롤
    window.scrollTo({
        top: document.querySelector('.application-section').offsetTop - 100,
        behavior: 'smooth'
    });
}

// ===========================================
// 에러 메시지 표시
// ===========================================

function showError(message) {
    const form = document.getElementById('applicationForm');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    errorText.textContent = message;
    form.style.display = 'none';
    errorMessage.style.display = 'block';
    
    // 페이지 상단으로 스크롤
    window.scrollTo({
        top: document.querySelector('.application-section').offsetTop - 100,
        behavior: 'smooth'
    });
}

// ===========================================
// 에러 메시지 숨기기
// ===========================================

function hideError() {
    const form = document.getElementById('applicationForm');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const loadingText = document.getElementById('loadingText');
    
    errorMessage.style.display = 'none';
    form.style.display = 'block';
    
    // 버튼 상태 복원
    submitBtn.disabled = false;
    submitText.style.display = 'inline';
    loadingText.style.display = 'none';
}

// ===========================================
// 날짜 입력 최소값 설정 (오늘 이후만 선택 가능)
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});

// ===========================================
// 전화번호 자동 포맷팅
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 3 && value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length > 7) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
            
            e.target.value = value;
        });
    }
});

// ===========================================
// 스크롤 애니메이션
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .expertise-card, .stat-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===========================================
// 콘솔 로그 (디버깅용)
// ===========================================

console.log('%c에듀웨이브교육원 웹사이트', 'font-size: 20px; font-weight: bold; color: #1e40af;');
console.log('%c버전: 1.0.0', 'color: #64748b;');

if (!SCRIPT_URL || SCRIPT_URL === "") {
    console.warn('%c⚠️ 경고: Google Sheets URL이 설정되지 않았습니다!', 'font-size: 14px; color: #dc2626; font-weight: bold;');
    console.log('%c해결 방법:', 'font-weight: bold;');
    console.log('1. Google Sheets에서 Apps Script 배포');
    console.log('2. 웹 앱 URL 복사');
    console.log('3. script.js 파일의 SCRIPT_URL 변수에 URL 붙여넣기');
    console.log('%c자세한 내용은 가이드 문서를 참조하세요.', 'color: #64748b; font-style: italic;');
} else {
    console.log('%c✓ Google Sheets 연동 설정 완료', 'color: #16a34a; font-weight: bold;');
}
