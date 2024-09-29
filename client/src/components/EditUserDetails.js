import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar'
import { PiUserCircle } from "react-icons/pi"
import Divider from './Divider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const EditUserDetails = ({ onClose, user }) => {
    const [data, setData] = useState({
        name: user?.name,
        profile_pic: user?.profile_pic // URL will be stored here
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                ...user
            }
        })
    }, [user])

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update/user`
            console.log(data)
            const response = await axios.post(URL, { name: data.name, profile_pic: data.profile_pic }, { withCredentials: true });
            if (response.data.success) {
                dispatch(setUser(response.data.data)); // Update Redux state
                setData({
                    name: response.data.data.name,
                    profile_pic: response.data.data.profile_pic
                }); // Update local state
                toast.success("User details updated successfully!");
                onClose(); // Close the modal after successful update
            } else {
                toast.error("Failed to update user details.");
            }

        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message || "An error occurred.");
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
            <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
                <h2 className='font-semibold'>Profile Details</h2>
                <p className='text-sm '>Edit user details</p>

                <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='name'>Name:</label>
                        <input
                            type='text'
                            name='name'
                            id='name'
                            value={data.name}
                            onChange={handleOnChange}
                            className='w-full py-1 px-2 focus:outline-primary border-0.5'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor='profile_pic'>Profile Picture URL:</label>
                        <input
                            type='text'
                            name='profile_pic'
                            id='profile_pic'
                            value={data.profile_pic}
                            onChange={handleOnChange}
                            className='w-full py-1 px-2 focus:outline-primary border-0.5'
                        />
                    </div>

                    <Divider />
                    <div className='flex gap-2 w-fit ml-auto '>
                        <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                        <button type='submit' className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(EditUserDetails)

