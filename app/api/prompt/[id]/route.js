import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"
// GET

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const prompt = await Prompt.findById(params.id).populate("creator")
    if (!prompt) return new Response("prompt not found", { status: 404 })
    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response("failed to fetch the prompts", { status: 500 })
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json()
  try {
    await connectToDB()
    const existingPromt = await Prompt.findById(params.id)
    if (!existingPromt) return new Response("prompt not found", { status: 404 })
    existingPromt.prompt = prompt
    existingPromt.tag = tag

    await existingPromt.save()
    return new Response(JSON.stringify(existingPromt), { status: 200 })
  } catch (error) {
    return new Response("failed to update the prompts", { status: 500 })
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()
    await Prompt.findByIdAndRemove(params.id)
    return new Response("prompt deleted sucessfullt", { status: 200 })
  } catch (error) {
    return new Response("failed to delete the prompts", { status: 500 })
  }
}
