import BlogContent from "@/sections/BlogDetail/BlogContent";
import BlogTagsShare from "@/components/BlogTagsShare";
import BlogNav from "@/sections/BlogDetail/BlogNav";
import BeforeYouGo from "@/sections/BlogDetail/BeforeYouGo";
import LeaveComment from "@/sections/BlogDetail/LeaveComment";
import ImgBanner from "@/sections/BlogDetail/ImgBanner";
import Breadcrumb from "@/components/BreadCrumb";
import { BlogPost } from "@/types/blog";

interface BlogDetailTemplateProps {
  post: BlogPost;
  olderPost?: BlogPost | null;
  newerPost?: BlogPost | null;
}

export default function BlogDetailTemplate({
  post,
  olderPost,
  newerPost,
}: BlogDetailTemplateProps) {
  return (
    <div>
      <div className="container mx-auto px-6 py-4">
        <Breadcrumb overrideLastLabel={post.title} />
      </div>
      <ImgBanner post={post} />
      <BlogContent post={post} />

      <div className="max-w-3xl mx-auto px-6">
        <BlogTagsShare tags={post.tags || []} shareTitle={post.title} />
        <BlogNav
          older={
            olderPost
              ? { title: olderPost.title, href: olderPost.slug }
              : undefined
          }
          newer={
            newerPost
              ? { title: newerPost.title, href: newerPost.slug }
              : undefined
          }
        />
      </div>

      <BeforeYouGo currentPostId={post._id} />
      <LeaveComment postId={post._id} />
    </div>
  );
}
