import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./index.css";
import {Link} from "react-router-dom";
import PostList from "../posts/post-list";
import {getUserByIdThunk} from "../services/users-thunks";
import {useNavigate} from "react-router-dom";
import * as followsService from "../services/follows-service";
import * as likesService from "../services/likes-service";
import * as dislikesService from "../services/dislikes-service";
import {findFollowedOrNot} from "../services/follows-service";
import CreatePostComponent from "../posts/create-post-component";

const ProfileComponent = () => {
    const {currentUser} = useSelector(state => state.users);
    // console.log("currentUser is:", currentUser);
    const dateOfBirth = BirthdateConvert(currentUser.birthdate);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [following, setFollowing] = useState([]);
    const [follows, setFollows] = useState([]);
    const [detailsLiked, setDetailsLiked] = useState([]);
    const [detailsDisliked, setDetailsDisliked] = useState([]);
    const [activeTab, setActiveTab] = useState("posts");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const fetchFollowing = async () => {
        const following = await followsService.findFollowsByFollowerId(currentUser._id);
        // console.log("following is:", following);
        setFollowing(following);
    }
    const fetchFollows = async () => {
        const follows = await followsService.findFollowsByFollowedId(currentUser._id);
        setFollows(follows);
    }

    const fetchDetailsLiked = async () => {
        const details = await likesService.findLikesByUserId(currentUser._id);
        setDetailsLiked(details);
    }

    const fetchDetailsDisliked = async () => {
        const details = await dislikesService.findDislikesByUserId(currentUser._id);
        setDetailsDisliked(details);
    }

    useEffect(() => {
        dispatch(getUserByIdThunk);
        fetchFollowing()
        fetchFollows()
        fetchDetailsLiked()
        fetchDetailsDisliked()
    }, [])

    // const dateOfJoin = JoinDateConvert(currentUser.joinedDate);
    return (

        <div className="border p-2">
            <div className="row pb-2">
                <div className="col-2">
                    <button className='btn border'
                            onClick={() => navigate(`/home`)}>
                        <i className="fas fa-arrow-left me-2"/>Back
                    </button>
                </div>
            </div>
            <div className="pos-relative">
                {/*<img className="wd-polyglot" src={`/img/${currentUser.bannerPicture}`} alt=""/>*/}
                {/*<img className="wd-avatar rounded-circle" src={`/img/${currentUser.profilePicture}`} alt=""/>*/}
                <Link to="/edit-profile">
                    <button className="btn btn-dark rounded-pill float-end m-2">Edit Profile</button>
                </Link>
            </div>
            <div>
                <div className="fw-bolder">{currentUser.firstName} {currentUser.lastName}</div>
                <div className="text-secondary">{currentUser.handle}</div>
            </div>
            <div className="pt-2">
                {currentUser.bio}
            </div>
            <div className="row pt-2">
                <div className="col-4">
                    <span className="bi bi-geo-alt text-secondary"></span>
                    <span className="ps-1">{currentUser.location}</span>
                </div>
                <div className="col-4">
                    <span className="bi bi-balloon text-secondary"></span>
                    <span className="ps-1">Born {dateOfBirth}</span>
                </div>

                {/*<div className="col-4">*/}
                {/*    <span className="bi bi-calendar3 text-secondary"></span>*/}
                {/*    <span className="ps-1">Joined {currentUser.joinedDate}</span>*/}
                {/*</div>*/}
            </div>

            <div className="pt-2 row">
                <div className="col-3">
                    <span className="fw-bolder">{following.length}</span> Following
                </div>
                <div className="col-3">
                    <span className="fw-bolder col-4">{follows.length}</span> Followers
                </div>
            </div>
            <br></br>
            <CreatePostComponent/>


            <div className="mt-3">
                <div className="row">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li
                                className={`list-group-item ${activeTab === "posts" && "active"}`}
                                onClick={() => handleTabChange("posts")}
                            >
                                Posts
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <ul className="list-group">
                            <li
                                className={`list-group-item ${activeTab === "likes" && "active"}`}
                                onClick={() => handleTabChange("likes")}
                            >
                                Likes
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <ul className="list-group">
                            <li
                                className={`list-group-item ${activeTab === "following" && "active"}`}
                                onClick={() => handleTabChange("following")}
                            >
                                Following
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <ul className="list-group">
                            <li
                                className={`list-group-item ${activeTab === "followers" && "active"}`}
                                onClick={() => handleTabChange("followers")}
                            >
                                Followers
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-md-9">
                    <div className="tab-content">
                        {activeTab === "posts" && (
                            <div className="tab-pane show active">
                                <PostList/>
                            </div>
                        )}
                        {activeTab === "likes" && (
                            <div className="tab-pane show active">
                                <h1>Likes Tab Content</h1>
                            </div>
                        )}
                        {activeTab === "following" && (
                            <div className="tab-pane show active">
                                <h1>Following Tab Content</h1>
                            </div>
                        )}
                        {activeTab === "followers" && (
                            <div className="tab-pane show active">
                                <h1>Followers Tab Content</h1>
                            </div>
                        )}
                    </div>
                </div>

            </div>


    );
};

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const BirthdateConvert = (date) => {
    if (date == null) return;
    const birthDate = date.split("/");
    const month = birthDate[0] - 1;
    return months[month] + " " + birthDate[1] + ", " + birthDate[2];
}
export const JoinDateConvert = (date) => {
    if (date == null) return;
    const joinDate = date.split("/");
    const joinMonth = joinDate[0] - 1;
    return months[joinMonth] + ", " + joinDate[1];
}

export default ProfileComponent;
