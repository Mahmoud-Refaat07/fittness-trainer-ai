import TerminalOverlay from "@/components/TerminalOverlay";
import { Button } from "@/components/ui/button";
import UserPrograms from "@/components/UserPrograms";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden">
      {/* HERO Section */}
      <section className="relative z-10 py-24 grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            {/* Corners Decorations */}
            <div className="absolute -top-10 left-0 w-40 h-40 border-l-2 border-t-2 border-orange-600/20"></div>
            <div className="absolute -bottom-10 left-0 w-24 h-24 border-l-2 border-b-2 border-orange-600/10"></div>

            {/* LEFT SIDE CONTENT */}
            <div className="lg:col-span-7 space-y-8 relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-600/30 bg-orange-600/5 text-orange-400 text-xs font-mono uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                AI-Powered Fitness
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                <div>
                  <span className="text-foreground">Transform</span>
                </div>
                <div>
                  <span className="text-orange-500">Your Body</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">With Advanced</span>
                </div>
                <div className="pt-2">
                  <span className="text-foreground">AI</span>
                  <span className="text-orange-500"> Technology</span>
                </div>
              </h1>

              {/* Separator */}
              <div className="h-px w-2/3 bg-linear-to-r from-orange-600/80 via-orange-400/40 to-transparent"></div>

              <p className="text-lg text-gray-400 w-2/3 leading-relaxed">
                Talk to our AI assistant and get personalized diet plans and
                workout routines designed just for you.
              </p>

              {/* STATS */}
              <div className="md:flex  items-center gap-10 py-4 font-mono text-center">
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold text-orange-500">500+</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">
                    Active Users
                  </div>
                </div>
                <div className="h-10 w-px bg-linear-to-b from-transparent via-orange-600/50 to-transparent"></div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold text-orange-500">3min</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">
                    Generation
                  </div>
                </div>
                <div className="h-10 w-px bg-linear-to-b from-transparent via-orange-600/50 to-transparent"></div>
                <div className="flex flex-col gap-1">
                  <div className="text-2xl font-bold text-orange-500">100%</div>
                  <div className="text-xs uppercase tracking-widest text-gray-500">
                    Personalized
                  </div>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="md:flex items-center gap-4 text-center">
                <Button
                  size="lg"
                  asChild
                  className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-6 text-base font-semibold font-mono transition-all duration-200 shadow-lg shadow-orange-900/30"
                >
                  <Link
                    href="/generate-program"
                    className="flex items-center gap-2"
                  >
                    Build Your Program
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-gray-400 hover:text-orange-400 hover:bg-orange-600/10 px-6 py-6 font-mono text-base transition-all duration-200"
                >
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
            </div>
            {/* RIGHT SIDE CONTENT */}
            <div className="lg:col-span-5 relative">
              {/* Corner Decorations */}
              <div className="absolute -inset-4 pointer-events-none">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-600/10"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-orange-600/10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-orange-600/10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-600/10"></div>
              </div>
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative overflow-hidden rounded-lg bg-cyber-black">
                  <img
                    src="/hero-ai3.png"
                    alt="ai-fittnes-coach"
                    className="size-full object-cover object-center"
                  />
                  {/* SCAN LINE WITH OVERLAY*/}
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_calc(50%-1px),rgba(255,120,30,0.6)_50%,transparent_calc(50%+1px),transparent_100%)] bg-[length:100%_8px] animate-scanline pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {/* TERMINAL OVERLAY */}
                  <TerminalOverlay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES Section */}
      <UserPrograms />
    </div>
  );
};

export default page;
