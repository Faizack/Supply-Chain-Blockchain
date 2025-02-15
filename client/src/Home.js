import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './Home.css'

function Home() {
    const history = useHistory();
    const [clicked, setClicked] = useState(false);

    const redirectTo = (path) => {
        setClicked(true);  // Activate the burst animation
        setTimeout(() => {
            setClicked(false); // Reset animation after click
            history.push(path);
        }, 500); // Delay to allow animation to play
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h3> Supply Chain Manager</h3>
                <div style={styles.buttonGroup}>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        onClick={() => redirectTo('/roles')}
                    >
                        Register Roles
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        onClick={() => redirectTo('/addmed')}
                    >
                        Order Materials
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        onClick={() => redirectTo('/track')}
                    >
                        Track Materials
                    </button>
                    <button 
                        className={`fancyButton ${clicked ? 'burst' : ''}`} 
                        onClick={() => redirectTo('/supply')}
                    >
                        Supply Materials
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("https://example.com/battery_background.jpg")', // Add your battery image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
    },
    content: {
        textAlign: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent white
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '30px',
    }
}

export default Home;
