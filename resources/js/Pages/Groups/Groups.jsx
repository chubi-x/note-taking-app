import {useForm} from "@inertiajs/react";
import React from "react";

import Group from "@/Pages/Groups/Group.jsx";

export default function Groups({groups}) {
    const { setData: setGroup, post} =   useForm({
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
                <Group key={group.id} group={group} className="border-b-2 border-gray-400"/>
            ))}

            <li>
                <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col">
                    <input className="bg-white rounded-lg w-full focus:border-blue-300 focus:ring-2 border-none font-medium cursor-pointer p-4"
                           type="text" placeholder="New Group" onChange={(e) => setGroup('name', e.target.value)}
                    />
                </form>
            </li>
        </ul>
    </>
}
