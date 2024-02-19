function caseUp($target) {
   // 1. #begin인 em의 숫자값을 선택한 값 + 1로 변경
   document.getElementById('begin').textContent = +$target.dataset.iconNumber + 1;

   // 2. up 또는 down 요소에 애니메이션 넣기 -> selected를 추가
   // #down 요소의 .selected를 제거, #up에 .selected를 추가
   document.getElementById('down').classList.remove('selected');
   document.getElementById('up').classList.add('selected');

   // 3. 자기 자신 아이콘 포함 이전 형제 요소들 전부 삭제
   const $numbers = document.getElementById('numbers')

   let $delTarget = $target;
   // 삭제되는 요소는 자신의 이전 형제 요소를 지목해놓고 삭제
   // 삭제되는 요소가 1번 아이콘인 경우 이전 요소가 없으므로 $delTarget이 null
   // delTarget이 null이 되는 순간 반복문 종료
   while ($delTarget) {
      const $nextTarget = $delTarget.previousElementSibling;
      $numbers.removeChild($delTarget);

      $delTarget = $nextTarget;
   }
}

function caseDown($target) {
   // 1. #end인 em의 숫자값을 선택한 값 - 1로 변경
   document.getElementById('end').textContent = +$target.dataset.iconNumber - 1;

   // 2. up 또는 down 요소에 애니메이션 넣기 -> selected를 추가
   // #up 요소의 .selected를 제거, #down에 .selected를 추가
   document.getElementById('up').classList.remove('selected');
   document.getElementById('down').classList.add('selected');

   // 3. 자기 자신 아이콘 포함 이전 형제 요소들 전부 삭제
   const $numbers = document.getElementById('numbers')

   let $delTarget = $target;
   // 삭제되는 요소는 자신의 이전 형제 요소를 지목해놓고 삭제
   // 삭제되는 요소가 1번 아이콘인 경우 이전 요소가 없으므로 $delTarget이 null
   // delTarget이 null이 되는 순간 반복문 종료
   while ($delTarget) {
      const $nextTarget = $delTarget.nextElementSibling;
      $numbers.removeChild($delTarget);

      $delTarget = $nextTarget;
   }
}

function correctAnswer($target) {

   // 1. #finish 박스에 class 'show' 부여
   document.getElementById('finish').classList.add('show');

   // 2. $numbers 클릭 이벤트 해제
   const $numbers = document.getElementById('numbers')
   $numbers.onclick = null;


   // 3. 사용자가 선택한 아이콘에 id 'move' 추가
   // $target.id = 'move';
   $target.setAttribute('id', 'move');
}

export {
   caseUp,
   caseDown,
   correctAnswer
};