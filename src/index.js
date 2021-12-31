import "./styles.css";

// 機能1：追加ボタンを押す→未完了エリアにタスクが追加される

/*
<li> 
  <div class="list-row">
      <p>TODOです</p>
      <button>完了</button>
      <button>削除</button>
  </div> 
</li>
*/

/**
 * 追加ボタンが押されたときに実行される関数
 * テキストボックスの値を取得し、値を初期化する
 */
const onClickAdd = () => {
  // ①追加ボタンが押されたらこの関数が動くか確認(機能の細分化)
  // alert();
  // ②追加ボタンをクリックされた時、入力された値を変数に代入する
  // テキストボックスの要素を取得するために目印が必要
  const inputText = document.querySelector("#add-text").value;
  // ④確認できたが、入力内容が残り続けるので、追加ボタンが押されたら初期化する
  document.querySelector("#add-text").value = "";
  // alertで出力確認
  alert(inputText);

  // ⑤inputTextを元に、li>list-rowのDOM作成していく

  // ⑴liタグ生成
  const li = document.createElement("li");
  // console.log(li); // <li></li>

  // ⑵divタグ生成
  // JSでDOMを作成する場合はcreateElement("タグ名")を使う
  const div = document.createElement("div");
  // console.log(div); // <div></div>

  // ⑶divタグにlist-rowクラスを付与
  div.className = "list-row";
  // console.log(div); // <div class="list-row"></div>

  // ⑷pタグを生成し、その中にinputTextを挿入する
  const p = document.createElement("p");
  p.innerText = inputText;
  // console.log(p); // <p>aaaaa</p>

  // (11)完了ボタンと削除ボタンに対するイベントは一つずつidを振る訳ではないので、関数内で設定する
  // ⑻buttonタグ(完了)生成
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "完了";
  completeBtn.addEventListener(
    "click",
    () => {
      alert("完了");
    },
    false
  );
  // console.log(completeBtn); // <button>完了</button>

  // ⑼buttonタグ(削除)生成
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "削除";
  deleteBtn.addEventListener(
    "click",
    () => {
      alert("削除");
    },
    false
  );
  // console.log(deleteBtn); // <button>削除</button>

  // ⑸liタグの子要素にdivタグを設定する
  li.appendChild(div);
  // console.log(li);
  //<li>
  // <div class="list-row"></div>
  //</li>

  // ⑹divタグの子要素にpタグを設定
  // appendChildはどんどん下に追加されていく
  div.appendChild(p);
  // console.log(li);
  //<li>
  // <div class="list-row">
  // <p>aaa</p>
  // </div>
  //</li>

  // ⑽divタグの子要素にbuttonタグを設定
  div.appendChild(completeBtn);
  div.appendChild(deleteBtn);

  //⑺li>list-rowを未完了のulタグに挿入する
  // そのためにulタグに目印を付ける
  document.querySelector("#incompleted-list").appendChild(li);
};

// 機能2：完了ボタンを押す→

// 機能3：削除ボタンを押す→未完了エリアにタスクが追加される

// ①add-btn要素に対してclickイベントが起こるようにする
// 追加ボタンと処理を紐づける目印がhtml側に必要
document
  .querySelector("#add-btn")
  .addEventListener("click", () => onClickAdd(), false);

/**
 * このようにJSでアプリケーションを作成する時は、
 * イベントをどこかに付与してあげたり、
 * 値を取得して来たり、
 * 画面に要素を追加するときは、createElemmentで要素を作成して、
 * 入れ子にしたい時は、appendChild
 * などを使用して画面の要素を書き換えていく
 * という流れになる。
 * DBに保存していないので、更新すると消える
 */
