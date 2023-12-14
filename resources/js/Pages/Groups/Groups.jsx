import {useForm} from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton.jsx";
import Todo from "@/Pages/Todos/Todo.jsx";
import React from "react";

export default function Groups({groups}) {
    const { setData: setGroup, post, delete:del} =   useForm({
        name: '',
    });
    const handleSubmit = (e) => {
        post(route('groups.store'), {
            preserveState: true,
        });
        e.preventDefault();
    }
    return <>
        <h2 className="text-xl font-bold mb-4">Groups</h2>
        <ul className="space-y-2">

            {groups && groups.map((group) => (

                <li className="font-medium bg-white rounded-lg pr-4 pb-4 gap-2" key={group.id}>
                    <div className="flex justify-between">
                        <p data-bs-toggle="collapse" data-bs-target={`#todo-${group.id}`} role={"button"} className="p-4 capitalize font-bold flex-1">{group.name}</p>
                        <button className=" underline">Edit</button>
                        <DangerButton className="ml-4" onClick={() => del(route('groups.destroy', group.id), {preserveScroll:true})}>
                            del
                        </DangerButton>
                    </div>
                    <ul id={`todo-${group.id}`} className="w-10/12 ml-10 collapse visible border-2 p-2 space-y-2">
                        {group?.todos.map((todo) => (
                            <Todo key={todo.id} inGroup={true} todo={todo} className={"bg-rose-400"}/>
                        ))}
                    </ul>
                </li>
            ))}

            <li>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
                    <input className="  bg-white rounded-lg w-full focus:border-blue-300 focus:ring-2 border-none font-medium cursor-pointer p-4"
                           type="text" placeholder="New Group" onChange={(e) => setGroup('name', e.target.value)}
                    />
                </form>
            </li>
        </ul>
    </>
}
