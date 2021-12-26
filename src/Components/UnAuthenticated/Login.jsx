import { useState, useEffect } from "react";
import InputField from "../Reusable/InputField";
import { patternEmail } from "../Utils/Validations";
import { Form, Button } from "antd";
import "antd/dist/antd.min.css";
import AuthService from "../Services/login";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { addProfile } from "../Store/Actions";
import { error, success, debounce } from "../Utils/CommonFunctions";

function Login({ dispatch }) {
    const [email, setEmail] = useState(""); 
    const [flagValid, setFlagValid] = useState(false);
    const [step, setStep] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    let navigate = useNavigate();

    //function called after email is submitted. Handles the token set in local and otp verification
    const onFinish = (values) => {
        AuthService.emailVerification(email)
            .then((res) => {
                localStorage.setItem("token", res?.data?.results?.token);
                setToken(res?.data?.results?.token);
                setStep(true);
                setFlagValid(false);
            })
            .catch((err) => {
                error(err);
            });
    };

    //function to check if the otp authentication
    const onFinishOtp = (values) => {
        AuthService.verifyToken(token, email, otp)
            .then((res) => {
                if (res?.data?.success) {
                    if (res?.data?.results?.isLogin) {
                        dispatch(addProfile(res?.data?.results?.user));
                        navigate("/profile");
                    } else {
                        navigate("/signup", { state: { email: email } });
                    }
                } else {
                    error(res?.data?.message);
                }
            })
            .catch((err) => {
                error(err);
            });
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeOtp = (e) => {
        setOtp(e.target.value);
    };

    //function called to resend the otp
    const resendOtp = () => {
        AuthService.resendOtp(localStorage.getItem("token"), email)
            .then((res) => {
                if (!res?.data?.success) {
                    error(res?.data?.message);
                } else {
                    success(res?.data?.message);
                }
            })
            .catch((err) => {
                error(err);
            });
    };

    useEffect(() => {
        if (email.match(patternEmail)) {
            setFlagValid(true);
        } else {
            setFlagValid(false);
        }
    }, [email]);

    useEffect(() => {
        if (otp?.length === 6) {
            setFlagValid(true);
        } else {
            setFlagValid(false);
        }
    }, [otp]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
            }}>
            {!step && (
                <Form name="EmailForm" onFinish={onFinish} autoComplete="off">
                    <InputField
                        placeholder={"Enter Email"}
                        name={email}
                        onChange={handleChangeEmail}
                        value={email}
                        type={"text"}
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={flagValid ? false : true}
                        style={{
                            margin: "auto",
                            display: "block",
                            marginTop: "12px",
                        }}>
                        Get OTP
                    </Button>
                </Form>
            )}
            {step && (
                <Form name="EmailForm" onFinish={onFinishOtp}>
                    <InputField
                        placeholder={"Enter otp"}
                        name={email}
                        onChange={handleChangeOtp}
                        value={otp}
                        type={"text"}
                    />
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={flagValid ? false : true}
                        style={{
                            margin: "auto",
                            display: "block",
                            marginTop: "12px",
                        }}>
                        Enter OTP
                    </Button>
                    <Button
                        onClick={debounce(resendOtp, 1000)}
                        style={{
                            margin: "auto",
                            display: "block",
                            marginTop: "12px",
                        }}>
                        {" "}
                        Resend OTP
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default connect()(Login);
