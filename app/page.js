// import { Button } from "@/@/components/ui/button";

// import { UserButton } from "@clerk/nextjs";
// import Image from "next/image";

// export default function Home() {
//   return (
//   <div>
//     <h2>Hello world!</h2>
//     <Button>hello world </Button>
//     <UserButton/>
//   </div>
//     );
// }
'use client';
import RotatingCube from "./workspace/_components/RotatingCube/RotatingCube";
import { PricingTable, useUser } from '@clerk/nextjs'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Brain, Sparkles, Target, Users, BookOpen, TrendingUp, Search, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic";
import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const RobotModel = dynamic(() => import("./workspace/_components/Robot/RobotModel"), {
  ssr: false, // ⛔ disable SSR (three.js must run in browser)
});

export default function LandingPage() {
  //  const { isSignedIn } = useUser();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background text-foreground">


      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              {/* <Brain className="h-8 w-8 text-accent" />
              <span className="text-xl font-bold text-foreground">LearnAI</span> */}
              <Image src={'/logo.svg'} alt="logo" width={130} height={120} />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              {/* <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link> */}
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
            </nav>
            {/* 
           <div className="flex items-center gap-3">
          <Link href="/sign-in">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>

          <Link href="/sign-up">
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
              Sign up
            </Button>
          </Link>

          <UserButton afterSignOutUrl="/" />
        </div> */}
            {/* 👇 Conditional: show login/signup if NOT signed in, else show UserButton */}
            <div className="flex items-center gap-3">
              {!isSignedIn ? (
                <>
                  <Link href="/sign-in">
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                      Sign up
                    </Button>
                  </Link>
                </>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>

          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 ">


        {/* Right Cube */}
        <div className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-0">
          <RotatingCube />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Powered by Advanced AI Technology</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
              The smartest way to learn anything online
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
              Experience personalized AI-powered learning that adapts to your pace, style, and goals. Master new skills
              faster with intelligent tutoring.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* <Link href="/workspace">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                Start learning free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              </Link> */}
              {/* <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
                onClick={() => {
                  if (!isLoaded) return;  // ✅ wait for Clerk to initialize

                  if (isSignedIn) {
                    window.location.href = "/workspace";
                  } else {
                    window.location.href = "/sign-in";
                  }
                }}
              >
                Start learning free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button> */}
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8"
                onClick={() => {
                  if (!isLoaded) return;  // ✅ wait for Clerk

                  if (isSignedIn) {
                    router.push("/workspace");  // ✅ FIXED
                  } else {
                    router.push("/sign-in");    // ✅ FIXED
                  }
                }}
              >
                Start learning free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>


              {/* <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                View courses
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      {/* <section className="py-12 border-y border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground mb-8">Trusted by learners at</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-foreground">Stanford</div>
            <div className="text-2xl font-bold text-foreground">MIT</div>
            <div className="text-2xl font-bold text-foreground">Harvard</div>
            <div className="text-2xl font-bold text-foreground">Berkeley</div>
            <div className="text-2xl font-bold text-foreground">Oxford</div>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              AI-Powered Learning Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our platform uses cutting-edge AI to create a personalized learning experience that helps you achieve your
              goals faster.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <Brain className="h-50 w-50 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">AI-Driven Course Creation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Empower admins to generate structured course outlines and content instantly using Gemini AI, ensuring engaging and personalized learning material.
              </p>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Adaptive Learning Paths</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI analyzes your progress and adjusts course difficulty in real-time to optimize your learning journey.
              </p> */}
            </Card>

            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <Target className="h-50 w-50 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Smart Video Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatically fetch relevant educational videos via YouTube API to complement each course chapter for enhanced visual learning.
              </p>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Personalized Tutoring</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant answers and explanations tailored to your learning style and current knowledge level.
              </p> */}
            </Card>

            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <TrendingUp className="h-50 w-50 text-violet-500" />
              </div>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Progress Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Track your improvement with detailed insights and AI-powered recommendations for better results.
              </p> */}
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Personalized Learning Experience</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI recommends courses, tracks progress, and adapts learning paths based on individual performance and preferences.
              </p>
            </Card>

            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <BookOpen className="h-50 w-50 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamless and safe login/signup powered by Clerk ensures protected user access and smooth onboarding.
              </p>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Smart Content Generation</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI creates custom practice problems and quizzes based on your weak areas to accelerate mastery.
              </p> */}
            </Card>

            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <Users className="h-50 w-50 text-violet-500" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Real-Time Progress Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Monitor completed chapters and learning milestones with intuitive dashboards and visual progress indicators.
              </p>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Collaborative Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect with peers at similar skill levels and learn together with AI-facilitated study groups.
              </p> */}
            </Card>

            <Card className="p-6 bg-card border-border hover:border-accent/50 transition-colors">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                <Search className="h-50 w-50 text-violet-500" />
              </div>
              {/* <h3 className="text-xl font-semibold text-card-foreground mb-2">Intelligent Search</h3>
              <p className="text-muted-foreground leading-relaxed">
                Find exactly what you need with semantic search that understands context and learning objectives.
              </p> */}
              <h3 className="text-xl font-semibold text-card-foreground mb-2">Subscription & Premium Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Integrated Stripe payments for unlocking premium content, providing flexible and scalable learning access options.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-24 bg-secondary/30 border-y border-border"> */}
      {/* <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">2M+</div>
              <div className="text-muted-foreground">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">95%</div>
              <div className="text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">10K+</div>
              <div className="text-muted-foreground">AI-Powered Courses</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div> */}
      {/* Left Cube */}
      {/* Robot on left */}
      {/* <div className="flex justify-center items-center w-full h-[400px]">
  <div className="w-[200px] h-[200px]">
    <RobotModel scale={5} />
  </div>
</div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-accent/10 border-accent/20 p-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
              Start your learning journey today
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join millions of learners using AI to master new skills. Get started with a free account and experience
              the future of education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
                Get started free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 border-border text-foreground hover:bg-secondary bg-transparent"
              >
                Schedule a demo
              </Button>
            </div>
          </Card>
        </div>
      </section> */}

      {/* pricing section */}
      <section id="pricing" className="py-24">
        <div className="container mx-auto px-6 py-12">
          <h2 className="font-bold text-3xl mb-5">Select Plan</h2>

          <PricingTable
            for="user"
            ctaPosition="bottom"
            collapseFeatures={false}
            newSubscriptionRedirectUrl="/dashboard" // redirect after payment
            appearance={{
              // 🎨 Styles for the pricing table itself
              elements: {
                card: {
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",
                  padding: "24px",
                },
                buttonPrimary: {
                  backgroundColor: "#2563eb", // Tailwind blue-600
                  color: "#ffffff",
                  fontWeight: "600",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  transition: "all 0.3s ease",
                  ":hover": {
                    backgroundColor: "#1d4ed8", // darker blue
                  },
                },
                buttonSecondary: {
                  backgroundColor: "#f3f4f6",
                  color: "#111827",
                  borderRadius: "8px",
                },
                headerTitle: {
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#111827",
                },
                headerSubtitle: {
                  color: "#6b7280",
                },
              },
            }}
            checkoutProps={{
              appearance: {
                elements: {
                  buttonPrimary: {
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    borderRadius: "8px",
                    ":hover": { backgroundColor: "#1d4ed8" },
                  },
                },
              },
            }}
          />
        </div>


      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                {/* <Brain className="h-6 w-6 text-accent" />
                <span className="text-lg font-bold text-foreground">LearnAI</span> */}
                <Image src={'/logo.svg'} alt="logo" width={130} height={120} />
              </div>
              <p className="text-sm text-muted-foreground">AI-powered learning platform for the modern learner.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Hexsmith. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

