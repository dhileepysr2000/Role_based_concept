import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export function Dashboard() {
    let id = localStorage.getItem('empid');
    const [detail, setDetail] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3002/dashboard')
            .then(response => response.json())
            .then(json => setDetail(json))
    }, [])

    const data_del = (id) => {
        var datastring = { id: id };
        var config = { headers: { "enctype": "multipart/form-data" } };
        axios.post('http://localhost:3002/Delete', datastring, config)
            .then(function (res) {
                if (res.data.status === 'error') {
                    alert('Error');
                    window.location.reload();
                }
                else if (res.data.status === 'Success') {
                    alert('Data Deleted')
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
                window.location.reload();
            })
    }

    return (
        <div className="container-fluid adminn">
            <div className="col-lg-12 text-center mt-5">
                <h3>Dashboard</h3>
            </div>
            <div className="col-lg-12 row">
                <div className="col-lg-4 mt-2">
                    <h5>Welcome !!!.</h5>
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
                        <table className="table text-light table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    detail.map((value, index) => (
                                        <tr>
                                            <td>{value.id}</td>
                                            <td>{value.username}</td>
                                            <td>{value.password}</td>
                                           
                                            <td>
                                                <Link to={"/Update/" + value.id}>
                                                    <button type="button" name="data_update" id="data_update" className="btn btn-success">Update</button>
                                                </Link>
                                                <button type="button" name="data_del" id="data_del" className="ml-1 btn btn-danger" onClick={() => { data_del(value.id) }}>Delete</button>
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