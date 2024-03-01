import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../assets/css/AdminEditProfile.css";

interface UserDetails {
    firstName: string;
    lastName: string;
    email: string;
    // Add other properties if needed
}

const AdminEditProfile: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>({});
    const [editedDetails, setEditedDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('userId');

            if (userId) {
                const response = await axios.get<UserDetails>(`http://localhost:8020/user/getById/${userId}`);
                setUserDetails(response.data);

                // Set the initial values for editing
                setEditedDetails({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                });
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedDetails({
            ...editedDetails,
            [name]: value,
        });
    };

    const saveChanges = async () => {
        try {
            // Assuming there's an API endpoint to update user details
            const userId = localStorage.getItem('userId');
            if (userId) {
                await axios.put(`http://localhost:8020/user/update/${userId}`, editedDetails);
                // Optionally, you can refetch the updated details
                fetchUserDetails();
                console.log('Changes saved successfully!');
            }
        } catch (error) {
            console.error('Error saving changes:', error);
        }
    };

    return (
        <div className={"aeditp-container"}>
            <div className={"aeditp-buttons"}>
                <div className={"aeditp-top"}>
                    <a href="/admin/products">
                        <img src={"../images/Logo.png"}
                             width={100}
                             alt={"logo"}
                        />

                    </a>
                    <span>LuffyVerse</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={"aeditp-btn"}>
                    <div className="aeditp-ap-dropdown">
                        <button className="aeditp-ap-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
                        <div className="aeditp-ap-dropdown-content">
                            <a href="/admin/products">View Product</a>
                            <a href="/admin/addproduct">Add Product</a>

                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-list"></i>Categories</button>*/}
                    <div className="aeditp-cat-dropdown">
                        <button className="aeditp-cat-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
                        <div className="aeditp-cat-dropdown-content">
                            <a href="/admin/addcategory">Add Category</a>
                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-tag"></i>Brands</button>*/}
                    <div className="aeditp-brand-dropdown">
                        <button className="aeditp-brand-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
                        <div className="aeditp-brand-dropdown-content">
                            <a href="/admin/addbrand">Add Brand</a>
                        </div>
                    </div>

                    <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>

                    {/*<button className={"products"}><i className="fa-solid fa-user"></i>Profile</button>*/}
                    <div className="aeditp-pro-dropdown">
                        <button className="aeditp-pro-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
                        <div className="aeditp-pro-dropdown-content">
                            <a href="/admin/profile">View Profile</a>
                            <a href="/admin/editprofile">Edit Profile</a>
                            <a href="/admin/changepassword">Change Password</a>
                        </div>
                    </div>

                    <Link to={"/admin/login"}><button className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>

                </div>
            </div>
            <div className={"aeditp-display"}>
                <h2>Edit Profile</h2>
                <div className={"aeditp-info"}>
                    <div className={"aep-part1"}>
                        <label>First Name:</label>
                        <input type={"text"} name="firstName" value={editedDetails.firstName} onChange={handleInputChange} />
                    </div>
                    <div className={"aeditp-part1"}>
                        <label>Last Name:</label>
                        <input type={"text"} name="lastName" value={editedDetails.lastName} onChange={handleInputChange} />
                    </div>
                    <div className={"aeditp-part1"}>
                        <label>Email Address:</label>
                        <input type={"text"} name="email" value={editedDetails.email} onChange={handleInputChange} />
                    </div>
                </div>
                <div className={"aeditp-save-buttons"}>
                    <button onClick={saveChanges}>SAVE CHANGES</button>
                </div>
            </div>
        </div>
    );
};

export default AdminEditProfile;