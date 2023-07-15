import React from "react";
import MenuCard from "./MenuCard";

export default function Menu() {
    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    <MenuCard
                        // key={item.id}
                        // item={item}
                    />
                </div>
                {/*<div className="flex flex-wrap justify-between">*/}
                {/*    <p>This restaurant does not have a menu</p>*/}
                {/*</div>*/}
            </div>
        </main>
    );
}