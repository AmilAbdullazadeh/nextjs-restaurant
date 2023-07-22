"use client";

import Link from "next/link";
import React, {useState} from "react";
import {Button, Modal, Input} from "antd";

export default function NavBar() {
    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        city: "",
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputs, setInputs] = useState(initialState)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name]: e.target.value})

    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        console.log(inputs)
        setInputs(initialState);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl">
                Edinburg Farid's Restaurant
            </Link>
            <div>
                <div className="flex">
                    <Button type="primary" className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                            onClick={showModal}>
                        Sign in
                    </Button>
                    <Modal title="Sign in" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-[49%]"
                                placeholder="First Name"
                                value={inputs.firstName}
                                onChange={handleChangeInput}
                                name="firstName"
                            />
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-[49%]"
                                placeholder="Last Name"
                                value={inputs.lastName}
                                onChange={handleChangeInput}
                                name="lastName"
                            />
                        </div>
                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-full"
                                placeholder="Email"
                                value={inputs.email}
                                onChange={handleChangeInput}
                                name="email"
                            />
                        </div>
                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-[49%]"
                                placeholder="Phone"
                                value={inputs.phone}
                                onChange={handleChangeInput}
                                name="phone"
                            />
                            <input
                                type="text"
                                className="border rounded p-2 py-3 w-[49%]"
                                placeholder="City"
                                value={inputs.city}
                                onChange={handleChangeInput}
                                name="city"
                            />
                        </div>
                        <div className="my-3 flex justify-between text-sm">
                            <input
                                type="password"
                                className="border rounded p-2 py-3 w-full"
                                placeholder="Password"
                                value={inputs.password}
                                onChange={handleChangeInput}
                                name="password"
                            />
                        </div>
                    </Modal>
                    <button
                        className="bg-white-400 text-blue border p-1 px-4 rounded mr-3"
                        // onClick={signout}
                    >
                        Sign up
                    </button>
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