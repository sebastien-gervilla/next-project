import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Post } from "@/interfaces";
import { FC } from "react";

const getPosts = async () => {
    return db
        .select()
        .from(postsTable);
};

export default async function BlogsController() {
    const posts = await getPosts()

    return (
        <div id="blog-page" className="page">
            <BlogPage posts={posts} />
        </div>
    )
}

interface Props {
    posts: Post[];
}

export const BlogPage: FC<Props> = ({ posts }) => {

    const displayedPosts = posts.map(post => (
        <div key={post.id} className="post">
            <a href={`/blog/${post.id}`}>{post.title}</a>
            <p>{post.content}</p>
        </div>
    ));

    return (
        <div className="posts">
            {displayedPosts}
        </div>
    );
}