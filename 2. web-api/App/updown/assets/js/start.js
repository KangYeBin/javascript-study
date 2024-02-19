import gameData from "./gameData.js";
import { caseUp, caseDown, correctAnswer } from "./checkAnswer.js";

// 게임이 시작되면 해야 할 일을 정의하는 함수

/*
   특정 클래스, 함수, 변수 등을 독립적으로 구성한 후에
   import하는 쪽에서 식별자로 바로 import하게 하려면 export default 선언

   선언된 함수들, 클래스들, 변수들을 모듈화시켜서 객체 형태로 전달할 때는
   export만 붙이고, import 받는 쪽에서는 destructuring 문법을 이용하여 받는다
*/
export default function gameStart() {
   // 정답 검증 함수


   // 숫자 아이콘을 담을 박스
   const $numbers = document.getElementById('numbers');
   // 아이콘 박스를 생성하는 함수
   const makeIcon = () => {

      //  가상 DOM 컨테이너 생성
      const $frag = document.createDocumentFragment();

      for (let n = 1; n <= 100; n++) {
         // <div class='icon'>1</div>
         const $icon = document.createElement('div');
         $icon.classList.add('icon');
         $icon.textContent = n;
         $icon.dataset.iconNumber = n;
         $frag.appendChild($icon);
      }

      $numbers.appendChild($frag);
   }

   makeIcon();

   // 아이콘의 클릭 이벤트 부여
   $numbers.onclick = e => {
      // 부모 노드에 이벤트 부여해서 전달, 하지만 아이콘을 클릭할 때만 이벤트가 발생하도록
      if (!e.target.matches('#numbers .icon')) return;

      // 사용자가 클릭한 아이콘의 숫자를 answer에 저장 (대소 비교를 위해 정수로 변환)
      gameData.answer = +e.target.dataset.iconNumber;
      console.log(gameData.secret);


      // 정답 검증 함수 호출
      checkNumber(e.target)
   }

}

function checkNumber($target) {

   // gameData에서 정답과 사용자의 입력값 얻어오기

   const {
      secret,
      answer
   } = gameData;

   if (secret === answer) { // 정답
      correctAnswer($target);
   } else if (secret > answer) { // UP!
      caseUp($target);
   } else { // DOWN!
      caseDown($target);
   }


}