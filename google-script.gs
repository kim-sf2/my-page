// ===========================================
// 에듀웨이브교육원 - Google Apps Script
// ===========================================
// 이 코드는 Google Sheets에 데이터를 저장하고
// Google Calendar에 일정을 생성합니다.
//
// 사용 방법:
// 1. Google Sheets 열기
// 2. 확장 프로그램 > Apps Script
// 3. 이 코드 전체를 복사해서 붙여넣기
// 4. 저장 (디스크 아이콘)
// 5. 배포 > 새 배포
// 6. 웹 앱으로 배포
// 7. URL 복사해서 script.js에 붙여넣기
// ===========================================

// ⚠️ Google Calendar 연동 설정 (선택사항)
// Calendar 사용하려면 아래 주석을 해제하고 Calendar ID를 입력하세요
// const CALENDAR_ID = "your-email@gmail.com"; // ← 여기에 Calendar ID 입력

// ===========================================
// 메인 함수 - POST 요청 처리
// ===========================================

function doPost(e) {
  try {
    // 1. 스프레드시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // 2. 첫 실행 시 헤더 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        '신청일시',
        '기관명',
        '담당자명',
        '연락처',
        '이메일',
        '희망강의',
        '희망날짜',
        '희망시간',
        '예상인원',
        '교육장소',
        '추가요청사항'
      ]);
      
      // 헤더 스타일 적용
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#1e40af');
      headerRange.setFontColor('#ffffff');
    }
    
    // 3. 폼 데이터 받기
    const data = JSON.parse(e.postData.contents);
    
    // 4. 한글 깨짐 방지
    const organization = data.organization || '';
    const name = data.name || '';
    const phone = data.phone || '';
    const email = data.email || '';
    const course = data.course || '';
    const date = data.date || '';
    const time = data.time || '';
    const participants = data.participants || '';
    const location = data.location || '';
    const notes = data.notes || '';
    
    // 5. 신청일시 생성
    const timestamp = new Date();
    const formattedTimestamp = Utilities.formatDate(
      timestamp, 
      Session.getScriptTimeZone(), 
      'yyyy-MM-dd HH:mm:ss'
    );
    
    // 6. 시트에 데이터 추가
    sheet.appendRow([
      formattedTimestamp,
      organization,
      name,
      phone,
      email,
      course,
      date,
      time,
      participants,
      location,
      notes
    ]);
    
    // 7. 캘린더에 일정 추가 (설정된 경우)
    if (typeof CALENDAR_ID !== 'undefined' && CALENDAR_ID) {
      try {
        addToCalendar({
          organization: organization,
          name: name,
          phone: phone,
          email: email,
          course: course,
          date: date,
          time: time,
          participants: participants,
          location: location,
          notes: notes
        });
      } catch (calError) {
        console.error('캘린더 추가 오류:', calError);
        // 캘린더 오류는 무시하고 계속 진행
      }
    }
    
    // 8. 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success',
        message: '신청이 완료되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 오류 발생 시
    console.error('오류 발생:', error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===========================================
// Google Calendar에 일정 추가하는 함수
// ===========================================

function addToCalendar(data) {
  // Calendar ID가 설정되지 않았으면 종료
  if (typeof CALENDAR_ID === 'undefined' || !CALENDAR_ID) {
    console.log('Calendar ID가 설정되지 않아 일정을 추가하지 않습니다.');
    return;
  }
  
  try {
    // 캘린더 가져오기
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
    
    if (!calendar) {
      throw new Error('캘린더를 찾을 수 없습니다. Calendar ID를 확인하세요.');
    }
    
    // 날짜와 시간 조합
    const dateTime = data.date + ' ' + data.time;
    const startTime = new Date(dateTime);
    
    // 종료 시간 (2시간 후)
    const endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000));
    
    // 일정 제목
    const title = '[' + data.organization + '] ' + data.course;
    
    // 일정 설명
    const description = 
      '담당자: ' + data.name + '\n' +
      '연락처: ' + data.phone + '\n' +
      '이메일: ' + data.email + '\n' +
      '인원: ' + data.participants + '명\n' +
      '교육장소: ' + data.location + '\n' +
      '요청사항: ' + data.notes;
    
    // 일정 생성
    calendar.createEvent(title, startTime, endTime, {
      description: description,
      location: data.organization
    });
    
    console.log('캘린더 일정이 생성되었습니다: ' + title);
    
  } catch (error) {
    console.error('캘린더 일정 추가 오류:', error);
    throw error;
  }
}

// ===========================================
// 테스트 함수 (선택사항)
// ===========================================
// 이 함수는 Apps Script에서 직접 실행하여 테스트할 수 있습니다.
// 실행 방법: 상단 메뉴에서 testFormSubmission 선택 후 실행

function testFormSubmission() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        organization: '테스트기관',
        name: '홍길동',
        phone: '010-1234-5678',
        email: 'test@test.com',
        course: '성희롱예방교육',
        date: '2024-12-30',
        time: '14:00',
        participants: '30',
        location: '온라인',
        notes: '테스트 신청입니다.'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

// ===========================================
// 시트 초기화 함수 (선택사항)
// ===========================================
// 주의: 이 함수를 실행하면 모든 데이터가 삭제됩니다!

function resetSheet() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    '경고',
    '모든 데이터가 삭제됩니다. 계속하시겠습니까?',
    ui.ButtonSet.YES_NO
  );
  
  if (response == ui.Button.YES) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.clear();
    ui.alert('시트가 초기화되었습니다.');
  }
}

// ===========================================
// 도움말 함수
// ===========================================

function showHelp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    '에듀웨이브교육원 - Google Apps Script',
    '이 스크립트는 웹사이트의 강의 신청 폼과 연동됩니다.\n\n' +
    '설정 방법:\n' +
    '1. 배포 > 새 배포\n' +
    '2. 웹 앱으로 배포\n' +
    '3. 액세스 권한: "모든 사용자"\n' +
    '4. URL 복사\n' +
    '5. script.js 파일에 URL 붙여넣기\n\n' +
    'Calendar 연동 (선택사항):\n' +
    '1. CALENDAR_ID 주석 해제\n' +
    '2. Calendar ID 입력\n' +
    '3. 재배포',
    ui.ButtonSet.OK
  );
}
