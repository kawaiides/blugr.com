import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types/blog';

export const revalidate = 3600; // Revalidate every hour as a fallback

async function getBlogPost(content_id: string): Promise<BlogPost> {
  const client = await connectToDatabase();
  const collection = client.db("blugr").collection<BlogPost>("generated-texts");
  const post = await collection.findOne({ content_id });
  
  if (!post) {
    throw new Error('Post not found');
  }
  
  return post;
}

export default async function BlogPostPage({ params }: { params: { content_id: string } }) {
  const post = await getBlogPost(params.content_id);
  
  return (
    <article>
      <h1>{post.summary.parsed_summary.title}</h1>
      <div>{post.summary.parsed_summary.blog_desc}</div>
      {post.summary.parsed_summary.body.map((section, index) => (
        <section key={index}>
          <h2>{section.h2}</h2>
          <p>{section.p}</p>
        </section>
      ))}
    </article>
  );
}