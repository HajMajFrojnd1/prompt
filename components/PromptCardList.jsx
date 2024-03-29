"use client"

import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick,handleEdit, handleDelete}) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post)=> 
				<PromptCard
					key={post.id}
					post={post}
					handleTagClick={handleTagClick}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
				/>
			)}
		</div>
	);

}

export default PromptCardList;