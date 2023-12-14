import editBtn from "@/../images/edit.svg";
import deleteBtn from "@/../images/delete.svg";
import Todo from "@/Pages/Todos/Todo.jsx";
import React from "react";
import {useForm} from "@inertiajs/react";

export default function Group({group}){
    const {  delete:del} = useForm();
    const deleteGroup = (id) => {
        del(route('groups.destroy', id), {preserveScroll:true});
    }
    const toggleEdit = () => {
        setEdit(!edit);
    }
    return <li className="font-medium bg-white rounded-lg pr-4 pb-4 gap-2" key={group.id}>
        <div className="flex justify-between">
            <p data-bs-toggle="collapse" data-bs-target={`#todo-${group.id}`} role={"button"} className="p-4 capitalize font-bold flex-1">{group.name}</p>
            <button onClick={() =>toggleEdit() }>
                <img className='w-5' src={editBtn} alt="edit button"/>
            </button>
            <button className="ml-4" onClick={()=>deleteGroup(group.id)} title='delete'>
                <img className='w-5' src={deleteBtn} alt="delete button"/>
            </button>
        </div>
        <ul id={`todo-${group.id}`} className="w-10/12 ml-10 collapse visible p-2 space-y-2">
            {group?.todos.map((todo) => (
                <Todo key={todo.id} inGroup todo={todo} className={"bg-rose-400"}/>
            ))}
        </ul>
    </li>
}
