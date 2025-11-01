import { useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import './index.css';
//import updateState from './App.tsx';

const client = generateClient<Schema>();

function DisplayForm( { updateState }: { updateState: (todos: Array<Schema["Todo"]["type"]>) => void } ) {
  //function DisplayForm() {
    const [showForm, setShowForm] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
{/*
    const formWrapStyle = {
      display: showForm ? "block" : "none",
      border: '1px solid var(--fg-color)',
      width: '100%',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '12px',
    };
*/}
    const formWrapStyle = {
      display: showForm ? "block" : "none",
      width: '100%',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '12px',
    };

    const nwFrmBtnStyle = {
      transition: 'opacity 1s, color 1s',
      opacity: showForm ? '.7' : '1',
      color: showForm ? '#ccc' : 'var(--btn-fg-color)',
      cursor: showForm ? 'auto' : 'pointer',
      marginTop: '21px',
      borderColor: showForm ? 'var(--btn-bg-color)' : '',
    };

  const HandleButtonClick = async () => {
    setShowForm(true);
    setTimeout(() => {
    document.getElementById("txt-area")?.focus();
    }, 20);
/*
    if (inputValue !== "") {
      setIsLoading(true);
      try {
        await client.models.Todo.create({ content: inputValue });
        handleCloseForm();
      } catch (error) {
        console.error("Error creating Todo:", error);
      } finally {
          setIsLoading(false);
      }
    }
   */
  
     if (inputValue.trim() !== "") {
      setIsLoading(true);
      try {
      await client.models.Todo.create({ content: inputValue });
      setInputValue(""); // Clear the input field
      setShowForm(false); // Close the form
      // Optionally, trigger a re-render or update the UI with the new Todo
      //const newTodos = await client.models.Todo.list(); // Fetch the updated list of Todos
      // Update state with the new list to trigger a re-render
      //console.log("Updated Todos:", newTodos.data); // Log or update state with the new list
      } catch (error) {
      console.error("Error creating Todo:", error);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          const sub = client.models.Todo.observeQuery().subscribe({
            next: (data) => updateState([...data.items]),
            error: (err) => console.error('Todo observeQuery error', err),
          });
          sub.unsubscribe();
          }, 5000);
        }
        
    }
  };
  const Plswt = () => (
    <div className="plswt" style={{ textAlign: "center", margin: "10px 0" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          margin: "auto",
          border: "3px solid var(--fg-color)",
          borderTop: "3px solid var(--bg-color)",
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
  
    const handleCloseForm = () => {
      setShowForm(false);
      setInputValue("");
    };
  
    return (
      <>
      <button disabled={showForm} style={nwFrmBtnStyle} onClick={HandleButtonClick}>+ Add New Note</button>
      <div style={formWrapStyle}>
          <form>
            <label htmlFor="txt-area">New Note:</label>
            <textarea id="txt-area"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your note here"
            />
            <button  id="cncl-btn" type="button" onClick={handleCloseForm}>Cancel</button>
            <button  id="sav-btn" type="button" onClick={HandleButtonClick}>Save</button>
            <div className="spacer">&nbsp;</div>
          </form>
      </div>
      </>
    );
  }
  
  export default DisplayForm;