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
        <main className="hero">
            <div className="container">
                <h1 className="middle">ShortQR</h1>
                <div className="input">
                    <input
                        type="url"
                        placeholder="Enter URL to shorten"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button className='click' onClick={handleSubmit}>Shorten</button>
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error if any */}
                {response && (
                    <div className='out-container'>
                        <div>
                        <img className='qr-code' src={`data:image/png;base64,${response.qr_code}`} alt="QR Code" /> {/* Display QR Code if available */}
                        <h2 className='short-link'>Shortened URL: <a href={response.short_url} target="_blank" rel="noopener noreferrer">{response.short_url}</a></h2>
                        <button className='copy-button' onClick={() => copyToClipboard(response.short_url)}>Copy</button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
