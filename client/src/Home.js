import React from 'react'
import { useHistory } from "react-router-dom"

function Home() {
    const history = useHistory()
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_addmed = () => {
        history.push('/addmed')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h3>Pharmaceutical Supply Chain Flow :- </h3>
                <br />
                <h6>(Note: Here <u>Owner</u> is the person who deployed the smart contract on the blockchain)</h6>
                <h5>Step 1: Owner Should Register Raw material suppliers, Manufacturers, Distributors, and Retailers</h5>
                <h6>(Note: This is a one-time step. Skip to step 2 if already done)</h6>
                <button onClick={redirect_to_roles} className="btn btn-outline-primary btn-sm" style={styles.button}>Register</button>
                <br />
                <h5>Step 2: Owner should order medicines</h5>
                <button onClick={redirect_to_addmed} className="btn btn-outline-primary btn-sm" style={styles.button}>Order Medicines</button>
                <br />
                <h5>Step 3: Control Supply Chain</h5>
                <button onClick={redirect_to_supply} className="btn btn-outline-primary btn-sm" style={styles.button}>Control Supply Chain</button>
                <br />
                <hr style={styles.hr} />
                <br />
                <h5><b>Track</b> the medicines:</h5>
                <button onClick={redirect_to_track} className="btn btn-outline-primary btn-sm" style={styles.button}>Track Medicines</button>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)', // Background gradient
        padding: '20px'
    },
    content: {
        textAlign: 'center',
        backgroundColor: '#ffffffcc', // Slightly transparent white background
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '700px',
        width: '100%',
    },
    button: {
        margin: '10px 0',
        padding: '10px 20px',
        fontSize: '14px',
    },
    hr: {
        borderTop: '1px solid #bbbbbb',
        margin: '20px 0',
    }
}

export default Home
