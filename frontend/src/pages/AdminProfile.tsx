import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/AdminProfile.css";

interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    // Add other properties if needed
}

function AdminProfile() {
    const [userDetails, setUserDetails] = useState<UserDetails>({});

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (userId) {
                const response = await axios.get<UserDetails>(`http://localhost:8020/user/getById/${userId}`);
                setUserDetails(response.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };


    return (
        <div className={"Admprofile-container"}>
            <div className={"Admprofile-buttons"}>
                <div className={"Admprofile-top"}>
                    <a href="/admin/products">
                        <img src={"../images/Logo.png"}
                             width={100}
                             alt={"logo"}
                        />

                    </a>
                    <span>LuffyVerse</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={"Admprofile-btn"}>
                    <div className="Admprofile-ap-dropdown">
                        <button className="Admprofile-ap-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
                        <div className="Admprofile-ap-dropdown-content">
                            <a href="/admin/products">View Product</a>
                            <a href="/admin/addproduct">Add Product</a>

                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-list"></i>Categories</button>*/}
                    <div className="Admprofile-cat-dropdown">
                        <button className="Admprofile-cat-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
                        <div className="Admprofile-cat-dropdown-content">

                            <a href="/admin/addcategory">Add Category</a>
                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-tag"></i>Brands</button>*/}
                    <div className="Admprofile-brand-dropdown">
                        <button className="Admprofile-brand-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
                        <div className="Admprofile-brand-dropdown-content">

                            <a href="/admin/addbrand">Add Brand</a>
                        </div>
                    </div>

                    <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>

                    {/*<button className={"products"}><i className="fa-solid fa-user"></i>Profile</button>*/}
                    <div className="Admprofile-pro-dropdown">
                        <button className="Admprofile-pro-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
                        <div className="Admprofile-pro-dropdown-content">
                            <a href="/admin/profile">View Profile</a>
                            <a href="/admin/editprofile">Edit Profile</a>
                            <a href="/admin/changepassword">Change Password</a>
                        </div>
                    </div>

                    <Link to={"/admin/login"}><button className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>
                </div>
            </div>
            <div className={"Admprofile-display"}>
                <h2>My Profile</h2>
                <div className={"Admprofile-display"}>
                    <h2>My Profile</h2>
                    <label>First name:</label>
                    <input type="text" value={userDetails.firstName} readOnly />
                    <label>Last Name:</label>
                    <input type="text" value={userDetails.lastName} readOnly />
                    <label>Email Address:</label>
                    <input type="text" value={userDetails.email} readOnly />
                </div>
            </div>
        </div>
    );
}

export default AdminProfile;