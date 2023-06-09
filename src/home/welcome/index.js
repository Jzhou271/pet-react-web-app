import React from "react";
import { useSelector } from "react-redux";
import "../../styles/app.css";
import "../../index.css";
import { useNavigate } from "react-router";
const Welcome = () => {
    const { currentUser } = useSelector((state) => state.users);
    const navigate = useNavigate();
    const NavToSigninScreen = () => {
        navigate('/signin')
    }
    
    return (
        <> {!currentUser && 
        <div className="btn btn-primary buttons text-dark"
        onClick={NavToSigninScreen}
        >Please sign in or sign up
        </div>}
            {currentUser &&
                <div className="list-group fw-bold mb-4 rounded-circle text-center"
                    style={{ fontSize: '20px', color: 'gray' }}>
                    <span>
                        Welcome back!{'   '}<span className="text-primary">{currentUser.firstName}</span>
                        <i className="fas fa-paw ms-2 wd-paw-icon"></i>
                    </span>
                </div>
            }</>
    )
}
export default Welcome;