// 일정 데이터가 들어 있는 배열 선언
const todos = [{
   id: 1,
   text: '할 일 1',
   done: false // checkbox를 클릭해서 할 일을 마쳤는지 여부
}, {
   id: 3,
   text: '할 일 2',
   done: false
}, {
   id: 3,
   text: '할 일 3',
   done: false
}];


// 할 일 추가 처리 함수 정의
function insertTodoData() {

   // 사용자가 작성한 할 일 input 요소
   $todoText = document.getElementById('todo-text');

   // 1. 입력값이 없다면 추가 처리 X
   // 공백 제거하고 비교, 공백 제거 함수 : trim() === '';
   // 입력값이 공백이면 background: orangered, placeholder: 필수 입력 사항입니다!, 이벤트 강제 종료

   if ($todoText.value.trim() === '') {
      $todoText.style.background = 'orangered';
      $todoText.setAttribute('placeholder', '필수 입력사항입니다!');
      $todoText.value = '';
      return;
   } else {
      $todoText.style.background = '#495057';
      $todoText.setAttribute('placeholder', '할 일을 입력하세요');
   }

   // 2. todos 배열에 객체를 생성한 후 추가 (id 추가 순서대로 잘 진행하세요.)
   const todo = {
      id: makeNewId(),
      text: $todoText.value,
      done: false
   }
   todos.push(todo);

   // 3. 추가된 데이터를 화면에 표현 (li 태그를 추가)
   makeNewTodoNode(todo); // 객체 전달

   // 4. 입력 완료 후 input에 존재하는 문자열을 제거.
   $todoText.value = '';
}

// 추가될 할 일 객체의 id를 생성해주는 함수
function makeNewId() {
   if (todos.length > 0) {
      return todos.length + 1;
   } else { // 객체가 하나도 없는 경우
      return 1;
   }
}

// 화면에 표현할 li.todo-list-item 노드를 생성하는 함수 정의
function makeNewTodoNode(todo) {
   $todoList = document.querySelector('.todo-list');
   $newLi = document.createElement('li');
   $newLi.dataset.id = todo.id;
   $newLi.classList.add('todo-list-item');
   $todoList.appendChild($newLi);

   $newLabel = document.createElement('label');
   $newLabel.classList.add('checkbox');
   $newModify = document.createElement('div');
   $newModify.classList.add('modify');
   $newRemove = document.createElement('div');
   $newRemove.classList.add('remove');
   $newLi.appendChild($newLabel);
   $newLi.appendChild($newModify);
   $newLi.appendChild($newRemove);

   $newInput = document.createElement('input');
   $newInput.type = 'checkbox';
   $newText = document.createElement('span');
   $newText.classList.add('text');
   $newText.textContent = todo.text;
   $newLabel.appendChild($newInput);
   $newLabel.appendChild($newText);

   $newModifySpan = document.createElement('span');
   $newModifySpan.classList.add('lnr', 'lnr-undo');
   $newModify.appendChild($newModifySpan);

   $newRemoveSpan = document.createElement('span');
   $newRemoveSpan.classList.add('lnr', 'lnr-cross-circle');
   $newRemove.appendChild($newRemoveSpan);
}

// 할 일 완료 처리 함수
function changeCheckState(label) {

   /*
   할 일 완료된 노드의 클래스 이름을 추가 (디자인)
   checked라는 클래스 이름을 추가. 할 일 완료는 껐다 켰다 할 수 있어야
   */
   label.lastElementChild.classList.toggle('checked');

   /*
   전역 변수로 선언한 배열 안의 객체의 done 값을 수정
   data-id를 얻어서, 그와 일치하는 객체의 done 값을 true로
   만약, 기존의 값이 true였다면 false로
   */

   const id = +label.parentNode.dataset.id;
   const index = findIndexById(id);
   // todos[index].done = !todos[index].done;
   todos[index].done = label.children[0].checked;
}

