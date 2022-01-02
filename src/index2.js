import "./styles.css";

/**
 * 機能は4つ
 * ・追加ボタン
 * ・削除ボタン
 * ・完了ボタン
 * ・戻すボタン
 */

/**
 * 追加ボタンの機能(id=add-btn)
 * ⑴ 追加ボタンをクリック後
 * ⑵ テキストボックスから値を取得
 * ⑶ 未完了リスト用にDOMを書き換え
 * ⑷ 未完了リストに追加
 */

/**
 * 削除ボタンの機能(idなし、DOM生成)
 * ⑴ 削除ボタンをクリック後
 * ⑵ 未完了リストから指定のタスクを削除
 */

/**
 * 完了ボタンの機能(idなし、DOM生成)
 * ⑴ 完了ボタンをクリック後
 * ⑵ 未完了リストから指定のタスクを削除
 * ⑶ 完了リスト用にDOMを書き換え
 * ⑷ 完了リストに追加
 */

/**
 * 戻すボタンの機能(idなし、DOM生成)
 * ⑴ 完了リストから指定のタスクを削除
 * ⑵ 未完了リスト用にDOMを書き換え
 * ⑶ 未完了リストに追加
 */

/**
 * 共通の処理
 * ・未完了リストから指定のタスクを削除
 * ・未完了リスト用にDOMを書き換え → 未完了リストに追加
 */

// -----------------------------------------

/**
 * 追加ボタンをクリック後のイベント
 *
 */
const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener(
  "click",
  () => {
    // 追加ボタンの機能(他のボタン処理もこの中に書くので関数化)
    clickAddBtn();
  },
  false
);

// -----------------------------------

// 関数

/**
 * 追加ボタンクリック後の処理
 */
function clickAddBtn() {
  /**
   * テキストボックスから値を取得 → 値を初期化するまでの処理
   */
  const input = document.querySelector("#add-text");
  const inputText = input.value;
  input.value = "";

  /**
   * 未完了リスト用にDOMを書き換え → 未完了リストに追加するまでの処理
   */
  addToIncompletedList(inputText);
}

/**
 * 未完了リスト用にDOMを書き換え → 未完了リストに追加するまでの処理
 */
function addToIncompletedList(text) {
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";
  const p = document.createElement("p");
  p.innerText = text;

  /**
   * 削除ボタンをクリック後のイベント
   */
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "削除";
  deleteBtn.addEventListener(
    "click",
    () => {
      // 削除ボタン機能
      const deleteTarget = deleteBtn.closest("li");
      deleteFromIncompletedList(deleteTarget);
    },
    false
  );

  /**
   * 完了ボタンクリック後のイベント
   */
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "完了";
  completeBtn.addEventListener(
    "click",
    () => {
      // 完了ボタン機能
      const deleteTarget = completeBtn.closest("li");
      deleteFromIncompletedList(deleteTarget);

      const addTarget = completeBtn.closest("li");
      const text = addTarget.querySelector("p").innerText;
      addTarget.querySelector("div").textContent = null;

      const p = document.createElement("p");
      p.innerText = text;

      /**
       * 戻すボタンクリック後のイベント
       */
      const backBtn = document.createElement("button");
      backBtn.innerText = "戻す";
      backBtn.addEventListener(
        "click",
        () => {
          const deleteTarget = backBtn.closest("li");
          document.querySelector("#completed-list").removeChild(deleteTarget);

          const text = backBtn.previousElementSibling.innerText;

          addToIncompletedList(text);
        },
        false
      );

      addTarget.querySelector("div").appendChild(p);
      addTarget.querySelector("div").appendChild(backBtn);

      document.querySelector("#completed-list").appendChild(addTarget);
    },
    false
  );

  div.appendChild(p);
  div.appendChild(completeBtn);
  div.appendChild(deleteBtn);
  li.appendChild(div);

  document.querySelector("#incompleted-list").appendChild(li);
}

/**
 * 未完了リストから削除
 */
function deleteFromIncompletedList(target) {
  document.querySelector("#incompleted-list").removeChild(target);
}
