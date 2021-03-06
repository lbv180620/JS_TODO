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

  addtoIncompletedList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompletedList = (target) => {
  document.querySelector("#incompleted-list").removeChild(target);
};

// 未完了リストに追加する関数
const addtoIncompletedList = (text) => {
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
  p.innerText = text;
  // console.log(p); // <p>aaaaa</p>

  // (11)完了ボタンと削除ボタンに対するイベントは一つずつidを振る訳ではないので、関数内で設定する
  // ⑻buttonタグ(完了)生成
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "完了";
  completeBtn.addEventListener(
    "click",
    () => {
      // alert("完了");
      // 機能3：完了ボタンを押す
      // 完了ボタンを押した行のテキストで、完了areaに新しくDOMを生成し、戻すボタンを生成する。完了したら元の行は削除する。
      // ⒈ 完了ボタンが押されたら、未完了エリアからタスクを削除する
      const deleteTarget = completeBtn.closest("li");
      deleteFromIncompletedList(deleteTarget);
      // 2. 完了リストに追加する要素
      const addTarget = completeBtn.closest("li");
      // 3. TODO内容テキストを取得
      const text = addTarget.querySelector("p").innerText;
      // 4. div以下を初期化
      addTarget.querySelector("div").textContent = null;
      // console.log(addTarget);
      //<li>
      // <div class="list-row"></div>
      //</li>

      // 5. DOMの生成
      const p = document.createElement("p");
      p.innerText = text;

      const backBtn = document.createElement("button");
      backBtn.innerText = "戻す";
      backBtn.addEventListener(
        "click",
        () => {
          // alert("戻す");
          // 戻すボタンを押すと、完了リストからタスクが削除される
          const deleteTarget = backBtn.closest("li");
          document.querySelector("#completed-list").removeChild(deleteTarget);

          // テキストの取得
          const text = backBtn.previousElementSibling.innerText;
          console.log(text);
          // 再起的に処理
          addtoIncompletedList(text);
        },
        false
      );

      addTarget.querySelector("div").appendChild(p);
      addTarget.querySelector("div").appendChild(backBtn);

      // 完了リストに追加
      document.querySelector("#completed-list").appendChild(addTarget);
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
      // alert("削除");
      // 機能2：削除ボタン押す → 祖先要素のliタグがincompleted-listから削除される
      const deleteTarget = deleteBtn.closest("li");
      // console.log(deleteTarget);
      // <li>
      //   <div class="list-row">
      //      <p>aaaaaaaaa</p>
      //      <button>完了</button>
      //      <button>削除</button>
      //    </div>
      // </li>
      // incompleted-listから削除する
      deleteFromIncompletedList(deleteTarget);
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
