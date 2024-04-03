import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { getAll } from "@/redux/todo/todo.slice";
import Button from "@/components/Button";

export default function Home() {
  const dispatch = useAppDispatch();

  const { user_id } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (dispatch && user_id !== "") {
      const params = {
        user_id: user_id,
      };
      console.log(params);
      dispatch(getAll(params));
    }
  }, [user_id]);

  const { todos } = useAppSelector((state) => state.todo);

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
            <div className="todo-row" key={todo?.id}>
              <div>{todo?.name}</div>
              <div>{todo?.time?.toISOString()}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
