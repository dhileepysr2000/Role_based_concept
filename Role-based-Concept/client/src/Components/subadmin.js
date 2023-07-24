import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export function Subadmin() {
    let id = localStorage.getItem('empid');
    const [getdetail, setGetdetail] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3002/subadmin')
            .then(response => response.json())
            .then(json => setGetdetail(json))
    }, [])


    return (
        <div className="container-fluid userdash">
            <div className="col-lg-12 text-center mt-5">
                <h3>User Dashboard</h3>
            </div>
            <div className="col-lg-12 row">
                <div className="col-lg-4 mt-2">
                    <h5>To view profile</h5>
                </div>
                <div className="col-lg-6">&nbsp;</div>
                <div className="col-lg-2 mt-2">
                    <button className="btn btn-secondary">
                        <Link to="/" className="text-light">Logout</Link>
                    </button>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Password</th>

                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getdetail.map((value, index) => (
                                        <tr>
                                            <td>{value.id}</td>
                                            <td>{value.username}</td>
                                            <td>{value.password}</td>
                                            <td>{value.role}</td>
                                            <td>
                                                {/* <button type="button" name="data_del" id="data_del" className="btn btn-danger" onClick={() => { data_del(value.id) }}>Delete</button> */}
                                                <Link to={"/Update/" + value.id}>
                                                    <button type="button" name="data_update" id="data_update" className="btn btn-success">Update</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
    