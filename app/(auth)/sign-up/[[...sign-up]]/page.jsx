import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
 <div className='flex items-center justify-center h-screen'>
  <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignInUrl="/workspace"/>
  </div>
)
}
// "use client";
// import { SignUp, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// export default function Page() {
//   return (
//     <div className="flex items-center justify-center h-screen">
      
//       {/* Show Sign Up only if user is signed-out */}
//       <SignedOut>
//         <SignUp
//           path="/sign-up"
//           routing="path"
//           signInUrl="/sign-in"
//           afterSignUpUrl="/workspace"
//         />
//       </SignedOut>

//       {/* If user is already signed in, prevent warning */}
//       <SignedIn>
//         <UserButton />
//       </SignedIn>

//     </div>
//   );
// }
