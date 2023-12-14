import {useForm} from "@inertiajs/react";
import React from "react";

export default function Todos ({children})  {
    const { setData: setNote, post, errors} =   useForm({
        name: '',
    });
    const handleSubmit = (e) => {
        post(route('todos.store'), {
            preserveState: false,
        });
        e.preventDefault();
    }
    return <>
        <h2 className="text-2xl font-bold mb-4">Todos</h2>
        <ul className="space-y-2">
            {children}
            <li className={" "} >
                <form className="flex flex-col" onSubmit={(e => handleSubmit(e))}>
                    <input className="  bg-white rounded-lg w-full border-none focus:border-blue-300 focus:ring-2 font-medium cursor-pointer p-4"
                           type="text" placeholder="New Todo" onChange={(e) => setNote('name', e.target.value)}
                    />
                    {errors.name && <span className="text-rose-600 text-sm mt-1">{errors.name}</span>}

                </form>
            </li>
        </ul>
    </>
}
