import { Head} from '@inertiajs/react';
import React from "react";
import Todos from "@/Pages/Todos/Todos.jsx";
import Todo from "@/Pages/Todos/Todo.jsx";
import Groups from "@/Pages/Groups/Groups.jsx";
import Tabs from "@/Components/Tabs.jsx";
import Modal from "@/Components/Modal.jsx";



export default function Home({todos, groups}) {
    const [openTab, setOpenTab] = React.useState(1);
    const todosTab = () => {
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
