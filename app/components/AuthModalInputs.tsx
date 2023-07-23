import React from "react";
import {IInputs} from "./AuthModal";

export default function AuthModalInputs({inputs, handleChangeInput, isSignIn}: {
    isSignIn: boolean,
    inputs: IInputs,
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div>
            {
                isSignIn ?
                    (
                        <>
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
                                    type="password"
                                    className="border rounded p-2 py-3 w-full"
                                    placeholder="Password"
                                    value={inputs.password}
                                    onChange={handleChangeInput}
                                    name="password"
                                />
                            </div>
                        </>
                    )
                    :
                    (
                        <>
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
                        </>

                    )
            }
        </div>
    );
}