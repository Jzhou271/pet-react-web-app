import {Link} from "react-router-dom";

function AdminComponent() {
    return (
        <div className="row mt-5">
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                        <img src="img/user_management.jpeg" className="w-100 mb-4"/>
                        <Link to="/users" className="btn btn-primary">User Management</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                        <img src="img/post_management.jpeg" className="w-100 mb-4"/>
                        <a href="/posts" className="btn btn-primary">Post Management</a>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                <div className="card">
                    <div className="card-body text-center">
                        <img src="img/event_management.jpeg" className="w-100 mb-4"/>
                        <a href="/events" className="btn btn-primary">Event Management</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminComponent;
