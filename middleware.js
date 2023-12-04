// export {default} from "next-auth/middleware"
import {withAuth} from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
      console.log(req.nextauth)
      const {pathname, origin} = req.nextUrl
      const {token} = req.nextauth
    //   console.log({pathname, origin, token})

        if(pathname.startsWith("/dashboard") && token?.user?.role !== "admin") {
            // return NextResponse.redirect(origin)
            return NextResponse.redirect("You are not authorized!, Get Lost!!!")
        }
    },
    {
      callbacks: {
        authorized: ({ token }) => token?.role === "admin",
      },
    }
  )

export const config = {
    matcher: ["/profile/:path*", "/protected/:path*","/dashboard/:path*"]
}

