import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import Home from "./home";
import Footnote from "./home/Footnote";
import './styles/app.css'
import DogsScreen from "./dogs";
import DogsSearch from "./dogs/dogs-search";
import SigninScreen from "./screens/signin-screen";
import SignupScreen from "./screens/signup-screen";
import AdminScreen from "./screens/admin-screen";
import { Provider } from 'react-redux';
import { store } from "./redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
import AdminUsersScreen from './screens/admin-users-screen';
import AdminPostsScreen from './screens/admin-posts-screen';
import AdminEventsScreen from './screens/admin-events-screen';
import DogsDetailScreen from "./dogs/dogs-detail";
import AboutScreen from "./screens/about-screen";
import ProfileComponent from "./profile";
import EditProfileComponent from "./profile/edit-profile-component";
import EventCompoment from "./event/index";
import OtherUserProfileComponent from "./profile/other-user-profile";

function App() {
    return (
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <BrowserRouter>
                <div className="wd-background">
                    <div className="text-center fw-bold mb-4"
                        style={{ fontFamily: 'cursive', fontSize: '80px', color: 'lightpink' }}>
                        Dog Land
                    </div>
                    <div className="content-wrapper">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/home/*" element={<Home />} />
                            <Route path="/signin" element={<SigninScreen />} />
                            <Route path="/signup" element={<SignupScreen />} />
                            <Route path="/about" element={<AboutScreen />} />
                            <Route path="/admin" element={<AdminScreen />} />
                            <Route path="/admin/users" element={<AdminUsersScreen />} />
                            <Route path="/admin/posts" element={<AdminPostsScreen />} />
                            <Route path="/admin/events" element={<AdminEventsScreen />} />
                            <Route path="/dogs" element={<DogsScreen />} />
                            <Route path="/dogs/search" element={<DogsSearch />} />
                            <Route path="/dogs/search/:searchTerm" element={<DogsSearch />} />
                            <Route path="/dogs/search/detail/:id" element={<DogsDetailScreen />} />
                            <Route path="/profile" element={<ProfileComponent />} />
                            <Route path="/profile/:id" element={<OtherUserProfileComponent />} />
                            <Route path="/edit-profile" element={<EditProfileComponent />} />
                            <Route path="/event" element={<EventCompoment />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
            <div className='row wd-footer-box'>
                <Footnote />
            </div>
            {/* </PersistGate> */}
        </Provider>
    );
}

export default App;