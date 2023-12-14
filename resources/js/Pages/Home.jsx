import { Head, useForm} from '@inertiajs/react';
import { useState} from 'react';


const Todo = ({todo, className, children, inGroup}) => {
    const [edit, setEdit] = useState(false);
    const {patch,delete:del} = useForm();
    const {data: editTodo , patch: update, setData: setNew} = useForm({name: todo.name});
    const toggleEdit = () => {
        setEdit(!edit);
    }
    const submit = (e) => {
        update(route('todos.update', todo.id), {preserveState: true});
        e.preventDefault();
    }
    const editInput = () => {
        return <form className={"flex flex-col flex-1 w-full"} onSubmit={(e)=>submit(e)}>
            <input autoFocus className={"w-full border-none p-4 font-medium bg-white rounded-lg cursor-pointer"} type="text" value={editTodo.name} onChange={(e) => setNew('name', e.target.value)}/>
        </form>
    }
    return <>
        {children}
        <li className={`font-medium flex justify-between bg-white rounded-lg pr-4 gap-2 ${className}`} >
            { edit ? editInput() : <p className={`p-4 flex-1`}> <span onClick={(e) => patch(route('todos.complete', todo.id), {preserveScroll: true})
            } className={`cursor-pointer italic flex-1 ${todo.completed ? 'line-through' : ''}`}>{todo.name}</span> <span className=" inline-block underline font-bold capitalize text-gray-500 not-italic">{todo.group && todo.group.name}</span></p>
            }
            <button className=" underline" onClick={() =>toggleEdit() }>Edit</button>
            <button className="ml-4 text-rose-600 " onClick={() => del(route('todos.destroy', todo.id), {preserveScroll:true})}>X</button>
            {!inGroup &&   <button data-bs-toggle="modal" data-bs-target={`#todo-${todo.id}-modal`} >Add to Group </button>}
        </li>
    </>
}
import React from "react";

const Tabs = ({ color, openTab, setOpenTab }) => {
    return (
        <>
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-" + color + "-400"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                Todos
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-" + color + "-400"
                                        : "text-" + color + "-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                Groups
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
const Todos = ({children}) => {
    const { setData: setTodo, post, errors} =   useForm({
        name: '',
    });
    const handleSubmit = (e) => {
        post(route('todos.store'), {
            preserveState: false,
        });
        e.preventDefault();
    }
    return <>
        <h2 className="text-xl font-bold mb-4">Todos</h2>
        <ul className="space-y-2">
            {children}
            <li className={" "} >
                <form className="flex flex-col" onSubmit={(e => handleSubmit(e))}>
                    <input className="  bg-white rounded-lg w-full border-none font-medium cursor-pointer p-4"
                           type="text" placeholder="New Todo" onChange={(e) => setTodo('name', e.target.value)}
                    />
                    {errors.name && <span className="text-rose-600 text-sm mt-1">{errors.name}</span>}

                </form>
            </li>
        </ul>
    </>
}
const Modal = ({groups, id, title, todo}) => {
    const { setData: setGroup, post} = useForm({
        group_id: groups[0]?.id
    });
    const handleSubmit = (e) => {
        post(route('todos.groups.add', todo.id), {
            preserveState: true,
            preserveScroll: true,
        });
        e.preventDefault();
    }
    return  <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">{title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id={`addGroup-${todo.id}`} onSubmit={(e)=>handleSubmit(e)}>
                        <select onChange={ (e)=> setGroup('group_id', e.target.value)}>
                            {groups && groups.map((group) => (
                                <option value={group.id} key={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </form>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" form={`addGroup-${todo.id}`}>Add to Group</button>
                </div>
            </div>
        </div>
    </div>
}
const Groups = ({groups}) => {
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
                        <button className="ml-4 text-rose-600 " onClick={() => del(route('groups.destroy', group.id), {preserveScroll:true})} >X</button>
                </div>
                    <ul id={`todo-${group.id}`} className="w-10/12 ml-10 collapse visible border-2 p-2 space-y-2">
                        {group.todos.map((todo) => (
                            <>
                                <Todo key={todo.id} inGroup={true} todo={todo} className={"bg-rose-400"}/>
                            </>
                        ))}
                    </ul>
            </li>
            ))}

            <li>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
                    <input className="  bg-white rounded-lg w-full border-none font-medium cursor-pointer p-4"
                           type="text" placeholder="New Group" onChange={(e) => setGroup('name', e.target.value)}
                    />
                </form>
            </li>
        </ul>
    </>
}
export default function Home({todos, groups}) {
    const [openTab, setOpenTab] = React.useState(1);
    const todosTab = ()=>{
        return <Todos>
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo}>
                        <Modal id={`todo-${todo.id}-modal`} groups={groups} title="Add to Group" todo={todo}/>
                    </Todo>
                ))}
        </Todos>
    }
    return (
        <>
            <div className="w-2/3 mx-auto w-full flex flex-col p-20 space-y-6 items-center justify-center">
                <Head title="Todo App" />
                <h1 className="text-4xl font-bold">Todo App</h1>
                <Tabs color="rose" openTab={openTab} setOpenTab={setOpenTab} />
                <div className="bg-rose-400 h-auto w-full p-20 px-40  rounded-md ">
                    {openTab === 1 ? todosTab(): <Groups groups={groups}/>}
                </div>
            </div>
            </>
    );
}
