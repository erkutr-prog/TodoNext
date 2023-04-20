import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/pages";
import { ITodo, TodoFieldNames, TodoStates } from "@/types";
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
    await changeTodoFieldInServer(docRef.id, docRef.id, 'docId')
    return true;
  } catch (e) {
    console.log("Something went wrong :(");
    return false;
  }
};

const changeTodoFieldInServer = async (
  docId: string,
  newValue: TodoStates | string,
  todoField: TodoFieldNames | string
) => {
  try {
    var data: any = {}
    data[`todo.${todoField}` as keyof TodoFieldNames] = newValue
    const response = await updateDoc(doc(db, "todos", docId), data);
    return true;
  } catch (e) {
    return false;
  }
};

export {
  fetchTodos,
  addTodoServer,
  changeTodoFieldInServer
}