import AddTask from "./AddTask";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskList from "./TaskList";

type column = {
  id: number;
  title: string;
};

type tasks ={
 id: string;
 name: string;
}

const InitialColumns: column[] = [
  {
    id: 0,
    title: "Todo",
  },
  {
    id: 1,
    title: "In Progress",
  },
  {
    id: 2,
    title: "In Review",
  },
  {
    id: 3,
    title: "Done",
  },
];

const ExampleTasks = [[
{ id: "task-1", name: "Add Login feature" },
{ id: "task-2", name: "Add Register feature"}
],[]]

function KanbanBoard() {

  const [columns, setColumns] = useState<column[]>(InitialColumns);
  const [taskStore, setTaskStore] = useState<tasks[][]>(ExampleTasks);

  const handleOnDragEnd = (result: any) => {
    // const { destination, source, draggableId } = result;
    // if (!result.destination) {
    //   return;
    // }

    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }

    // const start = columns.find(
    //   (column) => column.id === parseInt(source.droppableId)
    // );
    // const finish = columns.find(
    //   (column) => column.id === parseInt(destination.draggableId)
    // );

    // if (start === undefined || finish === undefined) {
    //   return;
    // }

    // if (start === finish) {
    //   // const newTaskIds = Array.from(start.taskIds);
    //   newTaskIds.splice(source.index, 1);
    //   newTaskIds.splice(destination.index, 0, draggableId);

    //   const newColumn = {
    //     ...start,
    //     taskIds: newTaskIds,
    //   };

    //   const newColumns = columns.map((column) => {
    //     if (column.id === newColumn.id) {
    //       return newColumn;
    //     } else {
    //       return column;
    //     }
    //   });

    //   setColumns(newColumns);
      // return;
    }

    //   Moving from one list to another
  //   const startTaskIds = Array.from(start.taskIds);
  //   startTaskIds.splice(source.index, 1);
  //   const newStart = {
  //     ...start,
  //     taskIds: startTaskIds,
  //   };

  //   const finishTaskIds = Array.from(finish.taskIds);
  //   finishTaskIds.splice(destination.index, 0, draggableId);
  //   const newFinish = {
  //     ...finish,
  //     taskIds: finishTaskIds,
  //   };

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
  // };

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
            <Droppable droppableId="test">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  //   className="pb-10"
                  {...provided.droppableProps}
                >
                 <TaskList taskStore={taskStore} columnId={index}/>
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
