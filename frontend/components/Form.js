import React from "react";

export default function Form() {
    return (
        <main className="form">
            <div className="form-container">
                <input type="url" placeholder="Enter the text" className="form-input"></input>
                <button type="submit" className="form-button">Short</button>
            </div>
        </main> 
    )
}