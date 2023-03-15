import AddTask from './AddTask';


type Props = {
    column: any;
}

function KanbanBoard({column} : Props) {


  return (
    <div className='flex flex-row justify-center gap-6 mb-6 '>
        <div className='block w-80 rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700'>
            <div className='border-b-2 bg-yellow border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50'>
                Todo
            </div>
            <div className='bg-slate-50'>
            <AddTask />
            </div>
        </div>
        <div className='block w-80 rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700'>
            <div className='border-b-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50'>
                In Progress</div>
            <div className= 'p-6 bg-slate-50' >
                tasks
            </div>
        </div>
        <div className='block w-80 rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700'>
            <div className='border-b-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50'>
                In Review</div>
            <div className='p-6 bg-slate-50'>
                tasks
            </div>
        </div>
        <div className='block w-80 rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700'>
            <div className='border-b-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50'>
                Done
            </div> 
            <div className='p-6 bg-slate-50'>
                tasks
            </div>
        </div>            
    </div>
  )
}

export default KanbanBoard