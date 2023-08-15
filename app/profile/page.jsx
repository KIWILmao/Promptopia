"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

const MyProfile = () => {
  const { data: session } = new useSession()
  const router = new useRouter()
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()
      setPosts(data)
      console.log(posts)
    }
    if (session?.user.id) fetchdata()
    else {
      router.push("/")
    }
  }, [])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("are you sure you want to delete this prompt")
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        })

        const filteredPosts = posts.filter((p) => p._id != post._id)
        setPosts(filteredPosts)
      } catch (error) {}
    }
  }

  return (
    <Profile
      name="my"
      desc="welcome to your personal profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
