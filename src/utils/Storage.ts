import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/pages";
import { ITodo, TodoStates } from "@/types";
import { getAuth } from "firebase/auth";

const fetchTodos = async (state: TodoStates) => {
  const user = getAuth().currentUser;
  const querySnapshot: ITodo[] = await getDocs(collection(db, "todos")).then(
    (querySnapshot) => {
      const newTodos = querySnapshot.docs
        .filter(
          (doc) =>
            doc.data().todo.state == state && doc.data().todo.id == user?.uid
        )
        .map((doc) => ({
          header: doc.data().todo.header,
          description: doc.data().todo.description,
          state: doc.data().todo.state,
          docId: doc.id,
          id: doc.data().todo.id,
        }));
      return newTodos;
    }
  );
  return querySnapshot;
};

const addTodoServer = async (todo: ITodo) => {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo,
    });
    return true;
  } catch (e) {
    console.log("Something went wrong :(");
    return false;
  }
};

const changeTodoStateInServer = async (
  docId: string,
  newState: TodoStates | string
) => {
  try {
    const response = await updateDoc(doc(db, "todos", docId), {
      "todo.state": newState,
    });
    return true;
  } catch (e) {
    return false;
  }
};

export {
  fetchTodos,
  addTodoServer,
  changeTodoStateInServer
}