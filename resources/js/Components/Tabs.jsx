import React from "react";
export default function Tabs ({ color, openTab, setOpenTab }) {
    const tabStyle =(id) => `${ (openTab === id
        ? "text-white bg-" + color + "-400"
        : "text-" + color + "-600 bg-white")}`
    return (
        <>
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap flex-row cursor-pointer"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    ` ${tabStyle(1)} text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal`
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                role="tablist"
                            >
                                Notes
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    ` ${tabStyle(2)} text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal`
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
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
