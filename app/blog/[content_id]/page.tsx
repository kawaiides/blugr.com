import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { content_id: string } }): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.content_id);
    
    return {
      title: post.summary.parsed_summary.title,
      description: post.summary.parsed_summary.blog_desc,
      openGraph: {
        title: post.summary.parsed_summary.title,
        description: post.summary.parsed_summary.blog_desc,
        type: 'article',
        publishedTime: post.created_at,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

async function getBlogPost(content_id: string): Promise<BlogPost> {
  try {
    const client = await connectToDatabase();
    const collection = client.db("blugr").collection<BlogPost>("generated-texts");
    const post = await collection.findOne({ content_id });
    
    if (!post) {
      notFound();
    }
    
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }
}

export default async function BlogPostPage({ params }: { params: { content_id: string } }) {
  const post = await getBlogPost(params.content_id);
  const formattedDate = format(new Date(post.created_at), 'MMMM d, yyyy');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* ... existing JSX code ... */}
      </article>
    </div>
  );
}