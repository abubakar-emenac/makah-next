import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";

const BlogDetails = () => {
  const { page_url } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(endpoints.blogdeatilsgpage(page_url));
        setBlog(res.data.blog || null);
        setLatestBlogs(res.data.latest_blogs || []);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [page_url]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-lg font-Montserrat">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return <p className="text-center py-10 text-gray-500">Blog not found.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Main Blog Content */}
      <main className="w-full md:w-3/4 order-1 md:order-1">
        
        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Latest Posts below content on mobile */}
        <div className="mt-8 md:hidden">
          <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-4">
            {latestBlogs.map((item) => (
              <Link
                key={item.id}
                to={`/blog/${item.page_url}`}
                className="rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={`${BASE_URL_IMG}/${item.image_url}`}
                  alt={item.image_alt || item.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Sidebar - Latest Posts for desktop */}
      <aside className="w-full md:w-1/4 mb-8 md:mb-0 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
        <div className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-y-auto">
          {latestBlogs.map((item) => (
            <Link
              key={item.id}
              to={`/blog/${item.page_url}`}
              className="rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={`${BASE_URL_IMG}/${item.image_url}`}
                alt={item.image_alt || item.title}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default BlogDetails;
