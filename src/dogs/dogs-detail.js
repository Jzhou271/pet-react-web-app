import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDetail } from "./dogs-service";
import { useSelector } from "react-redux";
import * as service from "../services/likes-service";
import * as dislikeService from "../services/dislikes-service";
import Modal from "../components/modal.js";
import "./index.css";

function DogsDetailScreen() {
    const [showModal, setShowModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const closeModal = () => {
        setShowModal(false);
    };
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state => state.users))
    const loggedIn = currentUser != null;
    const checkLiked = async () => {
        if (loggedIn) {
            const res = await service.findLikedOrNotByUser(currentUser._id, id);
            if (res.length > 0) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        } else {
            setLiked(false);
        }
    }

    const checkDisliked = async () => {
        if (loggedIn) {
            const res = await dislikeService.findDislikedOrNotByUser(currentUser._id, id);
            if (res.length > 0) {
                setDisliked(true);
            } else {
                setDisliked(false);
            }
        } else {
            setDisliked(false);
        }
    }

    const [detail, setDetail] = useState({});

    const searchDogs = async () => {
        const response = await getDetail(id);
        setDetail(response);
    }

    const likeDetail = async () => {
        if (!loggedIn) {
            setShowModal(true);
            setErrorMsg("You need to log in to like a detail page");
        } else {
            const response = await service.userLikesDetail(currentUser._id, id);
            setLiked(true);
            console.log("userLikesDetail response: ", response);
        }
    }
    const RevertLikeDetail = async () => {
        if (!loggedIn) {
            setShowModal(true);
            setErrorMsg("You need to log in to revert a like on a detail page");
        } else {
            const response = await service.userRevertLikesDetail(currentUser._id, id);
            setLiked(false);
            console.log("userRevertLikesDetail response: ", response);
        }
    }

    const dislikeDetail = async () => {
        if (!loggedIn) {
            setShowModal(true);
            setErrorMsg("You need to log in to dislike a detail page");
        } else {
            const response = await dislikeService.userDislikesDetail(currentUser._id, id);
            setDisliked(true)
            console.log("userDislikesDetail response: ", response);
        }
    }

    const revertDislikeDetail = async () => {
        if (!loggedIn) {
            setShowModal(true);
            setErrorMsg("You need to log in to revert a dislike on a detail page");
        } else {
            const response = await dislikeService.userRevertDislikesDetail(currentUser._id, id);
            setDisliked(false)
            console.log("userRevertDislikesDetail response: ", response);
        }
    }

    useEffect(() => {
        searchDogs(id);
        checkLiked();
        checkDisliked();
    }, []
    );


    // console.log("liked is:", liked);
    // console.log("disliked is:", disliked);
    // console.log("detail is:", detail);
    function renderDetailValue(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            return value;
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (typeof value === 'object') {
            return Object.entries(value)
                .map(([key, val]) => `${key}: ${val}`)
                .join(', ');
        }
        return JSON.stringify(value, null, 2);
    }

    return (
        <div className="container bg-light p-4 ps-5 border">
            <button className='btn border mb-4'
                onClick={() => navigate(-1)}>
                <i className="fas fa-arrow-left me-2"></i>Back
            </button>

            <p className="display-4 mb-5">{detail.name}</p>
            <div className="row">
                <div className="col">
                    <div>
                        <img src={`https://cdn2.thedogapi.com/images/${id}.jpg`} width={400} height={300} alt={id} />
                    </div>
                </div>
                <div className="col">
                    <div className="detail-container">
                        <p>
                            <strong>Name:</strong> {detail.name || 'unknown'}
                        </p>
                        <p>
                            <strong>Country_code:</strong> {detail.country_code ? renderDetailValue(detail.country_code) : 'unknown'}
                        </p>
                        <p>
                            <strong>Breed_for:</strong> {detail.breed_for ? renderDetailValue(detail.breed_for) : 'unknown'}
                        </p>
                        <p>
                            <strong>Breed_group:</strong> {detail.breed_group ? renderDetailValue(detail.breed_group) : 'unknown'}
                        </p>
                        <p>
                            <strong>Weight:</strong> {detail.weight ? renderDetailValue(detail.weight) : 'unknown'}
                        </p>
                        <p>
                            <strong>Height:</strong> {detail.height ? renderDetailValue(detail.height) : 'unknown'}
                        </p>
                        <p>
                            <strong>Lift_span:</strong> {detail.lift_span ? renderDetailValue(detail.lift_span) : 'unknown'}
                        </p>
                        <div className="row">
                            <div className="col-3">
                                {liked ? <button className="btn btn-success mt-2 like-button" onClick={RevertLikeDetail}><i className="bi bi-heart-fill" /></button> : <button className="btn btn-success mt-2 me-2 like-button" onClick={likeDetail}><i className="bi bi-heart" /></button>}
                            </div>
                            <div className="col">
                                {disliked ? <button className="btn btn-danger mt-2 dislike-button" onClick={revertDislikeDetail}><i className="bi bi-heartbreak-fill" /></button> : <button className="btn btn-danger mt-2 ms-2 dislike-button" onClick={dislikeDetail}><i className="bi bi-heartbreak" /></button>}
                            </div>
                            <Modal show={showModal} message={errorMsg} onClose={closeModal} />
                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}

export default DogsDetailScreen;