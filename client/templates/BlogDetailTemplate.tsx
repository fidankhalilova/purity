import BlogContent from "@/sections/BlogDetail/BlogContent";
import BlogTagsShare from "@/components/BlogTagsShare";
import BlogNav from "@/sections/BlogDetail/BlogNav";
import BeforeYouGo from "@/sections/BlogDetail/BeforeYouGo";
import LeaveComment from "@/sections/BlogDetail/LeaveComment";
import ImgBanner from "@/sections/BlogDetail/ImgBanner";
import Breadcrumb from "@/components/BreadCrumb";
import { BlogPost } from "@/types/blog";

export default function BlogDetailTemplate({ post }: { post: BlogPost }) {
  return (
    <div>
      <div className="container mx-auto px-6 py-4">
        <Breadcrumb overrideLastLabel={post.title} />
        <ImgBanner />
      </div>
      <BlogContent post={post} />

      <div className="max-w-3xl mx-auto px-6">
        <BlogTagsShare tags={post.tags} shareTitle={post.title} />
        <BlogNav older={post.older} newer={post.newer} />
      </div>

      <BeforeYouGo />
      <LeaveComment />
    </div>
  );
}
