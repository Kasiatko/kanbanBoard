import AddTask from "./AddTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";
import { start } from "repl";

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

    console.log(draggableId)
  
    const startColumn = taskStore[source.droppableId];
    const finishColumn = taskStore[destination.droppableId];
    
    console.log('start column:', startColumn);
    console.log('finish column:', finishColumn);
    const startPosition = source.index;
    const finishPosition = destination.index;
    
    console.log('start position:', startPosition);
    console.log('finish position:', finishPosition);

    if (startColumn == finishColumn) {
      const newTaskList = taskStore.map(function(arr) {
        return arr.slice();
      });
      newTaskList[source.droppableId].splice(source.index, 1)
      newTaskList[source.droppableId].splice(destination.index, 0, startColumn[startPosition])
      setTaskStore(newTaskList)
    }

    if (startColumn != finishColumn) {
      const newTaskList = taskStore.map(function(arr) {
        return arr.slice();
      });
      newTaskList[destination.droppableId].splice(destination.index, 0, startColumn[startPosition])
      setTaskStore(newTaskList)
    }

    // if (start && finish && start === finish) {
    //   const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);
  
    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };
  
    //   const newColumns = [...columns];
    //   newColumns[newColumn.id - 1] = newColumn;
    
  
    //   const newTaskStore = { ...taskStore };
    //   newTaskIds.forEach((taskId) => {
    //     const task = newTaskStore[taskId];
    //   if (task && task[0]) {
    //   task[0].columnId = newColumn.id
    //   };
    //   });

    //   setColumns(newColumns);
    //   setTaskStore(newTaskStore);
    // } else if (start && finish){
    //   const startTaskIds = Array.from(start.taskIds);
    //   startTaskIds.splice(source.index, 1);

    //   const newStart = {
    //     ...start,
    //     taskIds: startTaskIds,
    //   };

    //   const finishTaskIds = Array.from(finish.taskIds);
    //   finishTaskIds.splice(destination.index, 0, draggableId);

    //   const newFinish = {
    //   ...finish,
    //   taskIds: finishTaskIds,
    //   };

    //   const newTaskStore = { ...taskStore };

    //   const newTaskStoreItem = newTaskStore[draggableId];
    //   if (newTaskStoreItem && newTaskStoreItem[0]) {
    //     newTaskStoreItem[0].columnId = finish.id;
    //   }

    //   startTaskIds.forEach((taskId) => {
    //     const newTaskStoreItem = newTaskStore[taskId];
    //     if (newTaskStoreItem && newTaskStoreItem[0]) {
    //       newTaskStoreItem[0].columnId = newStart.id;
    //     }
    //   });

    //   finishTaskIds.forEach((taskId) => {
    //     const newTaskStoreItem = newTaskStore[taskId];
    //     if (newTaskStoreItem && newTaskStoreItem[0]) {
    //       newTaskStoreItem[0].columnId = newFinish.id;
    //     }
    //   });

    //   const newColumns = columns.map((column) => {
    //     if (column.id === newStart.id) {
    //       return newStart;
    //     } else if (column.id === newFinish.id) {
    //       return newFinish;
    //     } else {
    //       return column;
    //     }
    //   });

 
    //   setColumns(newColumns);
    //   setTaskStore(newTaskStore);
    // } 
  };

  const renderedColumns = columns.map((column, index) => {
    console.log(columns)
    return (
      <div key={index}>
        <div className="block w-80 rounded-lg bg-red-100 text-center shadow-lg dark:bg-neutral-700">
          <div className="pt-6">{column.title}</div>
          <div className="bg-slate-50">
          <div>  <AddTask
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
