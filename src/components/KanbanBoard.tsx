import AddTask from "./AddTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";

type column = {
  id: number;
  title: string;
};

type tasks = {
 id: string;
 name: string;
}

const InitialColumns: column[] = [
  {
    id: 1,
    title: "Todo",
  },
  {
    id: 2,
    title: "In Progress",
  },
  {
    id: 3,
    title: "In Review",
  },
  {
    id: 4,
    title: "Done",
  },
];

const ExampleTasks: tasks[][] = [
  [
{ id: "task-1", name: "Add Login feature" },
{ id: "task-2", name: "Add Register feature" },
  ]
];

function KanbanBoard() {

  const [columns, setColumns] = useState<column[]>(InitialColumns);
  const [taskStore, setTaskStore] = useState<tasks[][]>(ExampleTasks);

  useEffect(() => {
    const storedTaskStore = localStorage.getItem("taskStore");
    if (storedTaskStore) {
      setTaskStore(JSON.parse(storedTaskStore));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("taskStore", JSON.stringify(taskStore));
  }, [taskStore]);

  const handleOnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    
    if (!destination) {
      return;
    }
  
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
     return;
    }

    const startColumn = taskStore[source.droppableId];
    const finishColumn = taskStore[destination.droppableId];

  
    const startPosition = source.index;
    const finishPosition = destination.index;
    

    if (startColumn == finishColumn) {
      const newTaskList = taskStore.map(function(arr) {
        return arr.slice();
      });
      newTaskList[source.droppableId].splice(source.index, 1);
      newTaskList[source.droppableId].splice(destination.index, 0, startColumn[startPosition])
      setTaskStore(newTaskList)
    }

    if (startColumn != finishColumn) {
      const newTaskList = taskStore.map(function(arr) {
        return arr.slice();
      });
      if ( !finishColumn || finishColumn.length === 0) {
        const newColumn = [{ id: startColumn[startPosition].id, name: startColumn[startPosition].name}];
        newTaskList.splice(destination.droppableId, 1, newColumn);
        newTaskList[source.droppableId].splice(startPosition, 1);
      } else {
        newTaskList[source.droppableId].splice(source.index, 1);
        newTaskList[destination.droppableId].splice(finishPosition, 0, startColumn[startPosition])
      }
      
      setTaskStore(newTaskList)
    } 

  };

  const renderedColumns = columns.map((column, index) => {
    return (
      <div key={index}>
        <div className="block w-80 rounded-lg bg-blue-100 text-center shadow-lg dark:bg-neutral-700 pb-4">
          <div className="pt-6 font-bold text-xl mb-4">{column.title}</div>
          <div className="bg-slate-50">
          <div>  
            <AddTask
                    columnId={index}
                    setTaskStore={setTaskStore}
                    taskStore={taskStore}
                  /></div>
            <Droppable droppableId={`${index}`}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                 <TaskList taskStore={taskStore} columnId={index} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
         
          </div>
        </div>
      </div>
    );
  });

  

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="flex justify-center gap-6 mb-6">{renderedColumns}</div>
    </DragDropContext>
  );
}

export default KanbanBoard;
