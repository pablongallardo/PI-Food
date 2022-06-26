import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';

export default function LandingPage(){
    return (
        <div className="landing">
            <h1 className='welcomeMsg'>Looking for a recipe? this is the place</h1>
            <Link to='/home' id='click'>
                <button className='homeButton'>Let's Go!</button>
            </Link>

        </div>
    )
} 