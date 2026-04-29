import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  const path = searchParams.get("path");
  const secret = searchParams.get("secret");

  // Check for secret token
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate by Tag
    if (tag) {
      if (tag === "all") {
        const allTags = [
          "settings",
          "pages",
          "umrah-packages",
          "hajj-packages",
          "blogs",
          "reviews",
          "hotels"
        ];
        
        allTags.forEach((t) => {
          revalidateTag(t);
        });

        // Trigger a full layout revalidation as well
        revalidatePath("/", "layout");

        return NextResponse.json({ 
          revalidated: true, 
          type: "bulk", 
          tags: allTags, 
          now: Date.now() 
        });
      } else {
        revalidateTag(tag);
        return NextResponse.json({ 
          revalidated: true, 
          type: "tag", 
          tag: tag, 
          now: Date.now() 
        });
      }
    }

    // Revalidate by Path
    if (path) {
      revalidatePath(path);
      return NextResponse.json({ 
        revalidated: true, 
        type: "path", 
        path: path, 
        now: Date.now() 
      });
    }

    return NextResponse.json({ 
      message: "Missing tag or path parameter" 
    }, { status: 400 });

  } catch (err) {
    return NextResponse.json({ 
      message: "Error revalidating", 
      error: err.message 
    }, { status: 500 });
  }
}
