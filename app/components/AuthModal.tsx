"use client";

import React, {useEffect, useState, useContext} from "react";
import AuthModalInputs from "./AuthModalInputs";
import {Button, Modal} from "antd";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
};

export interface IInputs {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    city: string,
}

export default function AuthModal({isSignin = false}: { isSignin?: boolean }) {

    const initialState: IInputs = {
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

    const renderContent = (signInContent: string, signUpContent: string): string => {
        return isSignin ? signInContent : signUpContent
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
        <div>
            <Button type="primary" className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                    onClick={showModal}>
                {renderContent("Sign in", "Sign up")}
            </Button>
            <Modal title={renderContent("Sign in", "Sign up")} open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                <AuthModalInputs isSignIn={isSignin} inputs={inputs} handleChangeInput={handleChangeInput}/>
            </Modal>
        </div>
    );
}