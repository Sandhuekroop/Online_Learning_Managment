// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)',
//   '/sign-up(.*)'
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/',              // ✅ Make homepage public
//   '/sign-in(.*)',   // ✅ Sign-in page
//   '/sign-up(.*)',   // ✅ Sign-up page
//   '/pricing(.*)',   // (optional) if you want pricing public
//   // ✅ MAKE USER CREATION PUBLIC
//   '/api/user(.*)',
//    '/api/courses(.*)', 
//    '/api/enroll-course(.*)', 
// ])

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect()
//   }
// })

// export const config = {
//   matcher: [

//     // Skip Next.js internals and static files
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)', // Always run for API routes
//   ],
// }

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',              
  '/sign-in(.*)',   
  '/sign-up(.*)',   
  '/pricing(.*)',   

  // ✅ Public API routes
  '/api/user(.*)',
  '/api/chat(.*)',
  // '/api/courses(.*)',
  // '/api/enroll-course(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
     auth.protect();
  }
});

export const config = {
  matcher: [
    // ✅ Match everything except static files
    "/((?!_next|.*\\..*).*)",
  ],
};
