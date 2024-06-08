import PostButton from "@/components/post-button";
import { Button } from "@/components/ui/button";
import createPosts from "@/server/actions/create-posts";
import getPosts from "@/server/actions/get-posts";
import Image from "next/image";

export default async function Home() {
  const {error, success} =  await getPosts()
  if(error) {
    throw new Error(error)
  }
  if(success) {
  return (
    <main>
      {success.map((posts) => (
        <div key={posts.id}>
          <h2>{posts.title}</h2>
        </div>
      ))}
      <form action={createPosts}>
        <input className="border-gray-300 border-2 rounded-md px-2 py-1 m-2" type="text" name="title" placeholder="Title"/>
        <PostButton />
        <Button>Click Me Now!</Button>
      </form>
      
    </main>
  );
}
}
