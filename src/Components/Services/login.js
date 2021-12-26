import axios from "axios";

const API_URL = "https://hiring.getbasis.co/candidate/users"; //baase url

//Global Authentication Service 

const AuthService = {

    //email verify for otp 
    emailVerification: function (email) {
        return axios.post(API_URL + "/email", { email: email });
    },

    //verify the entered otp
    verifyToken: function (token, email, verificationCode) {
        return axios.put(API_URL + "/email/verify", {
            token,
            email,
            verificationCode,
        });
    },

    //signup api
    signUp: function (
        firstName,
        referredCodeKey,
        email,
        token,
        source = "WEB_APP",
        agreeToPrivacyPolicy = true
    ) {
        return axios.post(API_URL, {
            firstName,
            agreeToPrivacyPolicy,
            email,
            token,
            referredCodeKey,
            source,
        });
    },

    //referral input code verification
    verifyReferral: function (code) {
        return axios.get(API_URL + `/referral/${code}`, {
            headers: this.authHeader(),
        });
    },

    //logout api
    logout: function (_id, token) {
        localStorage.removeItem("token");
        return axios.delete(API_URL + `/logout/${_id}`, {
            headers: { Authorization: `Bearer ${_id},${token}` },
        });
    },

    //resend the otp again
    resendOtp: function (token,email) {
        return axios.put(API_URL + "/token/resendtoken", {
            token,
            email
        });
    },

    //authentication header
    authHeader: function () {
        return { Authorization: this.getToken() };
    },
};

export default AuthService;