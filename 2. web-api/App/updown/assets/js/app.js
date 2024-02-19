// index.html에는 app.js(현재파일)이 import
// 현재 파일을 실행부로 취급해서 각각의 기능은 파일별로 따로 구현


// 특정 함수만 import
import gameStart from "./start.js";

// 즉시 실행 함수
(function () {
   gameStart();
})();