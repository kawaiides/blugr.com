import { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { BlogPost } from '@/types/blog';
import { format, parseISO } from 'date-fns';
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {post.summary.parsed_summary.title}
          </h1>
          <div className="text-lg text-gray-600 mb-6">
            {post.summary.parsed_summary.blog_desc}
          </div>
          <div className="text-sm text-gray-500">
            {post.created_at}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.summary.parsed_summary.body.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.h2}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {section.p}
              </p>
            </section>
          ))}
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Source: <a href={post.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Original Article
              </a>
            </div>
            <div className="text-sm text-gray-500">
              ID: {post.content_id}
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}