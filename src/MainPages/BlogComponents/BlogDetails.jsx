import React, { useEffect, useState } from "react";
import { useParams, Link } from "@navigation";
import { api } from "../../utils/api";
import { BASE_URL_IMG } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import NotFound from "../CommonPages/NotFound";
import PageScript from "../../Components/CommonComponents/PageScript";


import { BlogDetailSkeleton } from "../../Components/CommonComponents/Skeleton";

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

        const data = await api.getBlogDetails(page_url);

        if (data?.blog) {
          setBlog(data.blog);
          setLatestBlogs(data.latest_blogs || []);
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

  // 🔹 Loading state
  if (loading) {
    return <BlogDetailSkeleton />;
  }

  // 🔹 Not found state
  if (error || !blog) {
    return <NotFound />;
  }

  // ✅ Normal render
  return (
    <div>
      <PageScript html={blog?.script} ownerKey={page_url} />

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
