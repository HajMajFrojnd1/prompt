"use client"

import PromptCardList from "./PromptCardList"
import { useRouter } from "next/navigation"

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  
  const router = useRouter();
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
          <span className="blue_gradient">
            {name} Profile
          </span>
        </h1>
        <p className="desc text-left">{desc}</p>
        <PromptCardList
          data={data}
          handleTagClick={(tag) => {
            router.push(`/?search=${tag}`);
          }}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
    </section>
  )
}

export default Profile