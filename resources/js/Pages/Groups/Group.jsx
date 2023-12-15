import editBtn from '@/../images/edit.svg'
import deleteBtn from '@/../images/delete.svg'
import Todo from '@/Pages/Todos/Todo.jsx'
import React from 'react'
import { useForm } from '@inertiajs/react'

export default function Group ({ group }) {
    const [edit, setEdit] = React.useState(false)
    const {
        data,
        setData: setNew,
        patch: update,
        delete: del
    } = useForm({ name: group.name })
    const deleteGroup = id => {
        del(route('groups.destroy', id), { preserveScroll: true })
    }
    const submit = e => {
        update(route('groups.update', group.id), {
            preserveState: true,
            onSuccess: () => setEdit(false)
        })
        e.preventDefault()
    }
    const editInput = () => {
        return (
            <form
                className={'flex flex-col flex-1 w-full'}
                onSubmit={e => submit(e)}
            >
                <input
                    autoFocus
                    type='text'
                    className={
                        'w-full p-4 border-none focus:ring-0 focus:outline-none font-medium bg-white rounded-lg cursor-pointer'
                    }
                    value={data.name}
                    onChange={e => setNew('name', e.target.value)}
                />
            </form>
        )
    }
    const toggleEdit = () => {
        setEdit(!edit)
    }
    const hasRecycled = () =>
        group.todos.filter(todo => todo.recycled).length > 0
    return (
        <li
            className={`font-medium shadow-md bg-white rounded-lg pr-4 pb-4 gap-2  ${
                edit ? 'border-2 border-blue-300' : ''
            }  `}
            key={group.id}
        >
            <div className='flex justify-between'>
                {edit ? (
                    editInput()
                ) : (
                    <p
                        data-bs-toggle='collapse'
                        data-bs-target={`#todo-${group.id}`}
                        role={'button'}
                        className='p-4 capitalize font-bold flex-1'
                    >
                        {group.name}
                    </p>
                )}
                <button onClick={() => toggleEdit()}>
                    <img className='w-5' src={editBtn} alt='edit button' />
                </button>
                <button
                    className='ml-4'
                    onClick={() => deleteGroup(group.id)}
                    title='delete'
                >
                    <img className='w-5' src={deleteBtn} alt='delete button' />
                </button>
            </div>
            <ul
                id={`todo-${group.id}`}
                className='w-10/12 ml-10 collapse visible p-2 space-y-2'
            >
                {group.todos.length > 0 && !hasRecycled() ? (
                    group?.todos?.map(
                        todo =>
                            !todo.recycled && (
                                <Todo
                                    key={todo.id}
                                    inGroup
                                    todo={todo}
                                    className={'bg-rose-400'}
                                />
                            )
                    )
                ) : (
                    <p className='p-4 capitalize text-red-600 font-bold flex-1'>
                        No Todos
                    </p>
                )}
            </ul>
        </li>
    )
}
