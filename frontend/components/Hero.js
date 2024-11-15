'use client';
import React, { useState } from 'react';
import axios from 'axios';

export default function Hero() {
    const [url, setUrl] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        // Trim the input URL and validate it
        const trimmedUrl = url.trim();

        const data = { content: trimmedUrl }; // Use the validated URL

        console.log('Sending POST request with data:', data);

        try {
            const response = await axios.post('http://localhost:8000/generate', data);
            console.log('Response:', response.data);
            setResponse(response.data);
            setError(''); // Clear any previous error
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to shorten the URL. Please try again.');
        }
    };
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url).then(() => {
            alert('Shortened URL copied to clipboard!');
        }).catch(err => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <section className="hero">
            <div className="container">
                <h1 className="middle">Shorten Your URL</h1>
                <div className="input">
                    <input
                        type="text"
                        placeholder="Enter your URL here..."
                        aria-label="URL input"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className='click' onClick={handleSubmit}>
                        <span>Shorten</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {response && (
                    <div className='out-container'>
                        <img 
                            className='qr-code' 
                            src={`data:image/png;base64,${response.qr_code}`} 
                            alt="QR Code" 
                        />
                        <div className="short-link">
                            <h2>Shortened URL:</h2>
                            <a 
                                href={response.short_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                {response.short_url}
                            </a>
                        </div>
                        <button 
                            className='copy-button' 
                            onClick={() => copyToClipboard(response.short_url)}
                        >
                            <span>Copy</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
