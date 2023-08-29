"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import Profile from "@components/Profile"


const MyProfile = () => {

    const [posts, setPosts] = useState([])
    const router = useRouter();
    const userName = useSearchParams().get('username');
    const email = useSearchParams().get("email");
    

    useEffect(() => {

		const fetchPrompts = async () => {
			const response = await fetch(`api/users/email/${email}/posts`);
			const data = await response.json();
			setPosts(data);
		}

		fetchPrompts();

	},[]);

    return (
        <Profile
            name={`${userName}´s`}
            desc={`Welcome to ${userName}´s profile page`}
            data={posts}
        />
    )
}

export default MyProfile