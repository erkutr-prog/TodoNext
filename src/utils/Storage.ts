import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/pages";
import { ITodo, TodoStates } from "@/types";
import { getAuth } from "firebase/auth";

export const fetchTodos = async (state: TodoStates) => {
  const user = getAuth().currentUser
  const querySnapshot: ITodo[] = await getDocs(collection(db, "todos")).then(
    (querySnapshot) => {
      const newTodos = querySnapshot.docs
        .filter((doc) => doc.data().todo.state == state && doc.data().todo.id == user?.uid)
        .map((doc) => ({
          header: doc.data().todo.header,
          description: doc.data().todo.description,
          state: doc.data().todo.state,
          id: doc.data().todo.id
        }));
      return newTodos;
    }
  );
  return querySnapshot;
};

export const addTodoServer = async (todo: ITodo) => {
  try{
    const docRef = await addDoc(collection(db, "todos"), {
      todo: todo
    })
    return true
  } catch(e) {
    console.log("Something went wrong :(")
    return false
  }
}