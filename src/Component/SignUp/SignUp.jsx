import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase_init";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const SignUp = () => {


    const [errorMsg, setErrorMsg] = useState('')
    const [success, setSuccess] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handleSignup = (event) => {

        event.preventDefault();

        const emaildata = event.target.email.value;
        const passworddata = event.target.password.value;
        const checkBox = event.target.checkbox.checked;
        const name = event.target.name.value;

        setErrorMsg('');
        setSuccess(false);

        if (!checkBox) {
            setErrorMsg('Please read our terms and accept');
            return;
        }

        if (passworddata.length < 6) {
            setErrorMsg('Password should be 6 charecters or longer');
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(passworddata)) {
            setErrorMsg('At least one uppercase, one lowercase, one number, one special charecter');
            return;
        }

        createUserWithEmailAndPassword(auth, emaildata, passworddata)
            .then((result) => {
                const user = result.user;

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("msg sent in gmail")
                    });

                const profile = {
                    displayName: name
                }

                updateProfile(auth.currentUser, profile)
                .then(result => {
                    console.log("add profile")
                })
                .catch(error => {
                    console.log(error)
                })

                setSuccess(true)
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMsg(error.message);
                setSuccess(false)
            })

    }


    return (
        <div className="w-2/6 mx-auto space-y-6">
            <h1 className="text-5xl font-bold text-center">Sign Up now!</h1>
            <form onSubmit={handleSignup} className="space-y-6">
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="text" name="name" className="grow" placeholder="First Name" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name="email" className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type={showPass ? 'text' : 'password'}
                        className="grow"
                        name="password"
                        placeholder="Password" />
                    <button onClick={() => setShowPass(!showPass)}>
                        {showPass ? <FaEye></FaEye> : <IoMdEyeOff></IoMdEyeOff>}
                    </button>
                </label>
                <div className="form-control">
                    <label className="cursor-pointer label justify-start gap-2">
                        <input type="checkbox" name="checkbox" className="checkbox checkbox-info" />
                        <span className="label-text">Can you accept out terms</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>

            {
                errorMsg && <p>{errorMsg}</p>
            }

            {
                success && <p>Sign Up success</p>
            }
            <p>I have Already an Account <Link to='/login'>Login</Link></p>

        </div>
    );
};

export default SignUp;