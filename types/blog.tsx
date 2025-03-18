export interface BlogPost {
  _id: string;
  content_id: string;
  metadata: Metadata;
  status: string;
  version: string;
  has_search_results: boolean;
  created_at: string;
  search_results: {
    results: Array<SearchResult>;
    metadata: {
      total_subheadings: number;
      total_matches: number;
      processed_at: string;
    };
    subheadings: Array<string>;
    statistics: {
      average_matches_per_subheading: number;
      subheadings_with_matches: number;
      coverage_percentage: number;
    };
  };

  summary: {
    raw_response: string;
    parsed_summary: {
      title: string;
      blog_desc: string;
      body: Array<BlogSection>;
    };
  };

  transcript: {
    full_text: string;
    segments: Array<TranscriptSegment>;
    metadata: {
      language: string;
      language_probability: number;
    };
  };

  url: string;

  product_data: {
    title: string,
    price: string,
    available: string,
    review_count: string,
    product_url: string,
    image_url: string
  };

  related_posts: Array<string>;
}

export interface BlogSection {
  h2: string;
  p: string;
}

export interface SearchResult {
  subheading: string;
  matches: Array<{
    timestamp: string;
    match_count: number;
  }>;
}

export interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
  words: Array<{
    word: string;
    start: number;
    end: number;
    confidence: number;
  }>;
}

export interface Metadata {
  created_at: string;
  status: string;
  version: string;
  has_search_results: boolean;
  keywords: Array<string>;
}