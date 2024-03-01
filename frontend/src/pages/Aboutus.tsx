import React from 'react';
import "../assets/css/Aboutus.css";
import {Link} from "react-router-dom";

const Aboutus: React.FC = () => {
    const isLoggedIn = !!localStorage.getItem("userId");
    return (
        <div className={"au-container"}>
            <div className={"au-header"}>

                <div className={"au-logo"}>
                    <a href="/dashboard">
                        <img
                            width={100}
                            src={"images/pngwing.com.png"}
                            alt="Logo"
                        />
                    </a>
                </div>
                <div className={"au-btn_before"}>
                    <button>Brands</button>
                    <button>Categories</button>
                    <Link to="/Contactus">
                        <button>Contact Us</button>
                    </Link>
                    <Link to="/Aboutus">
                        <button>About Us</button>
                    </Link>
                </div>

                <div className={"au-searchbar"}>
                    <input type={"text"} placeholder={"Search Product"}/>
                </div>
                <div className={"au-search_button"}>
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>

                <div className={"au-btn-wrapper"}>
                    <Link to={"/cart"}>
                        <button><i className="fa-solid fa-cart-shopping cart-icon"></i>Cart</button>
                    </Link>
                    <Link to={"/wishlist"}>
                        <button><i className="fa-regular fa-heart"></i>Wishlist</button>
                    </Link>
                    {isLoggedIn ? (
                        <>
                            <Link to="/myaccount">
                                <button>My Account</button>
                            </Link>
                            <Link to="/">
                                <button onClick={() => {
                                    localStorage.clear();
                                    window.location.href = "/login"
                                }}>Sign Out
                                </button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button>Sign In</button>
                            </Link>
                            <Link to="/register">
                                <button>Sign Up</button>
                            </Link>
                        </>
                    )}


                </div>


            </div>
            <div className={"au-body"}>
                <h1>Welcome to AnimeVerse!</h1>
                <p>Step into the world of anime with AnimeVerse, your ultimate destination for all things anime. Dive
                    into a universe of merchandise, keyrings, rings, custom items, and more, all inspired by your
                    favorite anime series.</p>
                <h2>Discover the AnimeVerse Experience</h2>
                <p>At AnimeVerse, we're passionate about providing you with an unforgettable shopping journey:</p>
                <h2>Product Selection:</h2>
                <p>Explore our extensive range of anime-themed products, carefully curated to bring your favorite
                    characters and series to life;</p>
                <h2>Customer Care:</h2>
                <p>Your satisfaction is our priority. Reach out to our dedicated team for assistance with any queries or
                    concerns;</p>
                <h2>Fast and Reliable Delivery:</h2>
                <p>Enjoy swift and secure delivery services nationwide, with options for order tracking and updates;</p>
                <h2>Convenient Shopping:</h2>
                <p>Shop at your convenience with our user-friendly website, accessible from any device, anytime;</p>
                <h2>Great Value:</h2>
                <p>Discover quality anime products at competitive prices, with regular discounts and promotions;</p>
                <h2>Easy Returns:</h2>
                <p>Shop with confidence thanks to our hassle-free return policy;</p>
                <h2>Secure Payments:</h2>
                <p>Rest assured with our secure payment gateway, offering multiple payment options;</p>
                <h2>Exclusive Discounts:</h2>
                <p>Benefit from our exclusive discounts and deals, making your anime shopping experience even more
                    rewarding;</p>
                <p>Immerse yourself in the world of anime with AnimeVerse. We're not just a store; we're a community
                    that celebrates the art and culture of anime. Join us on this exciting journey!</p>
            </div>


            <div className={"au-footer"}>
                <div className={"au-get-help"}>
                    <h1>GET HELP</h1>
                    <Link to="/Customercare">
                        <button>Customer Care</button>
                    </Link>
                    <Link to="/Payment">
                        <button>Payment Options</button>
                    </Link>
                    <Link to="/returnandrefundpolicy">
                        <button>Return and Refund Policy</button>
                    </Link>
                    <Link to="/PrivacyPolicy">
                        <button>Privacy Policy</button>
                    </Link>
                    <Link to="/Termsandcondition">
                        <button>Terms and Conditions</button>
                    </Link>
                    <span>@2023 Lugahub Pvt. Ltd. All Rights Reserved</span>

                </div>
                <div className={"au-about-us"}>
                    <h1>LUGAHUB</h1>
                    <Link to="/Aboutus">
                        <button>About Us</button>
                    </Link>
                    <Link to="/Contactus">
                        <button>Contact Us</button>
                    </Link>
                    <Link to="/Careers">
                        <button>Careers</button>
                    </Link>


                </div>
                <div className={"au-logos"}>
                    <span>Connect with us:</span>
                    <a href="https://www.facebook.com/profile.php?id=61555012223662&is_tour_dismissed=true"
                       target="_blank" rel="noopener noreferrer">
                        <img
                            width={43}
                            src={"images/fb.png"}
                            alt="Facebook"
                        />
                    </a>

                    <a href="https://www.instagram.com/luga.hub69/"
                       target="_blank" rel="noopener noreferrer">
                        <img
                            width={43}
                            src={"images/insta.png"}
                            alt="Facebook"
                        />
                    </a>
                    <a href="https://www.threads.net/@luga.hub69"
                       target="_blank" rel="noopener noreferrer">
                        <img
                            width={43}
                            src={"images/thread.png"}
                            alt="X"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
