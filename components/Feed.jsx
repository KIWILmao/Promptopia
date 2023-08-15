"use client"

import { useState, useEffect } from "react"
import PromptCard from "@components/PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="m-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i") // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("/api/prompt")
      const data = await res.json()
      setPosts(data)
    }
    fetchdata()
  }, [])

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    console.log("dasdas")
    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="realtive w-full flex-center">
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          className="search_input peer"
          placeholder="search for a tag or a placeholder"
          required
        />
      </form>
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
