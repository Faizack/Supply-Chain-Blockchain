import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import './Supply.css'; // Import custom CSS file

function Supply() {
    const history = useHistory();
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, []);

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [MED, setMED] = useState({});
    const [MedStage, setMedStage] = useState([]);
    const [ID, setID] = useState("");

    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            const medCtr = await supplychain.methods.medicineCtr().call();
            const med = {};
            const medStage = [];
            for (let i = 0; i < medCtr; i++) {
                med[i] = await supplychain.methods.MedicineStock(i + 1).call();
                medStage[i] = await supplychain.methods.showStage(i + 1).call();
            }
            setMED(med);
            setMedStage(medStage);
            setloader(false);
        } else {
            window.alert('The smart contract is not deployed to the current network');
        }
    };

    const redirect_to_home = () => {
        history.push('/');
    };

    const handlerChangeID = (event) => {
        setID(event.target.value);
    };

    const handlerSubmitRMSsupply = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods.RMSsupply(ID).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitManufacturing = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods.Manufacturing(ID).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitDistribute = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods.Distribute(ID).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitRetail = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods.Retail(ID).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            const receipt = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (receipt) {
                loadBlockchaindata();
            }
        } catch (err) {
            alert("An error occurred!!!");
        }
    };

    if (loader) {
        return (
            <div className="loader-container">
                <h1 className="wait">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="supply-container">
            <div className="header-container">
                <span><b>Current Account Address:</b> {currentaccount}</span>
                <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm home-button">HOME</span>
            </div>
            <h6><b>Supply Chain Flow:</b></h6>
            <p>Medicine Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
            <table className="table table-sm table-dark">
                <thead>
                    <tr>
                        <th scope="col">Medicine ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Current Processing Stage</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MED).map(key => (
                        <tr key={key}>
                            <td>{MED[key].id}</td>
                            <td>{MED[key].name}</td>
                            <td>{MED[key].description}</td>
                            <td>{MedStage[key]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="supply-step">
                <h5><b>Step 1: Supply Raw Materials</b> (Only a registered Raw Material Supplier can perform this step):</h5>
                <form onSubmit={handlerSubmitRMSsupply}>
                    <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm">Supply</button>
                </form>
            </div>
            <hr />
            <div className="supply-step">
                <h5><b>Step 2: Manufacture</b> (Only a registered Manufacturer can perform this step):</h5>
                <form onSubmit={handlerSubmitManufacturing}>
                    <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm">Manufacture</button>
                </form>
            </div>
            <hr />
            <div className="supply-step">
                <h5><b>Step 3: Distribute</b> (Only a registered Distributor can perform this step):</h5>
                <form onSubmit={handlerSubmitDistribute}>
                    <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm">Distribute</button>
                </form>
            </div>
            <hr />
            <div className="supply-step">
                <h5><b>Step 4: Retail</b> (Only a registered Retailer can perform this step):</h5>
                <form onSubmit={handlerSubmitRetail}>
                    <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm">Retail</button>
                </form>
            </div>
            <hr />
            <div className="supply-step">
                <h5><b>Step 5: Mark as Sold</b> (Only a registered Retailer can perform this step):</h5>
                <form onSubmit={handlerSubmitSold}>
                    <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Enter Medicine ID" required />
                    <button className="btn btn-outline-success btn-sm">Sold</button>
                </form>
            </div>
            <hr />
        </div>
    );
}

export default Supply;
