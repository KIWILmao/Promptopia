import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & share
        <br />
        <span className="orange_gradient">AI-powered prompts</span>
      </h1>
      <p className="dssc text-center">
        Promptopia is an oprn source AI prompting tool for moder world to
        discover, create and share creative prompts
      </p>
      <Feed/>
    </section>
  )
}

export default Home