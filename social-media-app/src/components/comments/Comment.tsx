import { CommentData } from "@/lib/types";
import UserTooltip from "../UserTooltip";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import CommentMoreButton from "./CommentMoreButton";

interface CommentProps {
    comment: CommentData
}

export default function Comment({ comment }: CommentProps) {
    const { user } = useSession();
    return (
        <div className="flex gap-3 py-3 group/comment">
            <span className="inline">
                <UserTooltip user={comment.user}>
                    <Link href={`/users/${comment.user.username}`}>
                        <UserAvatar avatarUrl={comment.user.avatarUrl} size={40}/>
                    </Link>
                </UserTooltip>
            </span>
            <div className="flex-1">
                <div className="flex items-center gap-1 text-sm">
                    <UserTooltip user={comment.user}>
                        <Link href={`/users/${comment.user.username}`} className="font-medium hover:underline">
                            {comment.user.displayName.slice(0, 20)}
                        </Link>
                    </UserTooltip>
                    <span className="text-muted-foreground">{formatRelativeDate(comment.createdAt)}</span>
                </div>
                <div className="text-justify">{comment.content}</div>
            </div>
            {comment.user.id === user?.id && (
                <CommentMoreButton
                    comment={comment}
                    className="ms-auto lg:opacity-0 transition-opacity group-hover/comment:opacity-100"
                />
            )}
        </div>
    )
}