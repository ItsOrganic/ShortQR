import React  from "react";
export default function Navbar() {
    return (
    <header className="header">
        <div className="header--image">
            <img className="logo" src="https://www.kindpng.com/picc/m/23-230826_url-shortener-logo-hd-png-download.png" alt="Logo" height={40} />
        </div>
        <h1 className="header--title">URL Shortener</h1>
    </header>
    )
}