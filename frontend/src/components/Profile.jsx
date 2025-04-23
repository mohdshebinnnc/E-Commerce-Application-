import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: ""
  });
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ✅ Fetch User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (userId) fetchUserProfile();
  }, [userId]);

  // ✅ Handle Address Input Change
  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // ✅ Handle Adding Address
  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/profile/add-address",
        { userId, ...newAddress },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Address added successfully!");
      setUser(response.data.user); // Update user state with new address
      setIsAddingAddress(false); // Hide form
      setNewAddress({ street: "", city: "", state: "", zip: "" }); // Clear form
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  return (
    <div>
      {user ? (
        <>
          {/* ✅ Profile Section */}
          <div>
            <img
              src={user.profileImage}
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>

          {/* ✅ Address Section */}
          <div>
            <h3>Addresses</h3>
            {user.addresses.length > 0 ? (
              user.addresses.map((address, index) => (
                <p key={index}>
                  {address.street}, {address.city}, {address.state} - {address.zip}
                </p>
              ))
            ) : (
              <p>No address found</p>
            )}

            {/* ✅ Add Address Button */}
            <button onClick={() => setIsAddingAddress(!isAddingAddress)}>
              {isAddingAddress ? "Cancel" : "Add Address"}
            </button>

            {/* ✅ Address Form */}
            {isAddingAddress && (
              <form onSubmit={handleAddAddress}>
                <input
                  type="text"
                  name="street"
                  placeholder="Street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={newAddress.zip}
                  onChange={handleAddressChange}
                  required
                />
                <button type="submit">Save Address</button>
              </form>
            )}
          </div>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