function findIndexById(id) {
   for (let i = 0; i < todos.length; i++) {
      if (todos[i].id === id) {
         return i;
      }
   }
}


// 할 일 삭제 처리 함수
function removeTodoData($delTarget) {
   // 애니메이션 적용을 위해 클래스 이름을 추가 (delMoving)
   $delTarget.classList.add('delMoving');

   // ul 안에 있는 li를 removeChild로 제거하기 전에 애니메이션 발동 및
   // 배열 내부 객체 삭제가 진행될 수 있도록 시간을 일부러 지연.
   // 시간 지연은 1.5초 진행  (setTimeout() 함수)

   // 배열 내에 있는 객체도 삭제
   // 삭제되는 객체가 배열 안에 몇번째 인지를 확인 -> 할 일 완료 처리 함수쪽에 비슷한 로직이 있습니다.
   // 함수화 시켜보세요.

   funtion = setTimeout(() => {
      const $todoList = document.querySelector('.todo-list');
      $todoList.removeChild($delTarget);
   }, 1500);

   const id = +$delTarget.dataset.id;
   const index = findIndexById(id);
   todos.splice(index, 1);

   console.log(todos);
}


// 수정 모드 진입 이벤트 함수
function enterModifyMode($modSpan) {
   // 수정 모드 진입 버튼을 교체 (lnr-undo -> lnr-checkmark-circle)
   $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

   // span.text를 input태그로 교체 (replaceChild)
   // input 태그에는 .modify-input을 추가
   // input에는 기존의 할 일 텍스트가 미리 작성되어 있어야함

   const $label = $modSpan.parentNode.previousElementSibling;
   const $textSpan = $label.lastElementChild;

   const $modInput = document.createElement('input');
   $modInput.setAttribute('type', 'text');
   $modInput.value = $textSpan.textContent;
   $modInput.classList.add('modify-input');

   $label.replaceChild($modInput, $textSpan);
}


// 수정 완료 이벤트 처리 함수
function modifyTodoData($modSpan) {
   // 버튼을 원래대로 (lnr-undo)
   $modSpan.classList.replace('lnr-checkmark-circle', 'lnr-undo');

   // input을 다시 span.txt로 변경
   const $label = $modSpan.parentNode.previousElementSibling;
   const $modCompleteText = document.createElement('span');
   $modCompleteText.textContent = $label.lastElementChild.value;

   $label.replaceChild($modCompleteText, $label.lastElementChild);

   // 배열 내의 id가 일치하는 객체를 찾아서 text 프로퍼티의 값을 수정된 값으로 변경
   const index = findIndexById(+$label.parentNode.dataset.id)
   todos[index].text = $modCompleteText.textContent;
}



// 메인 역할을 하는 즉시 실행 함수
(function () {

   // 할 일 추가 이벤트 등록
   const $addBtn = document.getElementById('add');
   $addBtn.addEventListener('click', e => {

      // form 태그 안의 button은 type을 명시하지 않으면 자동 submit 동작
      e.preventDefault(); // 버튼의 고유 기능 (submit)을 중지

      insertTodoData();
   });


   // 할 일 완료 (체크박스) 이벤트
   const $todoList = document.querySelector('.todo-list');
   $todoList.addEventListener('click', e => {
      if (!e.target.matches('input[type=checkbox]')) {
         return;
      }

      changeCheckState(e.target.parentNode); // label을 전달
   })


   // 할 일 삭제 이벤트
   $todoList.addEventListener('click', e => {
      if (!e.target.matches('.remove span')) {
         return;
      }

      removeTodoData(e.target.parentNode.parentNode); // li를 전달
   })

   // 할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
   $todoList.addEventListener('click', e => {
      if (e.target.matches('.modify span.lnr-undo')) {
         enterModifyMode(e.target); // 수정 모드 진입
      } else if (e.target.matches('.modify span.lnr-checkmark-circle')) {
         modifyTodoData(e.target);  // 수정 완료
      } else {
         return;
      }
   })
})();