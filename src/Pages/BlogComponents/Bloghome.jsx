import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";
import NeedHelp from "../../Components/CommonComponents/NeedHelp";
import PageScript from "../../Components/CommonComponents/PageScript";

import { BannerSkeleton, SliderSkeleton } from "../../Components/CommonComponents/Skeleton";

const BlogHome = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const blogsPerPage = 15;

  // ✅ Fetch Blogs by page
  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${endpoints.blogpage}?page=${page}&limit=${blogsPerPage}`);
      setFeaturedBlogs(res.data.featured_blogs || []);
      setLatestBlogs(res.data.latest_blogs || []);
      if (res.data.pagination) setTotalPages(res.data.pagination.total_pages);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch page data (once)
  const fetchPageData = async () => {
    try {
      const resPage = await axios.get(endpoints.getPageUrl("blog"));
      if (resPage.data.status === 1) {
        const result = resPage.data.result;
        setPageData(result);

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
    } catch (err) {
      console.error("Error fetching page data:", err);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
    fetchPageData();
  }, [currentPage]);


  if (loading) {
    return (
      <div className="space-y-10">
        <BannerSkeleton />
        <div className="container mx-auto px-4 py-12 space-y-16">
          <SliderSkeleton count={3} />
          <SliderSkeleton count={3} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageScript html={pageData?.script} ownerKey="blog-home" />

      {pageData && <HeroSectionblog pageData={pageData} />}

      <div className="container mx-auto px-4 py-12">
        {/* ✅ Featured Blogs */}
        {widgets[0] && (
          <div className="w-full mb-8">
            <img
              src={`${BASE_URL_SVG}assets/svgs/crown-black.svg`}
              alt="Crown"
              className="w-16 sm:w-18 md:w-24 mb-3 sm:mb-2"
            />
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril mb-2">
              {widgets[0].heading}
            </h2>
            <p className="font-Montserrat text-[15px] md:text-[16px] text-black">
              {widgets[0].sub_heading}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.page_url}`}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
            >
              <img
                src={`${BASE_URL_IMG}/${blog.image_url}`}
                alt={blog.image_alt || blog.title}
                className="w-full h-56 object-fill rounded-xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-Montserrat font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm font-Montserrat text-gray-600 mb-3 line-clamp-3">
                  {blog.short_description || "Read more about this featured post."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ Latest Blogs */}
        {widgets[1] && (
          <div className="w-full mb-8">
            <img
              src={`${BASE_URL_SVG}assets/svgs/crown-black.svg`}
              alt="Crown"
              className="w-16 sm:w-18 md:w-24 mb-2"
            />
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-abril mb-2">
              {widgets[1].heading}
            </h2>
            <p className="font-Montserrat text-[15px] md:text-[16px] text-black">
              {widgets[1].sub_heading}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.page_url}`}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition block"
            >
              <img
                src={`${BASE_URL_IMG}/${blog.image_url}`}
                alt={blog.image_alt || blog.title}
                className="w-full h-56 object-fill rounded-xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-Montserrat font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm font-Montserrat text-gray-600 mb-3 line-clamp-3">
                  {blog.short_description || "Read more about this post."}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ✅ Pagination */}
        <div className="flex justify-center mt-10 items-center gap-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            disabled={currentPage === 1}
          >
            «
          </button>

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

          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      </div>

      <NeedHelp />
    </div>
  );
};

export default BlogHome;
