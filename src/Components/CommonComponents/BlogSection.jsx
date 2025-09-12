import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ViewAllButton from "./ViewAllButton";
import { BASE_URL_IMG, BASE_URL_SVG, endpoints } from "../../Helpers/apiEndpoints";

export default function BlogSection() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogsAndWidgets = async () => {
      try {
        // ✅ Fetch blogs
        const resBlogs = await axios.get(endpoints.blogpage);
        setLatestBlogs(resBlogs.data.latest_blogs || []);

        // ✅ Fetch page data (for heading/subheading)
        const resPage = await axios.get(endpoints.getPageUrl("blog"));
        if (resPage.data.status === 1) {
          const result = resPage.data.result;

          if (result.widgets_content) {
            const widgetRegex =
              /\{\{Blog section \d+ ?heading="([^"]+)" sub_heading="([^"]+)"\}\}/g;
            const sections = [];
            let match;
            while ((match = widgetRegex.exec(result.widgets_content)) !== null) {
              sections.push({ heading: match[1], sub_heading: match[2] });
            }
            setWidgets(sections);
          }
        }
      } catch (error) {
        console.error("Error fetching blogs/widgets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsAndWidgets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-lg font-Montserrat">Loading latest blogs...</p>
      </div>
    );
  }

  if (!latestBlogs.length) {
    return null; // nothing to show
  }

  // First blog for left card
  const firstBlog = latestBlogs[0];
  // Next 3 blogs for right list
  const otherBlogs = latestBlogs.slice(1, 4);

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 mx-auto mt-10 sm:mt-14 md:mt-28 font-sans max-w-[90%] md:max-w-[75%] mb-10">
      {/* Heading Section */}
      <div className="w-full mb-10 sm:mb-12 md:mb-16">
        <img
          src={`${BASE_URL_SVG}/assets/svgs/crown-black.svg`}
          alt="Crown"
          className="w-12 sm:w-16 md:w-20 mb-3 sm:mb-4"
        />
        <h3 className="text-[26px] sm:text-[32px] md:text-[36px] font-abril leading-tight mb-3 sm:mb-4">
          {widgets[1]?.heading || "Our Latest News"}
        </h3>
        <p className="font-Montserrat text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black">
          {widgets[1]?.sub_heading ||
            "Makkah Travel is here to help you visit religious places and make Umrah trips that connect with your soul."}
        </p>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Blog Card Left */}
        <div className="w-full lg:w-1/2">
          <Link to={`/blog/${firstBlog.page_url}`}>
            <img
              src={`${BASE_URL_IMG}/${firstBlog.image_url}`}
              alt={firstBlog.image_alt || firstBlog.title}
              className="w-full h-64 sm:h-72 md:h-80 lg:h-[360px] object-cover rounded-md"
            />
          </Link>
          <span className="text-black mt-4 block font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
            {firstBlog.publish_date}
          </span>
          <Link to={`/blog/${firstBlog.page_url}`}>
            <h4 className="text-[22px] sm:text-[28px] md:text-[32px] font-abril leading-tight mt-2 mb-3 cursor-pointer">
            {firstBlog.title}
          </h4>
          </Link>
          <p className="text-[14px] sm:text-[15px] md:text-[16px] font-Montserrat leading-relaxed text-black mb-4 line-clamp-3">
            {firstBlog.short_description || "Read more about this blog."}
          </p>
          <div className="mt-2">
            <ViewAllButton label="Read More" color="primary" size="md" slug={`blog/${firstBlog.page_url}`} />
          </div>
        </div>

        {/* Blog List Right */}
        <div className="w-full lg:w-1/2 flex flex-col px-4">
          {otherBlogs.map((item, index) => (
            <div key={item.id} className="w-full pt-3">
              <div className="cursor-pointer">
                <span className="text-black font-Montserrat text-[14px] sm:text-[15px] md:text-[16px]">
                  {item.publish_date}
                </span>
                <Link to={`blog/${item.page_url}`}>
                  <h5 className="text-[18px] sm:text-[20px] md:text-[18px] lg:text-[22px] font-Montserrat font-semibold text-black hover:text-primary-hover transition-all">
                    {item.title}
                  </h5>
                </Link>
                <Link
                  to={`blog/${item.page_url}`}
                  className="text-secondary flex gap-2 text-[12px] md:text-[14px] lg:text-[16px] items-center mt-2"
                >
                  Read More
                  <img
                    src={`${BASE_URL_SVG}/assets/svgs/grayarrow.svg`}
                    alt="arrow"
                  />
                </Link>
                {index < otherBlogs.length - 1 && (
                  <hr className="m-5 w-20 mx-auto" />
                )}
              </div>
            </div>
          ))}

          <div className="mt-10">
            <ViewAllButton label="View All Blogs" color="primary" size="md" slug={"blog"} />
          </div>
        </div>
      </div>
    </div>
  );
}
