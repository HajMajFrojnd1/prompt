"use client";

import { useState, useEffect } from "react";
import PromptCardList from "./PromptCardList";
import { useSearchParams } from "next/navigation";

const Feed = () => {


	const searchParam = useSearchParams().get("search") || "";
	console.log(searchParam);
	const [searchText, setSearchText] = useState(searchParam);
	const [posts, setPosts] = useState([])

	const handleSearchChange = (e) => {
		e.preventDefault();
		setSearchText(e.target.value);
	}


	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`api/prompt/search?searchParam=${searchText}`);
			const data = await response.json();
			setPosts(data);
		}

		fetchPrompts();
	
	}, [searchText]);


	return (
		<section className="feed">
		<form className="relative w-full flex-center">
			<input 
				className="search_input"
				type="text"
				placeholder="Search for a tag or username"
				value={searchText}
				onChange={handleSearchChange}
				required
			/>
		</form>
		<PromptCardList 
			data={posts}
			handleTagClick={(tag) => {
				setSearchText(tag);
			}}
		/>
		</section>
	)
}

export default Feed