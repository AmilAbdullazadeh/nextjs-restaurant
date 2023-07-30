import React from 'react';

// @ts-ignore
const Input = ({ register, name, type, placeholder, error }) => {
    return (
        <div className="my-3 flex justify-between text-sm">
            <input
                {...register(name, { required: true })}
                type={type}
                className="border rounded p-2 py-3 w-full"
                placeholder={placeholder}
            />
            {error &&
                <p className="mt-2 text-xs text-red-600">
                    {placeholder} is required
                </p>
            }
        </div>
    );
};

export default Input;
