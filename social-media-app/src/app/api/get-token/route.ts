import { validateRequest } from "@/auth";
import streamServerClient from "@/lib/stream";


export async function GET() {
    try {
        const { user } = await validateRequest();

        console.log("Calling get-token for user: ", user?.id);

        if(!user) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour

        //const issuedAt = Math.floor(Date.now() / 1000); // phát hành trước 1 phút - khác phục tình trạng thời gian của server và client khác nhau

        const token = streamServerClient.createToken(
            user.id,
            expirationTime
        );

        return Response.json({ token });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal server error" }, { status: 500 })
    }
}