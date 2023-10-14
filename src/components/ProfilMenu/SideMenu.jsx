import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../../utils/AuthContext'


const SideMenu = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
      // Panggil fungsi logout
      logout();
      window.location.href = '/login'
    };
    return (
        <div className='flex flex-col gap-4'>
            <div
                className="w-full rounded-full bg-gray-200 p-4 flex flex-row justify-between">
                {/* Informasi profil pengguna */}
                <div>
                    <Image
                        src="/lily-banse--YHSwy6uqvk-unsplash.jpg"
                        width={50}
                        height={50}
                        alt="Foto Profil"
                        className="rounded-full w-12 h-12 mb-2"/></div>
                <div className=''>
                    <h2 className="text-lg font-semibold">Nama Pengguna</h2>
                </div>
            </div>
                <button onClick={handleLogout}>Profil</button>
                <button onClick={handleLogout}>Edit Profil</button>
                <button onClick={handleLogout}>Logout</button>
        </div>

    )
}

export default SideMenu