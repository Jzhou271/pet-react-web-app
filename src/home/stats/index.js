import React from "react";
import {useDispatch} from "react-redux";

const DogStats = (
    {
        dog = {
            "topic": "Space",
            "userName": "SpaceX",
            "time": "2h",
            "title": "Tesla Cybertruck lands on Mars and picks up the Curiosity rover on its 6' bed",
            "image": "tesla.png",
            "liked": true,
            "disliked": true,
            "replies": 345,
            "redogs": 321,
            "likes": 1234,
            "dislikes": 3,
            "handle": "@SpaceX",
            "dog": "Tesla Cybertruck lands on Mars and picks up the Curiosity rover on its 6' bed"
        }
    }
) => {
    const dispatch = useDispatch();
    const toggleLiked = (inre) => {
        dispatch(updateTuitThunk({...dog, likes: dog.likes + inre, liked: !dog.liked}))
    }
    const toggleDisliked = (inre) => {
        dispatch(updateTuitThunk({...dog, dislikes: dog.dislikes + inre, disliked: !dog.disliked}))
    }
    return (
        <div className="row justify-content-evenly mt-2">
            <div className="col">
                <i className="bi bi-chat"> <span>{dog.replies}</span></i>
            </div>
            <div className="col">
                <i className="bi bi-app-indicator"> <span>{dog.redogs}</span></i>
            </div>
            <div className="col">
                {dog.liked ?
                    <i className="bi bi-heart-fill" onClick={() => toggleLiked(-1)}> <span>{dog.likes}</span></i> :
                    <i className="bi bi-heart" onClick={() => toggleLiked(1)}> <span>{dog.likes}</span></i>}
            </div>
            <div className="col">
                {dog.disliked ?
                    <i className="bi bi-hand-thumbs-down-fill" onClick={() => toggleDisliked(-1)}>
                        <span>{dog.dislikes}</span></i> :
                    <i className="bi bi-hand-thumbs-down" onClick={() => toggleDisliked(1)}>
                        <span>{dog.dislikes}</span></i>}
            </div>
            <div className="col">
                <i className="bi bi-share"></i>
            </div>
        </div>
    );
};
export default DogStats;