import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import { Helmet } from "react-helmet";
import NotFound from "../CommonPages/NotFound";


const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

const BlogDetails = () => {
  const { page_url } = useParams();
  const [blog, setBlog] = useState(null); // default null
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // new state

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await axios.get(endpoints.blogdeatilsgpage(page_url));

        if (res.data.blog) {
          setBlog(res.data.blog);
          setLatestBlogs(res.data.latest_blogs || []);
        } else {
          setError(true); // no blog found
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        setError(true); // API failed or not found
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [page_url]);
  useEffect(() => {
    if (!blog?.script) return;

    // Parse the HTML string returned from API
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = blog.script;

    // Find all <script> tags inside it
    const scripts = tempDiv.querySelectorAll("script");

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      // Copy type, src, and inner content
      if (oldScript.type) newScript.type = oldScript.type;
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.text = oldScript.innerHTML;
      }

      document.head.appendChild(newScript);
    });
  }, [blog]);

  // 🔹 Loading state
  if (loading) {
    return <FullPageLoader />;
  }

  // 🔹 Not found state
  if (error || !blog) {
    return <NotFound />;
  }

  // ✅ Normal render
  const imageUrl = blog.banner_image_url ? `${BASE_URL_IMG}/${blog.banner_image_url}` : "";

  return (
    <div>
      <Helmet>
        <title>{blog.browser_title}</title>
        <meta name="description" content={blog.meta_description || ""} />
        <meta name="keywords" content={blog.meta_keywords || ""} />
        <meta property="og:title" content={blog.browser_title} />
        <meta property="og:description" content={blog.meta_description || ""} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="Travels & Tours" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <HeroSectionblog
        pageData={{
          banner_heading: blog.banner_heading || blog.title,
          description: blog.banner_description,
          image_url: blog.banner_image_url,
          button_enable: "1",
          button_text: blog?.button_text,
          button_link: blog?.button_link,
        }}
      />

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:py-8 flex flex-col-reverse md:flex-row gap-10">
        {/* Right - Latest Posts Sidebar */}
        <aside className="w-full md:w-1/3 md:sticky top-24 self-start h-fit">
          <span className="text-lg font-semibold font-Montserrat mb-4 block">
            Latest Posts
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 overflow-y-auto pr-1">
            {latestBlogs.map((item) => (
              <Link
                key={item.id}
                to={`/blog/${item.page_url}`}
                className="rounded-xl overflow-hidden hover:shadow-md transition block border border-gray-100"
              >
                <div className="w-full h-40 sm:h-48 md:h-52 rounded-xl overflow-hidden">
                  <img
                    src={`${BASE_URL_IMG}/${item.image_url}`}
                    alt={item.image_alt || item.title}
                    className="w-full h-full object-fill"
                  />
                </div>
                <div className="p-3">
                  <span className="text-md font-semibold font-Montserrat line-clamp-2">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
        <main className="w-full md:w-2/3 mt-[-22px]">
          <p className="text-gray-600 text-sm mb-6 font-Montserrat"></p>
          {blog.description && (
            <div
              className="prose prose-a:text-primary prose-lg font-Montserrat parseData"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          )}
        </main>
      </div>

      {/* ✅ Need Help Section at the end */}
      <NeedHelp />
    </div>
  );
};


export default BlogDetails;
