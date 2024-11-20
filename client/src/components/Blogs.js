import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null); // Initialize as null to check loading state
  const [loading, setLoading] = useState(true); // Track loading state

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      const data = await res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      setLoading(false); // Set loading to false once data is fetched
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display while waiting for data
  }
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <Blog
            id={blog._id}
            isUser={false} //not to show the icons in all blogs
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}        
          />
        ))}
    </div>
  );
};

export default Blogs;
