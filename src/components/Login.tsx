import { useState } from "react"
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";

type LoginProps = {
    onLogin: () => void,
    onRegister: () => void
}

const Login = ({ onLogin, onRegister }: LoginProps) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        active: "login",
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        onLogin: onLogin,
        onRegister: onRegister
    });

    const onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setFormData((prevStete) => ({ ...prevStete, [name]: value }));
    };


    const setFormType = (formName: string) => {
        setFormData((prevState) => ({ ...prevState, active: formName }))
    }

    const onSubmitLogin = (e) => {
        e.preventDefault();
        formData.onLogin(formData.login, formData.password);
        navigate("/");
    };

    const onSubmitRegister = (e) => {
        e.preventDefault();
        formData.onRegister(formData.firstName, formData.lastName, formData.login, formData.password);
        navigate("/");
    };



    return (
        <div className="row justify-content-center mt-5">
            <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", formData.active === "login" ? "active" : "")} id="tab-login"
                            onClick={() => setFormType("login")}>Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={classNames("nav-link", formData.active === "register" ? "active" : "")} id="tab-register"
                            onClick={() => setFormType("register")}>Register</button>
                    </li>
                </ul>

                <div className="tab-content">
                    <div className={classNames("tab-pane", "fade", formData.active === "login" ? "show active" : "")} id="pills-login" >
                        <form onSubmit={onSubmitLogin}>

                            <div className="form-outline mb-4">
                                <input type="login" id="loginName" name="login" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="loginName">Username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="loginPassword" autoComplete="login-password" name="password" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="loginPassword">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                        </form>
                    </div>
                    <div className={classNames("tab-pane", "fade", formData.active === "register" ? "show active" : "")} id="pills-register" >
                        <form onSubmit={onSubmitRegister}>

                            <div className="form-outline mb-4">
                                <input type="text" id="firstName" name="firstName" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="firstName">First name</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" id="lastName" name="lastName" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="lastName">Last name</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="text" id="login" name="login" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="login">Username</label>
                            </div>

                            <div className="form-outline mb-4">
                                <input type="password" id="registerPassword" autoComplete="register-password" name="password" className="form-control" onChange={onChangeHandler} />
                                <label className="form-label" htmlFor="registerPassword">Password</label>
                            </div>

                            <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login