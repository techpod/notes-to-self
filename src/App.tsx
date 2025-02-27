import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
/*added*/
import { useAuthenticator } from '@aws-amplify/ui-react';
/*end added*/
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  /*added*/
  const { signOut } = useAuthenticator();
  /*end added*/
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  /*added*/  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  /*end added*/

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li
            /*added*/
            onClick={() => deleteTodo(todo.id)}
            /*end added*/
            key={todo.id}>{todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      {/*added*/}
      <button onClick={signOut}>Sign out</button>
      {/*end added*/}
    </main>
  );
}

export default App;
