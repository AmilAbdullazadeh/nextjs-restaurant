"use client";

import Link from "next/link";
import React, {useState} from "react";
import {Button, Modal, Input} from "antd";
import AuthModal from "./AuthModal";

export default function NavBar() {

    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                Edinburg Farid's Restaurant
            </Link>
            <div>
                <div className="flex">
                    <AuthModal isSignin={true}/>
                    <AuthModal/>
                    {/*<button*/}
                    {/*    className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"*/}
                    {/*    // onClick={signout}*/}
                    {/*>*/}
                    {/*    Sign out*/}
                    {/*</button>*/}
                </div>
            </div>
        </nav>
    );
}