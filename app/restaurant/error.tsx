"use client"

import Image from "next/image";
import errorIcon from "../assets/icons/alert-circle.svg";

export default function Error({error}: { error: Error }) {
    console.log(error)
    return (
        <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
            <Image src={errorIcon} alt="error" className="w-32 mb-8" />
            <div className="bg-white px-9 py-14 shadow rounded">
                <h3 className="text-3xl font-bold">Well, this is embarrassing</h3>
                <p className="text-reg font-bold">{error.message}</p>
                <p className="mt-6 text-sm font-light">Error Code: 400</p>
            </div>
        </div>
    )
};
