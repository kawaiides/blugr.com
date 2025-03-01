export type BlogContent = {
  type: "subheading" | "paragraph" | "image"
  content: string
}

export type Blog = {
  id: string
  title: string
  description: string
  thumbnail: string
  category: string
  author: string
  date: Date
  content: BlogContent[]
  trending?: boolean
  latest?: boolean
  forYou?: boolean
}

export const blogs: Blog[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    description: "Learn how to build modern web applications with Next.js",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    author: "Jane Doe",
    date: new Date("2024-02-15"),
    trending: true,
    forYou: true,
    content: [
      { type: "subheading", content: "What is Next.js?" },
      {
        type: "paragraph",
        content:
          "Next.js is a React framework that enables server-side rendering, static site generation, and more. It's designed to make it easy to build fast, SEO-friendly React applications.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Why Use Next.js?" },
      {
        type: "paragraph",
        content:
          "Next.js provides a great developer experience with features like fast refresh, automatic routing, and built-in CSS support. It also offers excellent performance optimizations out of the box.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
    ],
  },
  {
    id: "2",
    title: "Introduction to TypeScript",
    description: "A beginner's guide to TypeScript and static typing",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Programming",
    author: "John Smith",
    date: new Date("2024-02-10"),
    trending: true,
    latest: true,
    content: [
      { type: "subheading", content: "What is TypeScript?" },
      {
        type: "paragraph",
        content:
          "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Benefits of TypeScript" },
      {
        type: "paragraph",
        content:
          "TypeScript adds static type checking to JavaScript, which can help catch errors early in development. It also provides excellent tooling support with features like autocompletion and refactoring.",
      },
    ],
  },
  {
    id: "3",
    title: "Responsive Design with Tailwind CSS",
    description: "Build responsive interfaces quickly with utility-first CSS",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "CSS",
    author: "Mary Johnson",
    date: new Date("2024-02-05"),
    trending: true,
    forYou: true,
    content: [
      { type: "subheading", content: "What is Tailwind CSS?" },
      {
        type: "paragraph",
        content:
          "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Responsive Design with Tailwind" },
      {
        type: "paragraph",
        content:
          "Tailwind makes it easy to create responsive designs with its mobile-first breakpoint system. You can use responsive utility classes to create layouts that look great on any device.",
      },
    ],
  },
  {
    id: "4",
    title: "Building a REST API with Node.js",
    description: "Learn how to create a RESTful API using Node.js and Express",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Backend",
    author: "Alex Chen",
    date: new Date("2024-02-01"),
    trending: true,
    latest: true,
    content: [
      { type: "subheading", content: "Setting Up a Node.js Server" },
      {
        type: "paragraph",
        content:
          "In this tutorial, we'll learn how to set up a Node.js server using Express, a popular web framework for Node.js.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Creating API Endpoints" },
      {
        type: "paragraph",
        content:
          "We'll create REST API endpoints for CRUD operations on a resource, with proper status codes and error handling.",
      },
    ],
  },
  {
    id: "5",
    title: "React State Management with Context API",
    description: "Simplify state management in your React applications",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "React",
    author: "Sarah Williams",
    date: new Date("2024-01-28"),
    forYou: true,
    latest: true,
    content: [
      { type: "subheading", content: "Introduction to Context API" },
      {
        type: "paragraph",
        content:
          "The Context API provides a way to share state between components without having to pass props down manually at every level.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Creating a Context Provider" },
      {
        type: "paragraph",
        content: "Learn how to create a context provider to share state across your application components.",
      },
    ],
  },
  {
    id: "6",
    title: "GraphQL vs REST: A Comparison",
    description: "Understand the differences between GraphQL and REST APIs",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "API",
    author: "Michael Brown",
    date: new Date("2024-01-25"),
    forYou: true,
    content: [
      { type: "subheading", content: "What is GraphQL?" },
      {
        type: "paragraph",
        content:
          "GraphQL is a query language for APIs and a runtime for executing those queries against your data. It gives clients the power to ask for exactly what they need.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "GraphQL vs REST" },
      {
        type: "paragraph",
        content: "Compare the benefits and drawbacks of GraphQL and REST APIs, and learn when to use each approach.",
      },
    ],
  },
  {
    id: "7",
    title: "Introduction to Docker",
    description: "Learn how to containerize your applications with Docker",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "DevOps",
    author: "David Lee",
    date: new Date("2024-01-20"),
    forYou: true,
    latest: true,
    content: [
      { type: "subheading", content: "What is Docker?" },
      {
        type: "paragraph",
        content:
          "Docker is a platform for developing, shipping, and running applications in containers, which are lightweight, portable environments.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Benefits of Containerization" },
      {
        type: "paragraph",
        content:
          "Containers provide consistent environments, isolation, and efficient resource usage, making it easier to develop and deploy applications.",
      },
    ],
  },
  {
    id: "8",
    title: "CSS Grid Layout: A Complete Guide",
    description: "Master the CSS Grid Layout system for modern web layouts",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "CSS",
    author: "Emily Davis",
    date: new Date("2024-01-15"),
    latest: true,
    content: [
      { type: "subheading", content: "Introduction to CSS Grid" },
      {
        type: "paragraph",
        content:
          "CSS Grid Layout is a two-dimensional layout system designed specifically for laying out items in rows and columns.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Creating a Grid Container" },
      {
        type: "paragraph",
        content: "Learn how to create a grid container and define the columns and rows of your grid.",
      },
    ],
  },
  {
    id: "9",
    title: "Getting Started with TensorFlow.js",
    description: "Build machine learning models in the browser with TensorFlow.js",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Machine Learning",
    author: "Ryan Johnson",
    date: new Date("2024-01-10"),
    latest: true,
    content: [
      { type: "subheading", content: "What is TensorFlow.js?" },
      {
        type: "paragraph",
        content:
          "TensorFlow.js is a library for machine learning in JavaScript, allowing you to develop ML models and run them directly in the browser.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Building a Simple Model" },
      {
        type: "paragraph",
        content: "Learn how to build and train a simple machine learning model with TensorFlow.js.",
      },
    ],
  },
  {
    id: "10",
    title: "Authentication with NextAuth.js",
    description: "Implement authentication in your Next.js applications easily",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    author: "Lisa Wilson",
    date: new Date("2024-01-05"),
    forYou: true,
    content: [
      { type: "subheading", content: "Introduction to NextAuth.js" },
      {
        type: "paragraph",
        content:
          "NextAuth.js is a complete authentication solution for Next.js applications, providing support for various authentication providers.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Setting Up NextAuth.js" },
      {
        type: "paragraph",
        content: "Learn how to set up NextAuth.js in your Next.js application and configure authentication providers.",
      },
    ],
  },
  {
    id: "11",
    title: "Introduction to WebAssembly",
    description: "Accelerate your web applications with WebAssembly",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Web Development",
    author: "Mark Thompson",
    date: new Date("2023-12-28"),
    content: [
      { type: "subheading", content: "What is WebAssembly?" },
      {
        type: "paragraph",
        content:
          "WebAssembly (Wasm) is a binary instruction format that allows high-performance code written in languages like C, C++, and Rust to run in the browser.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Benefits of WebAssembly" },
      {
        type: "paragraph",
        content:
          "WebAssembly provides near-native performance, enabling more computationally intensive tasks to be performed in the browser.",
      },
    ],
  },
  {
    id: "12",
    title: "Building Accessible Web Forms",
    description: "Best practices for creating accessible form experiences",
    thumbnail: "/placeholder.svg?height=400&width=600",
    category: "Accessibility",
    author: "Jessica Parker",
    date: new Date("2023-12-20"),
    content: [
      { type: "subheading", content: "Why Accessibility Matters" },
      {
        type: "paragraph",
        content:
          "Creating accessible forms ensures that all users, including those with disabilities, can complete forms on your website or application.",
      },
      { type: "image", content: "/placeholder.svg?height=300&width=600" },
      { type: "subheading", content: "Accessible Form Design" },
      {
        type: "paragraph",
        content:
          "Learn how to design forms with clear labels, helpful error messages, and proper keyboard navigation to improve accessibility.",
      },
    ],
  },
]

export function getTrendingBlogs(): Blog[] {
  return blogs.filter((blog) => blog.trending)
}

export function getLatestBlogs(): Blog[] {
  return blogs.filter((blog) => blog.latest)
}

export function getForYouBlogs(): Blog[] {
  return blogs.filter((blog) => blog.forYou)
}

export function getBlogById(id: string): Blog | undefined {
  return blogs.find((blog) => blog.id === id)
}

export function searchBlogs(query: string): Blog[] {
  const lowercaseQuery = query.toLowerCase()
  return blogs.filter((blog) => {
    // Search in title and description
    if (
      blog.title.toLowerCase().includes(lowercaseQuery) ||
      blog.description.toLowerCase().includes(lowercaseQuery) ||
      blog.category.toLowerCase().includes(lowercaseQuery) ||
      blog.author.toLowerCase().includes(lowercaseQuery)
    ) {
      return true
    }

    // Search in content
    return blog.content.some((item) => item.type === "paragraph" && item.content.toLowerCase().includes(lowercaseQuery))
  })
}

