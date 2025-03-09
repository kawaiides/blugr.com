import {connectToDatabase} from "../../../lib/mongodb";
import { Document as MongoDocument } from "bson";

interface RequestParams {
  search: string;
}

interface QueryParams {
  content_id: string;
  title: string;
  blog_desc: string;
}

export async function GET(request: Request, { params }: { params: RequestParams }) {
  const client = await connectToDatabase();

  const db = client.db("sample_airbnb");
  let itemCollection = await db.collection("listingsAndReviews");
  const stringQueries = (await params).search;
  const queries: QueryParams = JSON.parse(stringQueries);

  // Start building the search aggregation stage
  let searcher_aggregate = {
    "$search": {
      "index": 'default',
      "compound": {
        "must": [
          // get blog where queries.content_id is content_id
          {
            "text": {
              "query": queries.content_id,
              "path": 'content_id',
              "fuzzy": {}
            }
          },
          // get blog where queries.title is summary.parsed_summary.title
          {
            "text": {
              "query": queries.title,
              "path": 'summary.parsed_summary.title',
              "fuzzy": {}
            }
          },
          {
            "text": {
              "query": queries.blog_desc,
              "path": 'summary.parsed_summary.blog_desc',
              "fuzzy": {}
            }
          }
        ]
      }
    }
  };

  // A projection will help us return only the required fields
  let projection = {
    '$project': {
      'content_id': 1,
      'created_at': 1,
      'summary.parsed_summary.title': 1,
      'summary.parsed_summary.blog_desc': 1,
    }
  };

  let results: MongoDocument[] = await itemCollection.aggregate([searcher_aggregate, projection]).limit(50).toArray();

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}