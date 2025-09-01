import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";

const BlogHome = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(endpoints.blogpage);
        setFeaturedBlogs(res.data.featured_blogs || []);
        setLatestBlogs(res.data.latest_blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-lg font-Montserrat">Loading blogs...</p>
      </div>
    );
  }

  // Pagination calculations
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = latestBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(latestBlogs.length / blogsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Featured Blogs */}
      <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
        <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
          Featured Posts
        </h2>
        <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
          Explore handpicked blogs about Hajj, Umrah, and Islamic journeys.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {featuredBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.page_url}`}
            className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition block"
          >
            <img
              src={`${BASE_URL_IMG}/${blog.image_url}`}
              alt={blog.image_alt || blog.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-abril mb-2">{blog.title}</h3>
              <p className="text-sm font-Montserrat text-gray-600 mb-3 line-clamp-3">
                {blog.short_description || "Read more about this featured post."}
              </p>
              <span className="text-primary font-semibold hover:underline">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Latest Blogs */}
      <div className="w-full lg:w-[48%] mb-12 sm:mb-16">
        <img src="/svg/crown-black.svg" alt="Crown" className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4" />
        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
          Latest Posts
        </h2>
        <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
          Find the newest blogs, updates, and travel tips for Hajj and Umrah.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog) => (
          <Link
            key={blog.id}
            to={`/blog/${blog.page_url}`}
            className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition block"
          >
            <img
              src={`${BASE_URL_IMG}/${blog.image_url}`}
              alt={blog.image_alt || blog.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="text-xl font-abril mb-2">{blog.title}</h3>
              <p className="text-sm font-Montserrat text-gray-600 mb-3 line-clamp-3">
                {blog.short_description || "Read more about this post."}
              </p>
              <span className="text-primary font-semibold hover:underline">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
