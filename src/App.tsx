import KanbanBoard from "./components/KanbanBoard";


function App() {

  const column = {name: 'props'}

  return (
    <div className="container my-24 px-6 mx-auto">
    <KanbanBoard column={column} />
    </div>
  );
}

export default App;
