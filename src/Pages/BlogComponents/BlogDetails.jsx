import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";
import NeedHelp from '../../Components/CommonComponents/NeedHelp'

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
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <p className="text-lg font-Montserrat">Blog not found.</p>
      </div>
    );
  }

  return (
    <div>
      {/* ✅ Hero Section using single blog data */}
      <HeroSectionblog
        pageData={{
          banner_heading: blog.banner_heading || blog.title,
          description: blog.banner_description,
          image_url: blog.banner_image_url,
          button_enable: "0",
        }}
      />

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        {/* Left - Blog Content */}
        <main className="w-full md:w-2/3 order-1 md:order-1">
          
          <p className="text-gray-600 text-sm mb-6 font-Montserrat">
            By {blog.author || "Admin"} on{" "}
            {new Date(blog.created_at).toLocaleDateString()}
          </p>
          <div
            className="prose prose-lg font-Montserrat text-gray-800"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </main>


        {/* Right - Latest Posts Sidebar */}
<aside className="w-full md:w-1/3 mb-8 md:mb-0 hidden md:block">
  <h2 className="text-lg font-semibold mb-4">Latest Posts</h2>
<div className="grid grid-cols-1 gap-4 max-h-[95vh] overflow-y-auto pr-1">
    {latestBlogs.map((item) => (
      <Link
        key={item.id}
        to={`/blog/${item.page_url}`}
        className="rounded-xl overflow-hidden hover:shadow-md transition block"
      >
        <div className="w-full h-28 object-cover rounded-lg"

>
          <img
            src={`${BASE_URL_IMG}/${item.image_url}`}
            alt={item.image_alt || item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold line-clamp-2">
            {item.title}
          </h3>
        </div>
      </Link>
    ))}
  </div>
</aside>
      </div>
        {/* ✅ Need Help Section at the end */}
            <NeedHelp />
    </div>
  );
};

export default BlogDetails;
