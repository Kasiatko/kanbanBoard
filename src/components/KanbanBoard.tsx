import AddTask from "./AddTask";
import {DragDropContext} from 'react-beautiful-dnd'
import { useState } from "react";



type column = {
  id: number;
  title: string;
  taskIds: string[];
};

const InitialColumns: column[] = [
  {
    id: 1,
    title: "Todo",
    taskIds: [],
  },
  {
    id: 2,
    title: "In Progress",
    taskIds: [],
  },
  {
    id: 3,
    title: "In Review",
    taskIds: [],
  },
  {
    id: 4,
    title: "Done",
    taskIds: [],
  },
 ];

type Task = {
    id:string;
    name:string
};

function KanbanBoard() {

    const [columns, setColumns] = useState(InitialColumns);

    const handleOnDragEnd = (result:any) => {
        const {destination, source, draggableId} =result;
        if (!result.destination) {
            return;
        }
      
       if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
       ){
        return;
       }

       const start = columns.find(column => column.id === parseInt(source.droppableId));
       const finish = columns.find(column => column.id === parseInt(destination.draggableId));

       if(start === undefined || finish === undefined) {
        return;
        }

       if(start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);
       

       const newColumn = {
        ...start,
        taskIds: newTaskIds,
        };

        const newColumns = columns.map(column => {
            if(column.id === newColumn.id) {
                return newColumn;
            } else {
                return column;
            }
        });

        setColumns(newColumns);
        return;
        }

    //   Moving from one list to another
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

        const newColumns = columns.map(column => {
        if(column.id === newStart.id) {
            return newStart;
        } else if(column.id === newFinish.id){
            return newFinish;
        } else {
            return column;
        }
        });
        setColumns(newColumns);

    };


    const renderedColumns = columns.map((column) => {
        return (
            <div key={column.id}>
                <div className="block w-80 rounded-lg bg-slate-50 text-center shadow-lg dark:bg-neutral-700">
                    {column.title}
                    <div className="bg-slate-50">
                    <AddTask />
                    </div>  
             
                </div>
            </div>
        );
    });

    
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="flex justify-center gap-6 mb-6">
        {renderedColumns}
    </div>
    </DragDropContext>
    
  );
};


export default KanbanBoard;
