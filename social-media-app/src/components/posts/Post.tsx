"use client";

import { PostData } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";
import UserAvatar from "../UserAvatar";
import { cn, formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";
import UserTooltip from "../UserTooltip";
import { Media } from "@prisma/client";
import Image from "next/image";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { MessagesSquare } from "lucide-react";
import Comments from "../comments/Comments";

interface PostProps {
  post: PostData;
}

const Post = ({ post }: PostProps) => {
  const { user } = useSession();

  const [showComments, setShowComments] = useState(false);

  return (
    <article className="group/post space-y-3 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div className="flex-1">
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                <span className="line-clamp-1 break-all">{post.user.displayName}</span>
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user?.id && (
          <PostMoreButton
            post={post}
            className="lg:opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words text-justify">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments}/>
      )}
      <hr className="text-muted-foreground"/>
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
            likes: post._count.likes,
              isLikedByUser: post.likes.some(like => like.userId === user?.id)
            }}
          />
          <CommentButton
            post={post}
            onClick={() => setShowComments(!showComments)}
          />
        </div>
        
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(bookmark => bookmark.userId === user?.id)
          }}
        />
      </div>
      {showComments && <Comments post={post}/>}
    </article>
  );
};

export default Post;

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({attachments}: MediaPreviewsProps) {
  return (
    <div className={cn("flex flex-col gap-3", attachments.length > 1 && "sm:grid sm:grid-cols-2")}>
      {attachments.map(m => (
        <MediaPreview key={m.id} media={m}/>
      ))}
    </div>
  )
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({media}: MediaPreviewProps) {
  if(media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      ></Image>
    )
  } else if(media.type === "VIDEO") {
    return (
      <div>
        <video src={media.url} controls className="mx-auto size-fit max-h-[30rem] rounded-2xl"></video>
      </div>
    )
  }
  return <p className="text-destructive">Unsupported media type</p>
}

interface CommentButtonProps {
  post: PostData;
  onClick: () => void;
}

function CommentButton({ post, onClick }: CommentButtonProps) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <MessagesSquare className="size-5"/>
      <span className="text-sm font-medium tabular-nums">
        {post._count.comments}{" "}
        <span className="hidden sm:inline">{post._count.comments > 1 ? "comments" : "comment"}</span>
      </span>
    </button>
  )
}