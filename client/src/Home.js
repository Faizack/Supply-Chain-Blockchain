import React from 'react';
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();

    const redirectTo = (path) => {
        history.push(path);
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h3> Supply Chain Manager</h3>
                <div style={styles.buttonGroup}>
                    <button onClick={() => redirectTo('/roles')} style={styles.button}>Register Roles</button>
                    <button onClick={() => redirectTo('/addmed')} style={styles.button}>Order Materials</button>
                    <button onClick={() => redirectTo('/track')} style={styles.button}>Track Materials</button>
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
        background: 'linear-gradient(135deg, #F2E9E4, #C9ADA7)', // Softer, modern gradient
        padding: '20px',
    },
    content: {
        textAlign: 'center',
        backgroundColor: '#FFF', // Clean white background
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '30px',
    },
    button: {
        padding: '15px',
        fontSize: '18px',
        color: '#FFF',
        backgroundColor: '#8A817C', // Soft brown color
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    buttonHover: {
        backgroundColor: '#6B705C', // Darker on hover
    }
}

export default Home;
