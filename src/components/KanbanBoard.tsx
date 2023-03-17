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
//   {
//     id: 2,
//     title: "In Progress",
//     taskIds: [],
//   },
//   {
//     id: 3,
//     title: "In Review",
//     taskIds: [],
//   },
//   {
//     id: 4,
//     title: "Done",
//     taskIds: [],
//   },
];

type Task = {
    id:string;
    name:string
};

const initialTasks: Task[] =[];

function KanbanBoard() {
    const [columns, setColumns] = useState(InitialColumns);
    const [tasks, setTasks] = useState(initialTasks);

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };

    const handleOnDragEnd = (result) => {
        // if (!result.destination) {
        //     return;
        //   }
      
        //   const items = reorder(
        //     this.state.items,
        //     result.source.index,
        //     result.destination.index
        //   );
      
        //   this.setState({
        //     items
        //   });
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
}


export default KanbanBoard;
