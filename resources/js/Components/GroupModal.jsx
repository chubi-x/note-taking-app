import {useForm} from "@inertiajs/react";
import React from "react";

export default function GroupModal({groups, id, title, todo}) {
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
    return  <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={title}
                 aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content text-black">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id={title}>{title}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form id={`addGroup-${todo.id}`} onSubmit={(e)=>handleSubmit(e)}>
                        <select onChange={ (e)=> setGroup('group_id', e.target.value)}>
                            <option value='Select a Group' disabled>
                                Select a Group
                            </option>
                            {groups && groups.map((group) => (
                                <option value={group.id} key={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </form>

                </div>
                <div className="modal-footer bg-gray-800">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" form={`addGroup-${todo.id}`}>Add to Group</button>
                </div>
            </div>
        </div>
    </div>
}
