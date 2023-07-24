import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../App.css';

export default function Signin() {

    localStorage.clear();

    const handlesubmit = async (event) => {
        event.preventDefault();
        var datastring = new FormData(event.target);
        var config = { headers: { "enctype": "multipart/form-data" } };

        await axios.post("http://localhost:3002/Signin", datastring, config)
            .then(function (res) {
                if (res.data.status === 'syntax_error') {
                    alert('Contact Admin');
                    window.location.reload();
                }
                else if (res.data.status === 'success') {
                    let id = res.data.id;
                    let role = res.data.role;
                    let firstname = res.data.firstname;
                    if (role === 'Admin') {
                        alert(role);
                        localStorage.setItem('empid', id);
                        window.location.href = "/dashboard";
                    }
                    else if (role === 'User') {
                        alert(role);
                        let id = res.data.id;
                        // let username = res.data.username
                        localStorage.setItem("id", id);
                        localStorage.setItem("firstname", firstname);
                        window.location.href = "/User_dash";
                    }
                    else if (role === 'Employer') {
                        alert(role);
                        localStorage.setItem('empid', id);
                        window.location.href = "./Employer_dash";
                    }
                }
                else if (res.data.status === 'Invalid_details') {
                    alert('Invalid User details');
                    window.location.reload();
                }
                else {
                    alert('Enter Username/Password');
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error);
                window.location.reload();
            })

    }
    
    return (
        <>
            <div className='signinn'>
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-lg-4">&nbsp;</div>
                        <div className="col-lg-4">
                            <form onSubmit={handlesubmit}>
                                <div className="table-responsive">
                                    <div width="100%" className="table table-bordered signinnn">
                                        <div>
                                            <div className='text-center'>
                                                <h2 colspan="2">Sign-In Page</h2>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='mt-4 text-center'>
                                                <label>Username : </label>
                                                <div>
                                                    <input type="text" name="username" id="username" placeholder='Enter User Name' className="form-control" />
                                                </div>
                                            </div>
                                            <div className='text-center mt-4'>
                                                <label>Password :</label>
                                                <div>
                                                    <input type="password" name="password" id="password" placeholder='Enter Password' className="form-control"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='text-center mt-4'>
                                                    <Link to="/Signup">
                                                        <button type="button" name="data_send" id="data_send" value="send" className="btn btn-warning">Sign-up</button>
                                                    </Link>
                                                    {/* </div> */}
                                                    {/* <div className='text-center mt-4'> */}
                                                    <button type="submit" name="data_submit" id="data_submit" value="submit" className="btn btn-success ml-5">Sign-in</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-4">&nbsp;</div>
                    </div>
                </div>
            </div>
        </>
    );
}