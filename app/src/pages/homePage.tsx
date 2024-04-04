import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useState, useEffect } from "react";
import { getAll, setTodos } from "@/redux/todo/todo.slice";
import Button from "@/components/Button";
import todoService from "@/services/todoService";
import { Todo } from "@/entities/Todo";
import { useRouter } from "next/router";

export default function Home() {
  const dispatch = useAppDispatch();
  const TodoService = new todoService();
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      setUser(user);
    };

    handleStorageChange();

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (user && user !== "") {
      dispatch(getAll(user));
    }
  }, [user, dispatch]);

  const { todos } = useAppSelector((state) => state.todo);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const handleCheck = async (todo: Todo) => {
    // Optimistically update the state
    const updatedTodos = todos.map((t) =>
      t._id === todo._id ? { ...t, isChecked: !t.isChecked } : t
    );
    dispatch(setTodos(updatedTodos));

    // Then send the request to the server
    await TodoService.Check(todo._id, { isChecked: !todo.isChecked }).then(
      () => {
        // If the server response is successful, no need to do anything
        // If the server response is an error, rollback the state
      },
      () => {
        const rollbackTodos = todos.map((t) =>
          t._id === todo._id ? { ...t, isChecked: t.isChecked } : t
        );
        dispatch(setTodos(rollbackTodos));
      }
    );
  };

  return (
    <>
      <Head>
        <title>Rönesans | TO-DO</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home-page">
        <div className="actions">
          <div className="title">TO-DO App</div>
          <Button variant="action-box" label="Pick To Around" />
          <Button variant="action-box" label="Download PDF" />
          <Button variant="action-box" label="Create TODO" />
        </div>

        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-row" key={todo?._id}>
              <input
                type="checkbox"
                className="checkbox"
                checked={todo?.isChecked}
                onChange={() => todo?._id && handleCheck(todo)}
              />
              <div className="todo-info">
                <div className="title">{todo?.name}</div>
                <div>{todo?.time?.split("T")[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
