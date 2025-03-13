export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
    const ngrokUrl = process.env.BACKEND_URL;
    
    try {
      const response = await fetch(`${ngrokUrl}/stream-logs`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
  
      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to log stream');
      }
  
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const readable = new ReadableStream({
        async start(controller) {
          const reader = response.body!.getReader();
          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const text = decoder.decode(value);
              controller.enqueue(encoder.encode(text));
            }
          } finally {
            reader.releaseLock();
            controller.close();
          }
        }
      });
  
      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
      
    } catch (error) {
      return new Response(
        `Error connecting to logs: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { status: 500 }
      );
    }
  }