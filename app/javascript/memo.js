function memo(){
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true)
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
      // } else {
        return null;
      }
      // itemは、レスポンスとして返却されたメモのレコードデータを取得しています。
      const item = XHR.response.post;
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得しています。
      const list = document.getElementById("list");
      // 次にformTextを取得する理由は、メモの入力フォームをリセットするためです。
      const formText = document.getElementById("content");
      //「メモとして描画する部分のHTML」を定義しています。
      // HTMLという変数を描画するような処理を行えば、ここで定義したHTMLが描画されるわけです。
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // このコードにより、「メモの入力フォームに入力されたままの文字」はリセットされます
      formText.value = "";
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);