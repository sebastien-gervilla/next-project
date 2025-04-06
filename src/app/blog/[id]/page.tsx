import NotFound from "@/app/not-found";
import { db } from "@/db";
import { postsTable } from "@/db/schema";
import { Post } from "@/interfaces";
import { eq } from "drizzle-orm";
import { FC } from "react";

const getPost = async (id: number) => {
    return db
        .select()
        .from(postsTable)
        .where(eq(postsTable.id, id))
        .limit(1);
};

export const revalidate = 3600

export default async function BlogController({ params }: { params: { id: string } }) {

    if (!params.id)
        return <NotFound />;

    const post = await getPost(parseInt(params.id, 10));

    if (!post.length)
        return <NotFound />;

    return (
        <div id="blog-page" className="page">
            <BlogPage post={post[0]} />
        </div>
    )
}

interface Props {
    post: Post;
}

export const BlogPage: FC<Props> = ({ post }) => {
    return (
        <div className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
}