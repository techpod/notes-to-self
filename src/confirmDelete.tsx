import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import './index.css';

const client = generateClient<Schema>();

    //function ConfirmDelete(props: { id: string}) {
    function ConfirmDelete(props: { updateNotes: (todos: Array<Schema["Todo"]["type"]>) => void; id: string }) {
    const { updateNotes, id } =  props;
    const [showConfirmDelete, setConfirmDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const confirmDeletsStyle = {
      display: showConfirmDelete ? "block" : "none",
      borderTop: '1px solid var(--bg-color)',
      width: '100%',
      paddingTop: '10px',
      marginTop: '12px',
      overflow: 'hidden',
    };

    const Plswt = () => (
      <div className="plswt" style={{ textAlign: "center", margin: "10px 0" }}>
        <div
          style={{
            width: "40px",
            height: "40px",
            margin: "auto",
            border: "3px solid var(--bg-color)",
            borderTop: "3px solid var(--li-bg-color)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  
    if (isLoading) {
      return <Plswt />;
    }
 
function handleBtnClick() {
    setConfirmDelete(true);
}

const handleDelBtnClick = async () => {
  setIsLoading(true);
  try {
    //await client.models.Todo.delete({ id: props.id });
    await client.models.Todo.delete({ id: id });
    const todosAfterDel = await client.models.Todo.list(); // Fetch the updated list of Todos
    const notesByDatAfterDel = todosAfterDel.data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort in reverse chronological order
    updateNotes(notesByDatAfterDel);
  } catch (error) {
    console.error("Error creating Todo:", error);
  } finally {
    setIsLoading(false);
    setConfirmDelete(false);
  }

}

  return (
    <>
    <span className="material-symbols-outlined" onClick={handleBtnClick}>
              delete
    </span>
    <div style={confirmDeletsStyle}>
        Are you sure you want to delete this note?
        <button id="confirm-del-btn" type="button" onClick={handleDelBtnClick}>Delete</button>
        <button id="cncl-del-btn" type="button" onClick={() => {
            setConfirmDelete(false);
        }}>Cancel</button>
        <div className="spacer">&nbsp;</div>
    </div>
    </>
  ); 
}
  
  export default ConfirmDelete;