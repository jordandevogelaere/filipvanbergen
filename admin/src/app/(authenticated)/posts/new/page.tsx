import PostForm from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-navy-900 mb-8">
        New Post
      </h1>
      <PostForm />
    </div>
  );
}
