import React from 'react';
import {useForm} from 'react-hook-form';
import Input from './Input';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/auth/authSlice";

// @ts-ignore
export default function AuthModalInputs({isSignIn}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const dispatch = useDispatch();
    // @ts-ignore
    const authState = useSelector(state => state.auth);

    const onSubmit = (data: any) => {
        // @ts-ignore
        dispatch(loginUser(data));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {isSignIn ? (
                <>
                    <Input
                        register={register}
                        name="email"
                        type="text"
                        placeholder="Email"
                        error={errors.email}
                    />
                    <Input
                        register={register}
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                    />
                </>
            ) : (
                <>
                    <Input
                        register={register}
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        error={errors.firstName}
                    />
                    <Input
                        register={register}
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        error={errors.lastName}
                    />
                    <Input
                        register={register}
                        name="email"
                        type="text"
                        placeholder="Email"
                        error={errors.email}
                    />
                    <Input
                        register={register}
                        name="phone"
                        type="text"
                        placeholder="Phone"
                        error={errors.phone}
                    />
                    <Input
                        register={register}
                        name="city"
                        type="text"
                        placeholder="City"
                        error={errors.city}
                    />
                    <Input
                        register={register}
                        name="password"
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                    />
                </>
            )}
            <input type="submit"/>
            {authState.status === 'loading' && <p>Loading...</p>}
            {authState.status === 'failed' && <p>Error: {authState.error}</p>}
        </form>
    );
}
