import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {updateUserThunk} from "../../services/users-thunks";
import {getUserById} from "../../services/users-service";

const EditProfileComponent = () => {
    const {currentUser} = useSelector(state => state.users);
    const [user, setUser] = useState({});
    const [avatarPreview, setAvatarPreview] = useState(user.avatar);
    const fileInputRef = useRef();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const fetchedUser = await getUserById(currentUser._id);
        setUser(fetchedUser);
    };

    useEffect(() => {
        setAvatarPreview(null);
        fetchUser();
    }, [])

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target.result.replace(/^data:image\/(png|jpg);base64,/, "");
            setUser({...user, avatar: base64String});
            setAvatarPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    }

    const updateProfileClickHandler = () => {
        const newFirstname = document.getElementById('firstName').value;
        const newLastname = document.getElementById('lastName').value;
        const newBio = document.getElementById('bio').value;
        const newLocation = document.getElementById('location').value;
        const newBirthdate = DashToSlashConvert(document.getElementById('birthdate').value);
        const newAvatar = avatarPreview || user.avatar || "/img/default-avatar.png";

        const currProfile = {
            ...currentUser,
            'firstName': newFirstname,
            'lastName': newLastname,
            'bio': newBio,
            'location': newLocation,
            'birthdate': newBirthdate,
            'avatar': newAvatar,
        };

        dispatch(updateUserThunk(currProfile));
    }

    return (
        <div className="container w-75 bg-white border p-2">
            <div className="row align-items-center pb-2">
                <div className="col-1">
                    <Link to="/profile">
                        <i className="bi bi-x-lg float-end" style={{color: "grey"}}></i>
                    </Link>
                </div>
                <div className="col-9">
                    <div className="fw-bolder">Edit profile</div>
                </div>
                <div className="col-2 float-end">
                    <Link to="/profile">
                        <button onClick={updateProfileClickHandler} className="btn btn-dark rounded-pill float-end">Save
                        </button>
                    </Link>
                </div>
            </div>

            <div className="pos-relative" style={{marginTop: "30px"}}>
                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{display: "none"}}
                    ref={fileInputRef}
                />
                <img
                    className="wd-avatar rounded-circle"
                    src={ avatarPreview || user.avatar ||  "/img/default-avatar.png"}
                    alt=""
                    onClick={handleAvatarClick}
                    style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        marginTop: "10px",
                        cursor: "pointer",
                    }}
                />
            </div>

            {user.firstName && (
                <div className="border pt-2 mb-2 rounded-1">
                    <label className="text-secondary ps-2">First Name</label>
                    <input id="firstName" className="form-control border-0" defaultValue={`${user.firstName}`}/>
                </div>
            )}
            {user.lastName &&
                <div className="border pt-2 mb-2 rounded-1">
                    <label className="text-secondary ps-2">Last Name</label>
                    <input id="lastName" className="form-control border-0"
                           defaultValue={`${user.lastName}`}/>
                </div>}
            <div className="border pt-2 rounded-1">
                <label className="text-secondary ps-2">Description</label>
                <textarea id="bio" className="form-control border-0"
                          defaultValue={user.bio !== null && user.bio !== undefined ? `${user.bio}` : ''}
                          placeholder="Enter a description..."/>
            </div>
            <div className="border pt-2 mt-2 rounded-1">
                <label className="text-secondary ps-2">Location</label>
                <input id="location" className="form-control border-0"
                       defaultValue={user.location !== null && user.location !== undefined ? `${user.location}` : ''}
                       placeholder="Enter a location..."/>
            </div>
            <div className="border pt-2 ps-2 mt-2 rounded-1">
                <div className="mt-1">
                    <div className="d-flex align-items-center">
                        <div className="text-secondary">Birthday</div>
                    </div>
                </div>
                <input id="birthdate" type="date" className="form-control border-0"
                       defaultValue={user.birthdate !== null && user.birthdate !== undefined ? slashToDashConvert(user.birthdate) : ''}/>
            </div>
        </div>
    );

};

export const slashToDashConvert = (slashDate) => {
    if (slashDate == null) {
        return;
    }
    let [month, day, year] = slashDate.split("/");
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}
export const DashToSlashConvert = (DashDate) => {
    if (DashDate == null) {
        return;
    }
    let [year, month, day] = DashDate.split("-");
    if (month < 10) {
        month = month.substring(1);
    }
    if (day < 10) {
        day = day.substring(1);
    }
    return month + "/" + day + "/" + year;
}

export default EditProfileComponent;
