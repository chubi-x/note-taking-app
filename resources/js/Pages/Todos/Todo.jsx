import React, {useState} from "react";
import {useForm} from "@inertiajs/react";
import deleteBtn from '@/../images/delete.svg';
import editBtn from '@/../images/edit.svg';
import groupBtn from '@/../images/group.svg';
export default function Todo({todo, className, children, inGroup}){
    const [edit, setEdit] = useState(false);
    const {patch, delete:del} = useForm();
    const {data: editNote , patch: update, setData: setNew} = useForm({name: todo.name});
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const submit = (e) => {
        update(route('todos.update', todo.id), {preserveState: false} );
        e.preventDefault();
    }
    const editInput = () => {
        return <form className={"flex flex-col flex-1 w-full"}
                     onSubmit={(e)=>submit(e)}>
                <input autoFocus type='text'
                      className={"w-full border-none p-4 focus:border-blue-300 focus:ring-2 font-medium bg-white rounded-lg cursor-pointer"}
                      value={editNote.name} onChange={(e) => setNew('name', e.target.value)}/>
            </form>
    }
    const completeTodo = () => {
        patch(route('todos.complete', todo.id), {preserveScroll: true});
    }
    const deleteTodo = () => {
        del(route('todos.destroy', todo.id), {preserveScroll:true});
    }
    return <>
        {children}
        <li className={`font-medium flex justify-between bg-white rounded-lg pr-4 gap-2 ${className}`} >
            { edit ? editInput() :
                <p className={`p-4 flex-1`}>
                    <span onClick={() => completeTodo()}
                          className={`cursor-pointer italic flex-1 ${todo.completed ? 'line-through' : ''}`}
                    >
                        {todo.name}
                    </span>
                    <span className="inline-block bg-red-100 ml-2 font-bold capitalize text-gray-500 not-italic">
                        {todo.group && todo.group.name}
                    </span>
            </p>
            }
            <button className=" underline" onClick={() =>toggleEdit() }>
                <img className='w-5' src={editBtn} alt="edit button"/>
            </button>

            {!inGroup && <button data-bs-toggle="modal" data-bs-target={`#todo-${todo.id}-modal`} >
                <img className='w-5' src={groupBtn} alt="group button"/>
            </button>}
            <button className="ml-4 text-rose-600 " onClick={()=>deleteTodo()} title='delete'>
                <img className='w-5' src={deleteBtn} alt="delete button"/>
            </button>
        </li>
    </>
}
