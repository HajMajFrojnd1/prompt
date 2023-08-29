"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"


const MyProfile = () => {

    const [posts, setPosts] = useState([])
    const {data: session} = useSession(); 
    const router = useRouter();

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }
    
    const handleDelete = async (post) => {

        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if (hasConfirmed) {

            const response = await fetch(`/api/prompt/${post._id}`,{
                method: "DELETE",
                body: JSON.stringify({
                    promptId: post._id
                })
            })
    
            const filteredPrompts = posts.filter(p => p._id !== post._id);

            setPosts(filteredPrompts);
        
        }
        
    }

    useEffect(() => {

		const fetchPrompts = async () => {
			const response = await fetch(`api/users/${session?.user.id}/posts`);
			const data = await response.json();
			setPosts(data);
		}

		if(session?.user.id) fetchPrompts();

	},[]);

    return (
        <Profile
            name="My"
            desc="Welcome to your profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile