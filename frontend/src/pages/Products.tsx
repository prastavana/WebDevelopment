import {Link} from "react-router-dom";
import "../assets/css/Products.css";
import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useNavigate} from "react-router-dom";

function Products() {
    const navigate=useNavigate();
    const {data,refetch}=useQuery({
        queryKey:["GET_ITEM_ALL"],
        queryFn(){
            return axios.get("http://localhost:8020/item/getAll")
        }
    })
    console.log(data?.data)
    const deleteApi = useMutation({
        mutationKey: ["DELETE_ITEM"],
        mutationFn(id: number) {
            return axios.delete("http://localhost:8020/item/deleteById/"+id)
        },
        onSuccess() {
            refetch();
            setTimeout(() => {
                toast.success('Product deleted successfully!');
            }, 0);
        },
        onError(error) {
            toast.error(`Error deleting product: ${error.message}`);
        },
    });

    const handleDelete = (id: number) => {
        confirmAlert({
            title: (
                <div style={{ fontSize: '16px' }}>
                    Confirm Delete
                </div>
            ),
            message: (
                <div style={{ fontSize: '14px' }}>
                    Are you sure you want to delete this product?
                </div>
            ),
            buttons: [
                {
                    label: (
                        <div style={{ fontSize: '12px' }}>
                            Cancel
                        </div>
                    ),
                    onClick: () => {
                        // No action on cancel or you can add a cancel action if needed
                    }
                },
                {
                    label: (
                        <div style={{ fontSize: '12px' }}>
                            Confirm
                        </div>
                    ),
                    onClick: () => deleteApi.mutate(id)

                }
            ]
        });
    };


    return (
        <div className={"Prod-container"}>
            <div className={"Prod-buttons"}>
                <div className={"Prod-top"}>
                    <a href="/admin/products">
                    </a>

                    <span>LuffyVerse</span>
                    <i className="fa-solid fa-bars"></i>
                </div>
                <div className={"Prod-btn"}>
                    <div className="adminpro-dropdown">
                        <button className="adminpro-dropbtn"><i className="fa-solid fa-clipboard"></i>Products<i className="fa-solid fa-caret-down" style={{ marginLeft: '57px' }}></i></button>
                        <div className="adminpro-dropdown-content">
                            <a href="/admin/products">View Product</a>
                            <a href="/admin/addproduct">Add Product</a>

                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-list"></i>Categories</button>*/}
                    <div className="catadm-dropdown">
                        <button className="catadm-dropbtn"><i className="fa-solid fa-list"></i>Categories<i className="fa-solid fa-caret-down" style={{ marginLeft: '40px' }}></i></button>
                        <div className="catadm-dropdown-content">
                            <a href="/admin/addcategory">Add Category</a>
                        </div>
                    </div>
                    {/*<button className={"products"}><i className="fa-solid fa-tag"></i>Brands</button>*/}
                    <div className="brandadm-dropdown">
                        <button className="brandadm-dropbtn"><i className="fa-solid fa-tag"></i>Brands<i className="fa-solid fa-caret-down" style={{ marginLeft: '69px' }}></i></button>
                        <div className="brandadm-dropdown-content">
                            <a href="/admin/addbrand">Add Brand</a>
                        </div>
                    </div>

                                     {/*<button className={"products"}><i className="fa-<Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>solid fa-user"></i>Profile</button>*/}
                    <Link to={"/admin/totalorders"}><button className={"products"}><i className="fa-solid fa-cart-shopping"></i>Total Orders</button></Link>
                    <div className="admpro-dropdown">
                        <button className="admpro-dropbtn"><i className="fa-solid fa-user"></i>Profile<i className="fa-solid fa-caret-down" style={{ marginLeft: '70px' }}></i></button>
                        <div className="admpro-dropdown-content">
                            <a href="/admin/profile">View Profile</a>
                            <a href="/admin/editprofile">Edit Profile</a>
                            <a href="/admin/changepassword">Change Password</a>
                        </div>
                    </div>
                    <Link to={"/admin/login"}><button className={"products"}><i className="fa-solid fa-arrow-right"></i>Log Out</button></Link>
                </div>
            </div>
            <div className={"Prod-display"}>
                <h2>View Products</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.data.map((i) => (
                        <tr>
                            <td><p>{i?.itemName}</p></td>
                            <td>
                                <img src={"data:image/png;base64, " + i?.itemImage} alt={`Product ${i.itemId} Image`} width={100} className={"product-image"} />
                            </td>
                            <td className={"detailss"}><p>{i?.itemDescription}</p></td>
                            <td><p>Rs.{i?.itemPerPrice}</p></td>
                            <td><p>Stock:{i?.itemQuantity}</p></td>
                            <td><p>{i?.brand.brandName}</p></td>
                            <td><p>{i?.category.categoryName}</p></td>
                            <td>
                                <button onClick={()=>{navigate("/admin/addproduct/"+i?.id)}} >Update</button>
                                <button onClick={()=>handleDelete(i?.id)} className="delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            <ToastContainer autoClose={4000}/>



        </div>

    )
}
export default Products;
