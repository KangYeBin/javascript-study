// 현재 계산기에 그려질 숫자
let currentResult = 0;

// 계산 이력을 모아 둘 배열
const logEntries = [];

// 로그 번호
let seq = 0;


// 입력창에 입력한 숫자 읽기
const getUserNumberInput = () => parseInt($userInput.value);


// 계산 기능을 담당하는 함수
const calculate = type => {
   const enteredNumber = getUserNumberInput();

   // 값을 입력하지 않았을 때
   if (!enteredNumber && enteredNumber != 0) { // NaN은 false
      alert('값을 입력하세요');
      return;
   }


   let log = 0;

   if (type === 'ADD') {
      log = `${currentResult} + ${enteredNumber}`;
      currentResult += enteredNumber;
   } else if (type === 'SUB') {
      log = `${currentResult} - ${enteredNumber}`;
      currentResult -= enteredNumber;
   } else if (type === 'MULTI') {
      log = `${currentResult} X ${enteredNumber}`;
      currentResult *= enteredNumber;
   } else {
      if (enteredNumber === 0) {
         alert('0으로 나눌 수 없습니다.');
         return;
      }
      log = `${currentResult} / ${enteredNumber}`;
      currentResult /= enteredNumber;
   }


   // 연산식과 결과값을 두 번째 section에 렌더링
   $currentCalculationOutput.textContent = log;
   $currentResultOutput.textContent = currentResult;
   $userInput.value = '';


   // 로그 이력을 화면에 렌더링
   renderToLog(log);
}

const renderToLog = log => {
   // li 태그 생성
   const $newLi = document.createElement('li');
   $newLi.classList.add('log-entries-item');
   $newLi.textContent = `#${++seq}. ${log} = ${currentResult}`;

   // ul에 추가
   $logEntries.appendChild($newLi);
}


// 이벤트 핸들러
const addHandler = () => calculate('ADD');
const subHandler = () => calculate('SUB');
const multiHandler = () => calculate('MULTI');
const divideHandler = () => calculate('DIVIDE');


// 이벤트 핸들러 바인딩 
$addBtn.addEventListener('click', addHandler);
$subtractBtn.addEventListener('click', subHandler);
$multiplyBtn.addEventListener('click', multiHandler);
$divideBtn.addEventListener('click', divideHandler);