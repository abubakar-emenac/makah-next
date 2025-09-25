import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL_IMG, endpoints } from "../../Helpers/apiEndpoints";
import HeroSectionblog from "../../Components/CommonComponents/HeroSectionblog";
import NeedHelp from '../../Components/CommonComponents/NeedHelp'
import { Helmet } from "react-helmet";

const BlogDetails = () => {
  const { page_url } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("BlogData", blog)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const res = await axios.get(endpoints.blogdeatilsgpage(page_url));
        // console.log("resPage", res)
        setBlog(res.data.blog || null);
        setLatestBlogs(res.data.latest_blogs || []);

        // if (res.data.blog?.browser_title) {
        //   document.title = res.data.blog.browser_title;
        // }

        // // Set Meta Description
        // const desc = document.querySelector('meta[name="description"]') || document.createElement("meta");
        // desc.setAttribute("name", "description");
        // desc.setAttribute("content", res.data.blog.meta_description || "");
        // if (!desc.parentNode) document.head.appendChild(desc);

        // // Set meta keywords
        // const keywords = document.querySelector('meta[name="keywords"]') || document.createElement("meta");
        // keywords.setAttribute("name", "keywords");
        // keywords.setAttribute("content", res.data.blog.meta_keywords);
        // if (!keywords.parentNode) document.head.appendChild(keywords);

        // // OG Title
        // const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement("meta");
        // ogTitle.setAttribute("property", "og:title");
        // ogTitle.setAttribute("content", res.data.blog.browser_title);
        // if (!ogTitle.parentNode) document.head.appendChild(ogTitle);

        // // OG Description
        // const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement("meta");
        // ogDescription.setAttribute("property", "og:description");
        // ogDescription.setAttribute("content", res.data.blog.meta_description || "");
        // if (!ogDescription.parentNode) document.head.appendChild(ogDescription);

        // // OG Image (dynamic from banner_img[0])
        // const imageUrl = res.data.blog.banner_image_url
        //   ? `${BASE_URL_IMG}/${res.data.blog.banner_image_url}`
        //   : '';
        // // console.log(imageUrl)
        // const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement("meta");
        // ogImage.setAttribute("property", "og:image");
        // ogImage.setAttribute("content", imageUrl);
        // if (!ogImage.parentNode) document.head.appendChild(ogImage);

        // // OG URL (current page URL)
        // const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement("meta");
        // ogUrl.setAttribute("property", "og:url");
        // ogUrl.setAttribute("content", window.location.href);
        // if (!ogUrl.parentNode) document.head.appendChild(ogUrl);

        // // OG Type (always set to "Travels & Tours")
        // const ogType = document.querySelector('meta[property="og:type"]') || document.createElement("meta");
        // ogType.setAttribute("property", "og:type");
        // ogType.setAttribute("content", "Travels & Tours");
        // if (!ogType.parentNode) document.head.appendChild(ogType);

        // // Canonical Link
        // let canonicalLink = document.querySelector('link[rel="canonical"]');
        // if (!canonicalLink) {
        //   canonicalLink = document.createElement("link");
        //   canonicalLink.setAttribute("rel", "canonical");
        //   document.head.appendChild(canonicalLink);
        // }
        // canonicalLink.setAttribute("href", window.location.href);

      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [page_url]);

  const imageUrl = blog && blog.banner_image_url ? `${BASE_URL_IMG}/${blog.banner_image_url}` : ""

  return (
    <div>
      {
        blog && (
          <Helmet>
            <title>{blog.browser_title}</title>
            <meta name="description" content={blog.meta_description || ""} />
            <meta name="keywords" content={blog.meta_keywords || ""} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={blog.browser_title} />
            <meta property="og:description" content={blog.meta_description || ""} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="Travels & Tours" />

            {/* Canonical */}
            <link rel="canonical" href={window.location.href} />
          </Helmet>
        )}

      {blog && (
        <HeroSectionblog
          pageData={{
            banner_heading: blog.banner_heading || blog.title,
            description: blog.banner_description,
            image_url: blog.banner_image_url,
            button_enable: "1",
            button_text: blog?.button_text,
            button_link: blog?.button_link
          }}
        />
      )}

      {/* ✅ Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col-reverse md:flex-row gap-10">
        {/* Left - Blog Content */}
        <main className="w-full md:w-2/3 order-1 md:order-1">

          <p className="text-gray-600 text-sm mb-6 font-Montserrat">

            {/* on{" "}
            {new Date(blog.publish_date).toLocaleDateString()} */}
          </p>
          {blog && blog.description && (
            <div
              className="prose prose-a:text-primary prose-lg font-Montserrat parseData"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          )}
        </main>


        {/* Right - Latest Posts Sidebar */}
        <aside className="w-full md:w-1/3 mb-8 md:mb-0 md:sticky top-24 self-start h-fit">
          <span className="text-lg font-semibold font-Montserrat mb-4">Latest Posts</span>
          <div className="grid grid-cols-1 gap-4 overflow-y-auto pr-1">
            {latestBlogs.map((item) => (
              <Link
                key={item.id}
                to={`/blog/${item.page_url}`}
                className="rounded-xl overflow-hidden hover:shadow-md transition block"
              >
                <div className="w-full h-28 object-fill rounded-xl"
                >
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
      </div>
      {/* ✅ Need Help Section at the end */}
      <NeedHelp />
    </div>
  );
};

export default BlogDetails;
