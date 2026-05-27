import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
  <div className='flex items-center justify-center h-screen'>
  <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/workspace"/>
  </div>
  )
}
// "use client";
// import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center h-screen">
      
//       {/* Show Sign In only if user is signed-out */}
//       <SignedOut>
//         <SignIn
//           path="/sign-in"
//           routing="path"
//           signUpUrl="/sign-up"
//           afterSignInUrl="/workspace"
//         />
//       </SignedOut>

//       {/* If user is already signed in, Clerk normally redirects,
//           but this prevents the development warning */}
//       <SignedIn>
//         <UserButton />
//       </SignedIn>

//     </div>
//   );
// }
