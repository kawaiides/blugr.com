import { MongoClient, ChangeStream, ChangeStreamDocument } from 'mongodb';
import { BlogPost } from '@/types/blog';
import { revalidatePath } from 'next/cache';

let client: MongoClient;
let changeStream: ChangeStream;

async function triggerRevalidation(content_id: string) {
  try {
    // Revalidate both the specific post page and the blog index
    await revalidatePath(`/blog/${content_id}`);
    await revalidatePath('/blog');
  } catch (error) {
    console.error(`Error revalidating content_id ${content_id}:`, error);
  }
}

export async function connectToDatabase() {
  if (client) return client;
  
  try {
    client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    
    const collection = client.db("blugr").collection<BlogPost>("generated-texts");
    changeStream = collection.watch<BlogPost>([], { fullDocument: 'updateLookup' });
    
    changeStream.on('change', async (change: ChangeStreamDocument<BlogPost>) => {
      if (change.operationType === 'insert' || change.operationType === 'update') {
        const post = change.fullDocument;
        if (post?.content_id) {
          await triggerRevalidation(post.content_id);
        }
      }
    });
    
    changeStream.on('error', (error) => {
      console.error('Change stream error:', error);
      // Implement reconnection logic if needed
    });
    
    return client;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}