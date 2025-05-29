import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
/*added*/
import { useAuthenticator } from '@aws-amplify/ui-react';
/*end added*/
import { generateClient } from "aws-amplify/data";
import DisplayForm from './displayForm.tsx';
import ConfirmDelete from './confirmDelete.tsx';

const client = generateClient<Schema>();

function App() {
  /*added*/
  //const { signOut } = useAuthenticator();
  /*end added*/

  /*added*/
  const { user, signOut } = useAuthenticator();
  /*end added*/

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  return (
    <main>
      <div className="app-border">
      {/*added*/}
      <h1>Notes To Self</h1>
      {/*
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      */}
      <p>Signed in as: {user?.signInDetails?.loginId}</p>
      {/*end added*/}
      {/*<button onClick={createTodo}>+ Add New Note</button>*/}
      <button id="so-btn" onClick={signOut}>Sign out</button>
      <DisplayForm />
      <ul>
        {todos.map((todo) => (
          <li
            /*added*/
            //onClick={() => deleteTodo(todo.id)}
            /*end added*/
            key={todo.id}>{todo.content}
            <ConfirmDelete id={todo.id}/>
            <div>
            </div>
          </li>
        ))}
      </ul>
      {/*added*/}
      {/*}
      <button onClick={signOut}>Sign out</button>
      */}
      {/*end added*/}
      </div>
    </main>
  );
}

export default App;
