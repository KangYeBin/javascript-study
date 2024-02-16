function createCookie(name) {
   const date = new Date();
   date.setDate(date.getDate + 1); // 쿠키 수명 하루

   const cookie = `${name}=true;expires=${date.toUTCString}`;

   // 쿠키 생성
   document.cookie = cookie;
}


function getCookie(name) {
   const cookies = document.cookie.split('; ');

   for (let c of cookies) {
      if (c.search(name) !== -1) {
         return true;
      }
   }
   return false;
}