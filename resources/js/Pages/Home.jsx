import { Head} from '@inertiajs/react';
import React from "react";
import Todos from "@/Pages/Todos/Todos.jsx";
import Todo from "@/Pages/Todos/Todo.jsx";
import Groups from "@/Pages/Groups/Groups.jsx";
import Tabs from "@/Components/Tabs.jsx";
import GroupModal from "@/Components/GroupModal.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
export default function Home({auth, todos, groups}) {
    const [openTab, setOpenTab] = React.useState(1);
    const todosTab = () => {
        return <Todos todos={todos}>
                {todos.map((todo) => (
                  !todo.recycled &&  <Todo key={todo.id} todo={todo}>
                        <GroupModal id={`todo-${todo.id}-modal`} groups={groups} title="Add to Group" todo={todo}/>
                    </Todo>
                ))}
            </Todos>
    }
    return (
            <Authenticated user={auth.user}>
                <div className="w-full md:w-2/3 mx-auto w-full flex flex-col p-6 md:p-20 space-y-6 items-center justify-center">
                    <Head title="Todo App" />
                    <h1 className="text-4xl font-bold">Todo App</h1>
                    <Tabs color="rose" openTab={openTab} setOpenTab={setOpenTab} />
                    <div className="shadow-md shadow-red-500 h-auto w-full py-10 px-6 md:px-16 rounded-md ">
                        {openTab === 1 ? todosTab(): <Groups groups={groups}/>}
                    </div>
                </div>
            </Authenticated>

    );
}
