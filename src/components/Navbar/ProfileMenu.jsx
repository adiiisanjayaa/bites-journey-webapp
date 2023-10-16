
import Link from 'next/link';
import React, {useState, useEffect} from 'react';
import jwtDecode from 'jwt-decode'; // Anda dapat menggunakan library jwt-decode
import {useAuth} from '../../../utils/AuthContext';
import axios from 'axios';


const ProfileMenu = () => {
    const {logout} = useAuth();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = () => {
        // Panggil fungsi logout
        logout();
        window.location.href = '/login'
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const user = decodedToken.uid_users;

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:9000/api/v1/user/adi1',
            headers: {
                'Authorization': `${token}`,
                'x-api-key': 'binar-36',
            },
        };

        axios
            .request(config)
            .then((response) => {
                setArticles(response.data.data);
                console.log(response.data.data);

                // Mengambil header 'token' dari respons
                const newAccessToken = response.headers['token'];
                console.log(newAccessToken);

                // Lakukan apa yang Anda perlu lakukan dengan token baru
                // Jika diperlukan, gantilah token di localStorage
                // localStorage.setItem('token', newAccessToken);

                return response.json();
            })
            .then((data) => {
                setUserData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    
    return (
        <div className="navbar relative">
            <div className="navbar-profile-toggle" onClick={toggleProfileDropdown}>
                <img
                    src="/lily-banse--YHSwy6uqvk-unsplash.jpg"
                    alt="Profil"
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full cursor-pointer"/>
            </div>
            {
                isProfileDropdownOpen && (
                    <div
                        className="profile-dropdown flex flex-col items-center absolute mt-2 bg-white border border-gray-300 shadow-md p-4 rounded-lg z-10 right-0">
                        {/* Konten dropdown profil Anda di sini */}
                        {
                            userData && (
                                <div className='flex flex-col'>
                                    <p className="text-gray-800">{userData.data.email}</p>
                                </div>
                            )
                        }
                        <Link href="/Profile">Profil Saya</Link>
                        <Link href="/create-article" className='block sm:hidden'>Create Article</Link>
                        <button onClick={handleLogout}>Logout</button>
                        {/* Tempatkan elemen lainnya sesuai kebutuhan */}
                    </div>
                )
            }
        </div>
    );
}

export default ProfileMenu;
