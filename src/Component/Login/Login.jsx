import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { auth } from "../../Firebase_init";
import { Link } from "react-router-dom";


const Login = () => {

    const [showPass, setShowPass] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const pass = event.target.password.value;

        setErrorMsg('')

        signInWithEmailAndPassword(auth, email, pass)
            .then((result) => {

                if (!result.user.emailVerified) {
                    setErrorMsg("Please Verify your email address")
                } else {
                    setErrorMsg("Login success")
                }

            })
            .catch((error) => {
                console.log(error)
            })

    }

    const handleResetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            setErrorMsg("please provide a valid email")
        }
        else {
            sendPasswordResetEmail(auth, email)
            .then(()=> {
                setErrorMsg("Password reset email sent")
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-center">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input type={showPass ? 'text' : 'password'}
                                    className="grow"
                                    name="password"
                                    placeholder="Password" />
                                <button onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <FaEye></FaEye> : <IoMdEyeOff></IoMdEyeOff>}
                                </button>
                            </label>
                            <label className="label">
                                <a onClick={handleResetPass} className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                        </div>
                        <p className="text-left">I have no Account <Link to='/signup'>Sign Up</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <p>{errorMsg}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;