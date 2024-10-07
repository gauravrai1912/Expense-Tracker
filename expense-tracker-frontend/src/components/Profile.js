import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Profile.css';

const Profile = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [userName, setUserName] = useState('');
  const profileRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://localhost:5000/api/users/details/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserName(response.data.name);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();

    const handleOutsideClick = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileOptions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSignOut = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const handleUpdatePassword = () => {
    navigate('/update-password');
  };

  // Determine submenu position dynamically
  const getSubmenuPosition = () => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const submenuWidth = 200; // Set your submenu width
      const leftOffset = rect.left + window.scrollX;

      // Check if the submenu will overflow on the left side
      if (leftOffset + submenuWidth > window.innerWidth) {
        return { left: 'auto', right: '0' }; // Align to the right if overflow
      }
    }
    return { left: '0' }; // Default alignment
  };

  const submenuStyle = getSubmenuPosition();

  return (
    <div ref={profileRef} className="relative">
      <button className="text-white hover:bg-gray-700 hover:text-white px-4 py-3 rounded-md text-sm font-medium" onClick={toggleProfileOptions}>
        <FontAwesomeIcon icon={faUser} />
      </button>
      {showProfileOptions && (
        <div 
          className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-300" 
          style={submenuStyle} 
        >
          <div className="px-4 py-2 text-teal-600 border-b">
            <p className="font-bold text-md">{userName}</p>
          </div>
          <button className="block w-full text-left px-4 py-2 text-teal-600 hover:bg-teal-100" onClick={handleUpdatePassword}>
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Update Password
          </button>
          <button className="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
