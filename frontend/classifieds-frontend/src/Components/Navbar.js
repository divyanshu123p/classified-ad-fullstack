import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [post, setPost] = useState(false);
    const darkmode = useSelector((state) => state.darkmode);
    // console.log("Current darkmode state:", darkmode);
    
    const dispatch = useDispatch();
    
    const toggle = () => {
        if(darkmode==="on") dispatch({type: 'off'});
        if(darkmode==="off") dispatch({type: 'on'});
        // console.log("clicked");
        // console.log("Current darkmode state:", darkmode);
    }

    return(
        <nav className={`navbar navbar-expand-lg ${darkmode==="off"?"navbar-light bg-light":"navbar-dark bg-dark"}`}>
            <a className="navbar-brand" href="#">MohallaList</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" onClick={()=>dispatch({type:'postoff'})}>Home</a>
                </li>
                <li className="nav-item">
                    <Link to='/aboutus' className="nav-link">About Us</Link>
                </li>
                <li className="nav-item">
                    <Link to='/contactus' className="nav-link">Contact Us</Link>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">

                <img src='./dark-mode.png' onClick = {()=>toggle()} style={{height:'30px', width: '30px', marginRight: '20px', filter: `invert(${darkmode=="on"? 1:0})`}}/>
                {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> */}
                <img src='./post.webp' onClick={()=>{dispatch({type:'poston'})}} style={{height:'45px', width:'70px'}}/>
                {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
                </form>
            </div>
        </nav>
    );
};

export default Navbar;