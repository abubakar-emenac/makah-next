import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";

const BlogHome = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 12;

  useEffect(() => {
    const fetchBlogsAndPage = async () => {
      try {
        // ✅ Fetch blogs
        const resBlogs = await axios.get(endpoints.blogpage);
        setFeaturedBlogs(resBlogs.data.featured_blogs || []);
        setLatestBlogs(resBlogs.data.latest_blogs || []);

        // ✅ Fetch page data
        const resPage = await axios.get(endpoints.getPageUrl("blog"));
        if (resPage.data.status === 1) {
          const result = resPage.data.result;
          setPageData(result);

          // ✅ Parse widgets_content into usable sections
          if (result.widgets_content) {
            const widgetRegex = /\{\{Blog section \d+ ?heading="([^"]+)" sub_heading="([^"]+)"\}\}/g;
            const sections = [];
            let match;
            while ((match = widgetRegex.exec(result.widgets_content)) !== null) {
              sections.push({ heading: match[1], sub_heading: match[2] });
            }
            setWidgets(sections);
          }
        }
      } catch (error) {
        console.error("Error fetching blogs or page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsAndPage();
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
    <div>
      {/* ✅ Hero Section */}
      {pageData && <HeroSectionblog pageData={pageData} />}

      <div className="container mx-auto px-4 py-12">
        {/* ✅ Section 1 → Featured Blogs */}
        {widgets[0] && (
          <div className="w-full mb-12 sm:mb-16">
            <img
              src="/svg/crown-black.svg"
              alt="Crown"
              className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4"
            />
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
              {widgets[0].heading}
            </h2>
            <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
              {widgets[0].sub_heading}
            </p>
          </div>
        )}
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
                className="w-full h-56 object-cover rounded-xl"
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

        {/* ✅ Section 2 → Latest Blogs */}
        {widgets[1] && (
          <div className="w-full mb-12 sm:mb-16">
            <img
              src="/svg/crown-black.svg"
              alt="Crown"
              className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-4"
            />
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
              {widgets[1].heading}
            </h2>
            <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
              {widgets[1].sub_heading}
            </p>
          </div>
        )}
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
                className="w-full h-56 object-cover rounded-xl"
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

        {/* ✅ Pagination under latest blogs */}
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
    </div>
  );
};

export default BlogHome;
