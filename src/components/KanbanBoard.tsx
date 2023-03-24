import AddTask from "./AddTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";



type column = {
  id: number;
  title: string;
  taskIds: string[];
};

type tasks = {
 columnId: string;
 id: string;
 name: string;
}

const InitialColumns: column[] = [
  {
    id: 0,
    title: "Todo",
    taskIds : [],
  },
  {
    id: 1,
    title: "In Progress",
    taskIds: [],
  },
  {
    id: 2,
    title: "In Review",
    taskIds: [],
  },
  {
    id: 3,
    title: "Done",
    taskIds: [],
  },
];

const ExampleTasks: tasks[][] = [[
{ id: "task-1", name: "Add Login feature" , columnId: 'column-1'},
{ id: "task-2", name: "Add Register feature", columnId: 'column-2'},
]];

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
  
    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
  
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
  
      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };
  
      setColumns(newColumns);
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
  
      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };
  
      const newTaskStore = { ...taskStore };
      const draggedTask = newTaskStore[draggableId];
      draggedTask.columnId = finish.id;
  
      const newColumns = {
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };
  
      setColumns(newColumns);
      setTaskStore(newTaskStore);
    }
  };

  const renderedColumns = columns.map((column, index) => {
    // console.log(column.id)
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
            <Droppable droppableId={`${column.id}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  //   className="pb-10"
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
