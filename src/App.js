import React, { useEffect, useState } from 'react';

function App() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch news articles from your backend API
        fetch('https://ai-news-backend-34xl.onrender.com/api/news')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h1>Daily AI News</h1>
            <ul>
                {articles.map((article, index) => (
                    <li key={index} style={{ marginBottom: '20px' }}>
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                            <h2>{article.title}</h2>
                        </a>
                        <p>{article.summary}</p>
                        <small>{article.published}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;