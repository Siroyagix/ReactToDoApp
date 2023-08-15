import React from "react";

export const IncompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.ID}>
              <div className="list-row">
                <p>{todo.CONTENTS}</p>
                <button onClick={() => onClickComplete(todo.ID)}>完了</button>
                <button onClick={() => onClickDelete(todo.ID)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
