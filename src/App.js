import React, { useEffect, useState } from "react";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
import { CompleteTodos } from "./components/CompleteTodos";
import { supabase } from "./config";
import "./styles.css";

export const App = () => {
  // State
  // // インプットラン
  const [todoText, setTodoText] = useState("");
  // 未完了リスト
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  // 完了リスト
  const [completeTodos, setCompleteTodos] = useState([]);

  // 初期表示処理
  useEffect(() => {
    getAllTodos();
  }, []);

  // Method
  // 全データ取得
  const getAllTodos = async () => {
    getTodos(null)
      .then((res) => {
        const ToDoTable = res.data;
        if (ToDoTable && ToDoTable.length > 0) {
          // 未完了TODOセット
          const getIncompleteList = ToDoTable.filter((item) => {
            return item.IS_COMPLETE == false;
          });
          setIncompleteTodos(getIncompleteList);

          // 完了TODOセット
          const getCompleteList = ToDoTable.filter((item) => {
            return item.IS_COMPLETE == true;
          });
          setCompleteTodos(getCompleteList);
        }
      })
      .catch((e) => {
        alert(e.message);
        return;
      });
  };

  //データ取得
  const getTodos = async (isCompleteFlag) => {
    if (isCompleteFlag == null) {
      return await supabase.from("ToDoTable").select("*");
    } else {
      return await supabase
        .from("ToDoTable")
        .select("*")
        .eq("IS_COMPLETE", isCompleteFlag);
    }
  };

  // // インプット入力処理
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  // 追加ボタン押下処理
  const onClickAdd = () => {
    if (todoText === "") return;
    InsertRowData();
    setTodoText("");
  };
  // インサート処理
  const InsertRowData = async () => {
    let { data: insertItem, error } = await supabase
      .from("ToDoTable")
      .insert([
        {
          CONTENTS: todoText,
          IS_COMPLETE: false,
          UPDATE_AT: new Date(),
          CREATED_AT: new Date(),
        },
      ])
      .select();
    if (error) {
      alert(error.message);
    } else {
      getTodos(false)
        .then((res) => {
          const newList = res.data;
          setIncompleteTodos(newList);
        })
        .catch((e) => {
          alert(e.message);
          return;
        });
    }
  };

  // 削除ボタン押下処理
  const onClickDelete = (index) => {
    DeleteIncompleteData(index)
      .then((res) => {
        getTodos(false)
          .then((dataList) => {
            const newList = dataList.data;
            setIncompleteTodos(newList);
          })
          .catch((error) => {
            alert(error.message);
            return;
          });
      })
      .catch((e) => {
        alert(e.message);
        return;
      });
  };

  // delete処理
  const DeleteIncompleteData = async (index) => {
    return await supabase.from("ToDoTable").delete().eq("ID", index);
  };

  //完了ボタン押下処理
  const onClickComplete = (index) => {
    UpdateData(true, index);
  };

  // 戻るボタン押下処理
  const onClickRestore = (index) => {
    UpdateData(false, index);
  };

  // 更新処理
  const UpdateData = async (isCompleteFlag, index) => {
    let { error } = await supabase
      .from("ToDoTable")
      .update({ IS_COMPLETE: isCompleteFlag })
      .eq("ID", index)
      .select();
    if (error) {
      alert(error.message);
      return;
    } else {
      getTodos(null)
        .then((res) => {
          const newList = res.data;
          if (newList && newList.length > 0) {
            // 未完了TODOセット
            const getIncompleteList = newList.filter((item) => {
              return item.IS_COMPLETE == false;
            });
            setIncompleteTodos(getIncompleteList);

            // 完了TODOセット
            const getCompleteList = newList.filter((item) => {
              return item.IS_COMPLETE == true;
            });
            setCompleteTodos(getCompleteList);
          }
        })
        .catch((e) => {
          alert(e.message);
          return;
        });
    }
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>
          登録できるTODOは５個までです。消化してください。
        </p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClick={onClickRestore} />
    </>
  );
};
