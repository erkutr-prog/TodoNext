import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { ITodo, TodoStates } from "@/types";
import { fetchTodos } from "@/utils/Storage";
import { setTodos } from "@/features/todoSlice";
import { useEffect, useState } from "react";

export function useTodos(todoState: TodoStates) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<Boolean>(true)
  const [data, setData] = useState<ITodo[]>()

  const getTodoList = async() => {
    setLoading(true)
    const response = await fetchTodos(todoState);
    dispatch(setTodos({ state: todoState, todo: response }));
    setData(response)
    setLoading(false)
  }

  useEffect(() => {
    getTodoList()
  }, [todoState])

  return {data, loading};
}
