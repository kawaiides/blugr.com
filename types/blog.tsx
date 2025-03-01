export interface BlogPost {
  _id: string;
  content_id: string;
  created_at: string;
  status: string;
  summary: {
    raw_response: string;
    parsed_summary: {
      title: string;
      blog_desc: string;
      body: Array<BlogSection>;
    }
  };
  transcript: {
    full_text: string;
    segments: Array<any>;
  };
  url: string;
}

export interface BlogSection {
  h2: string;
  p: string;
}