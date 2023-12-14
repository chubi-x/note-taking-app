import {useForm} from "@inertiajs/react";
import recycleBin from '@/../images/recycle-bin.svg';
import cancelBtn from '@/../images/cancel.svg';
import restoreBtn from '@/../images/restore.svg';
import React from "react";

export default function Todos ({todos, children})  {
    const { setData: setNote, post, patch, delete:deleteFn, errors} =  useForm({
        name: '',
    });

    const handleSubmit = (e) => {
        post(route('todos.store'), {
            preserveState: false,
        });
        e.preventDefault();
    }
    const deleteTodo = (id) => {
        deleteFn(route('todos.destroy', id), {preserveState: false});
    }
    const restoreTodo = (id) => {
        patch(route('todos.restore', id), {preserveState: false});
    }
    const hasRecycled = () => {
        return todos.filter(todo => todo.recycled).length > 0;
    }
    const RecycleBin = () => {
        return <div className="modal fade" id='recycle-bin-modal' tabIndex="-1" aria-labelledby='#recycle-bin'
                    aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content text-black">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 font-bold" id='recycle-bin'>Recycle Bin</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {hasRecycled() ? todos.map((todo) => (
                            todo.recycled &&
                            <div key={todo.id} className="flex justify-between items-center mb-10 py-6 shadow-md px-6 shadow-red-200">
                                <p className="text-md font-bold max-w-xs">{todo.name}</p>
                               <div>
                                   <button className="ml-4 text-rose-600"  type='button' data-bs-dismiss="modal" title='restore'>
                                       <img className='w-5' src={restoreBtn} onClick={()=>restoreTodo(todo.id)}  alt="restore button"/>
                                   </button>
                                   <button className="ml-4 text-rose-600"  type='button' data-bs-dismiss="modal"  title='delete'>
                                       <img className='w-5' src={cancelBtn} onClick={()=>deleteTodo(todo.id)} alt="delete button"/>
                                   </button>
                               </div>

                            </div>

                        ))
                            :
                            <div className="flex justify-center items-center mb-10 py-6 px-6 shadow-red-200">
                                <p className="text-md font-bold max-w-xs">No Todos in Recycle Bin</p>
                            </div>
                        }

                    </div>
                    <div className="modal-footer bg-gray-800">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    }
    return <>
        <div className='flex justify-between items-center mb-10 py-6 shadow-md px-6 shadow-red-200'>
            <h2 className="text-2xl font-bold">Todos</h2>
            <button className='flex flex-col items-center space-y-2' data-bs-toggle="modal" data-bs-target={`#recycle-bin-modal`}>
                <img src={recycleBin} alt="recycle bin" className="w-8 h-8"/>
                <p className='self-end font-medium'>
                    Recycle Bin
                </p>
            </button>
            <RecycleBin/>
        </div>
        <ul className="space-y-2">
            {children}
            <li className={" "} >
                <form className="flex flex-col mt-10 border-b-2 border-gray-400" onSubmit={(e => handleSubmit(e))}>
                    <input className="bg-white rounded-lg w-full border-none focus:border-blue-300 focus:ring-2 font-medium cursor-pointer p-4"
                           type="text" placeholder="New Todo" onChange={(e) => setNote('name', e.target.value)}
                    />
                    {errors.name && <span className="text-rose-600 text-sm mt-1">{errors.name}</span>}

                </form>
            </li>
        </ul>
    </>
}
