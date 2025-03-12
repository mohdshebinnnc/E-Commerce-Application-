import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [profile, setProfile] = useState({ name: "", email: "", address: "" });

    useEffect(() => {
        fetch("http://localhost:8080/user/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then(res => res.json())
        .then(data => {
            console.log("Profile Data:", data);
            setProfile(data);
        })
        .catch(err => console.error("Error fetching profile:", err));
    }, []); // ✅ Runs once when component mounts

    return (
        <section>
            <img src='' alt='Profile' />
            <h2>Name: {profile.name}</h2>
            <h3>Email: {profile.email}</h3>
            <h3>Address: {profile.address}</h3>
        </section>
    );
};

export default Profile;
