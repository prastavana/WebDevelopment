import { useState } from "react";
import { useForm } from "react-hook-form";
import "../assets/css/AddProduct.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const generateToken = () => {
        // Your logic to generate the token
        const newToken = 'generated_token_here';
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const { data: brandData } = useQuery({
        queryKey: ["GET_BRAND_ALL"],
        queryFn() {
            return axios.get("http://localhost:8020/brand/getAll")
        }
    });
    console.log(brandData?.data);

    const { data } = useQuery({
        queryKey: ["GET_CATEGORY_ALL"],
        queryFn() {
            return axios.get("http://localhost:8020/category/getAll")
        }
    });
    console.log(data?.data);

    const { id_p } = useParams();
    console.log(id_p);

    const { data: dataById } = useQuery({
        queryKey: ['GETBYID'],
        queryFn() {
            return axios.get(`http://localhost:8020/item/getById/${id_p}`);
        },
        enabled: !!id_p,
    });

    const navigate = useNavigate();
    const apiCall = useMutation({
        mutationKey: ["POST_ITEM"],
        mutationFn: async (formData) => {
            try {
                const response = await axios.post('http://localhost:8020/item/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`, // Include the token in the request headers
                    },
                });
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const { register, handleSubmit } = useForm({
        values: id_p ? dataById?.data : {},
    });

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append('itemName', data.itemName);
        formData.append('itemDescription', data.itemDescription);
        formData.append('itemQuantity', data.itemQuantity);
        formData.append('itemPerPrice', data.itemPerPrice);
        formData.append('itemImage', data.itemImage[0]); // Assuming itemImage is a file input
        formData.append('brandName', data.brandName);
        formData.append('categoryName', data.categoryName);
        if (Object.values(data).some((value) => !value)) {
            toast.error('Please fill all the fields!');
        } else if (!data.brandName) {
            toast.error('Please select a brand!');
        } else if (!data.categoryName) {
            toast.error('Please select a category!');
        } else {
            apiCall.mutate(formData);
            toast.success('Product added successfully!');
            e.target.reset();
        }
    };
    return (
        <div className={"admin-pro-container"}>
            <div className={"admin-pro-buttons"}>
                <div className={"admin-pro-top"}>
                    <a href="/admin/products">
                        <img src={"public/images/luffy.jpeg"}
                             width={100}
                             alt={"logo"}
                        />

                    </a>
                    <span>LuffyVerse</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={"admin-pr-button"}>
                    {/*<button className={"product"}><i className="fa-solid fa-clipboard"></i>Products</button>*/}
                    <div className="admin-pro-dropdown">
                        <button className="admin-pro-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
                        <div className="admin-pro-dropdown-content">
                            <a href="/admin/products">View Product</a>
                            <a href="/admin/addproduct">Add Product</a>

                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-list"></i>Categories</button>*/}
                    <div className="admin-cat-dropdown">
                        <button className="admin-cat-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
                        <div className="admin-cat-dropdown-content">
                            <a href="/admin/addcategory">Add Category</a>
                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-tag"></i>Brands</button>*/}
                    <div className="admin-brand-dropdown">
                        <button className="admin-brand-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
                        <div className="admin-brand-dropdown-content">
                            <a href="/admin/addbrand">Add Brand</a>
                        </div>
                    </div>

                    <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>
                    <div className="admin-profile-dropdown">
                        <button className="admin-profile-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
                        <div className="admin-profile-dropdown-content">
                            <a href="/admin/profile">View Profile</a>
                            <a href="/admin/editprofile">Edit Profile</a>
                            <a href="/admin/changepassword">Change Password</a>
                        </div>
                    </div>

                    <Link to={"/admin/login"}><button className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>
                </div>
            </div>
            <div className={"admin-display"}>
                <div className={"admin-headers"}>
                    <h2>Add Product</h2>

                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={"admin-details"}>
                        <div className={"admin-firstrow"}>
                            <input type={"text"} placeholder={"Enter Product Name"} {...register("itemName")} />
                            <input className={"product-description-input"} type={"text"}
                                   placeholder={"Enter Product Description"}  {...register("itemDescription")} />
                            <input type={"number"} placeholder={"Enter Product Price"} {...register("itemPerPrice")} />
                            <input type={"number"}
                                   placeholder={"Enter Product Quantity"} {...register("itemQuantity")} />
                            <select {...register("brandName")} defaultValue="">
                                <option value="" disabled>Select Brand</option>
                                {brandData?.data.map((brand) => (
                                    <option key={brand?.brandId} value={brand?.brandName}>{brand?.brandName}</option>
                                ))}
                            </select>

                        </div>
                        <div className={"admin-secondrow"}>
                            <select {...register("categoryName")} defaultValue="">
                                <option value="" disabled>Select Category</option>
                                {data?.data.map((i) => (
                                    <option key={i?.categoryId} value={i?.categoryName}>{i?.categoryName}</option>
                                ))}
                            </select>


                            <div>
                                <span>Select Product Image</span>
                                <input type="file" {...register("itemImage")} />
                            </div>
                        </div>
                    </div>
                    <div className={"admin-btn"}>
                        <button type={"submit"}>Add Product</button>
                    </div>
                </form>
                <ToastContainer autoClose={4000}/>


            </div>
        </div>

    )
}

export default AddProduct;

