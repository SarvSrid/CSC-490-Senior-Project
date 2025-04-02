import {NextRequest, NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
    console.log("Middleware triggered:", req.nextUrl.pathname);
    console.log("Incoming cookies:", req.cookies.getAll());
    const sessionCookie = req.cookies.get('session')?.value; // Use Flask's session cookie name

    // Forward cookies to Flask's validation endpoint
    const res = await fetch('http://localhost:5000/auth/validate', {
        headers: {
            // Include the client's cookies in the request to Flask
            Cookie: `session=${sessionCookie}`,
        },
    });

    if (res.status === 401) {
        return NextResponse.redirect('http://localhost:3000/auth/signin');
    }

    // Allow access if the user is authenticated
    return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
    matcher: ['/user/:path*'], // List of routes requiring authentication
};