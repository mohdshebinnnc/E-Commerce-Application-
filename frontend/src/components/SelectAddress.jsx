import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/profile/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAddresses(response.data.addresses);
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        if (userId && token) fetchAddresses();
    }, [userId, token]);

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleConfirmAddress = () => {
        if (selectedAddress) {
            localStorage.setItem("selectedAddress", JSON.stringify(selectedAddress));
            navigate("/checkout"); // Redirect to checkout page
        } else {
            alert("Please select an address!");
        }
    };

    return (
        <div>
            <h2>Select Delivery Address</h2>
            {addresses.length > 0 ? (
                addresses.map((address, index) => (
                    <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "5px" }}>
                        <input
                            type="radio"
                            name="selectedAddress"
                            value={index}
                            checked={selectedAddress === address}
                            onChange={() => handleSelectAddress(address)}
                        />
                        <label>{address.street}, {address.city}, {address.state} - {address.zip}</label>
                    </div>
                ))
            ) : (
                <p>No addresses found.</p>
            )}

            {/* Show button only if an address is selected */}
            {selectedAddress && (
                <button onClick={handleConfirmAddress} style={{ marginTop: "10px" }}>Confirm Address</button>
            )}
        </div>
    );
};

export default SelectAddress;
