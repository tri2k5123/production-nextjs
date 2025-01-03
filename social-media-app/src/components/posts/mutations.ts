import { PostData, PostsPage } from "@/lib/types";
import { useToast } from "../ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";


export function useDeletePostMutation() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const router = useRouter();
    const pathName = usePathname();

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: async (deletedPost) => {
            const queryFilter: QueryFilters = { queryKey: ["post-feed"] };
            await queryClient.cancelQueries(queryFilter);
            queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
                queryFilter,
                (oldData) => {
                    if(!oldData) return;
                    return {
                        pageParams: oldData.pageParams,
                        pages: oldData.pages.map(page => ({
                            nextCursor: page.nextCursor,
                            posts: page.posts.filter(p => p.id !== deletedPost.id)
                        }))
                        // 5:51:02 
                    }
                }
            )
            toast({
                description: "Post deleted"
            })
            if(pathName === `/posts/${deletedPost.id}`) router.push("/")
            // ở dưới cx đc nhưng thấy ở trên hợp lí hơn
            // if(pathName === `/posts/${deletedPost.id}`) router.push(`/users/${deletedPost.user.username}`);
        },
        onError(error, variables, context) {
            console.error(error);
            toast({
                variant: "destructive",
                description: "Failed to delete post. Please try again."
            })
        },
    })
    return mutation;
}