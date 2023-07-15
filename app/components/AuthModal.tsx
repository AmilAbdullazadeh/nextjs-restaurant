"use client";

import {useEffect, useState, useContext} from "react";
import AuthModalInputs from "./AuthModalInputs";

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

export default function AuthModal() {
    return (
        <div>
            <button
            >
                {/*{renderContent("Sign in", "Sign up")}*/}
            </button>
        </div>
    );
}