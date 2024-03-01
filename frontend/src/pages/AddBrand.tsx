import {Link, useNavigate, useParams} from "react-router-dom";
import "../assets/css/AddCategory.css";
import {useForm} from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useMutation,useQuery} from "@tanstack/react-query";

function AddCategory() {
    const { id_p } = useParams();
    console.log(id_p)
    const { data: dataById } = useQuery({
        queryKey: ['GETBYID'],
        queryFn() {
            return axios.get(`http://localhost:8020/brand/getById/${id_p}`);
        },
        enabled: !!id_p,
    });

    const navigate = useNavigate();
    const apiCall = useMutation({
        mutationKey: ["POST_ITEM"],
        mutationFn: (payload) => {
            console.log(payload);
            return axios.post("http://localhost:8020/brand/save", payload);
        },
        onSuccess: () => {
            toast.success("Brand added successfully!", { autoClose: 4000 });
            resetForm();
        },
        onError: (error) => {
            setTimeout(() => {
                toast.error('Please fill all the fields!');
            }, 0); // Set the timeout to 4000 milliseconds (4 seconds)
        },
    });

    const { register, handleSubmit, reset: resetForm } = useForm({
        values: id_p ? dataById?.data : {},
    });

    const onSubmit = (values) => {
        apiCall.mutate(values);
    };

    return (
        <div className={"addbrd-container"}>
            <div className={"addbrd-buttons"}>
                <div className={"addbrd-top"}>

                    <img src={"images/pngwing.com.png"}
                         width={100}
                         alt={"logo"}
                    />
                    <span>LuffyVerse</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={"addbrd-btn"}>
                    <div className="addbrd-pro-dropdown">
                        <button className="addbrd-pro-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
                        <div className="addbrd-pro-dropdown-content">
                            <a href="/admin/products">View Product</a>
                            <a href="/admin/addproduct">Add Product</a>

                        </div>
                    </div>
                    <div className="addbrd-cat-dropdown">
                        <button className="addbrd-cat-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
                        <div className="addbrd-cat-dropdown-content">
                            <a href="/admin/addcategory">Add Category</a>
                        </div>
                    </div>
                    <div className="addbrd-brand-dropdown">
                        <button className="addbrd-brand-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
                        <div className="addbrd-brand-dropdown-content">
                            <a href="/admin/addbrand">Add Brand</a>
                        </div>
                    </div>

                    <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>

                    <div className="addbrd-profile-dropdown">
                        <button className="addbrd-profile-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
                        <div className="addbrd-profile-dropdown-content">
                            <a href="/admin/profile">View Profile</a>
                            <a href="/admin/editprofile">Edit Profile</a>
                            <a href="/admin/changepassword">Change Password</a>
                        </div>
                    </div>

                    <Link to={"/admin/login"}><button className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className={"addbrd-display"}>
                <h2>Add Brand</h2>
                <input type={"text"} placeholder={"Enter Brand Name"}  {...register("brandName")} />
                <input className={"addbrd-desc"} type={"text"} placeholder={"Enter Brand Description"}  {...register("brandDescription")}/>
                <button type={"submit"}>Add Brand</button>
            </div>
            </form>
            <ToastContainer/>
        </div>
    )
}

export default AddCategory;