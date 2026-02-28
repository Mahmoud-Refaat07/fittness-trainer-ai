import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  Dumbbell,
  Sparkles,
  Users,
  Clock,
  AppleIcon,
  ShieldIcon,
} from "lucide-react";
import { USER_PROGRAMS } from "../app/constants/index";

const UserPrograms = () => {
  return (
    <div className="w-full pb-24 pt-16 relative">
      <div className="container mx-auto max-w-6xl px-4">
        {/* HEADER - PROGRAM GALLERY */}
        <div className="bg-black/60 backdrop-blur-sm border border-orange-600/20 rounded-lg overflow-hidden mb-16">
          {/* HEADER BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-orange-600/20 bg-black/40">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-sm text-orange-400 font-medium tracking-widest uppercase">
                Program Gallery
              </span>
            </div>
            <div className="text-sm text-gray-600 font-mono">
              Featured Plans
            </div>
          </div>

          {/* HEADER CONTENT */}
          <div className="p-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">AI-Generated </span>
              <span className="text-orange-500">Programs</span>
            </h2>

            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Explore personalized fitness plans our AI assistant has created
              for other users
            </p>

            {/* STATS */}
            <div className="sm:flex items-center justify-center gap-16 mt-10 font-mono">
              <div className="flex flex-col items-center gap-1">
                <p className="text-3xl font-bold text-orange-500">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Programs
                </p>
              </div>
              <div className="w-px h-12 bg-linear-to-b from-transparent via-orange-600/50 to-transparent"></div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-3xl font-bold text-orange-500">3min</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Creation Time
                </p>
              </div>
              <div className="w-px h-12 bg-linear-to-b from-transparent via-orange-600/50 to-transparent"></div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-3xl font-bold text-orange-500">100%</p>
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  Personalized
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRAM CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_PROGRAMS.map((program) => (
            <Card
              key={program.id}
              className="bg-black/60 backdrop-blur-sm border border-orange-600/20 hover:border-orange-500/50 transition-all duration-200 overflow-hidden"
            >
              {/* Card top bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-orange-600/20 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-orange-400 font-mono">
                    USER.{program.id}
                  </span>
                </div>
                <div className="text-xs text-gray-600 font-mono tracking-widest">
                  {program.fitness_level.toUpperCase()}
                </div>
              </div>

              <CardHeader className="pt-6 px-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border border-orange-600/30">
                    <img
                      src={program.profilePic}
                      alt={`${program.first_name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">
                      {program.first_name}
                      <span className="text-orange-500">.exe</span>
                    </CardTitle>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Users className="h-4 w-4" />
                      {program.age}y • {program.workout_days}d/week
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4">
                  <div className="px-3 py-1 bg-orange-600/10 rounded border border-orange-600/25 text-sm text-orange-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    {program.fitness_goal}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-2 font-mono">
                    <Clock className="h-4 w-4" />
                    v3.5
                  </div>
                </div>
              </CardHeader>

              <CardContent className="px-5">
                <div className="space-y-5 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-600/10 text-orange-500 mt-0.5 border border-orange-600/20">
                      <Dumbbell className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {program.workout_plan.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {program.equipment_access}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-600/10 text-orange-400 mt-0.5 border border-orange-600/20">
                      <AppleIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        {program.diet_plan.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        System optimized nutrition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-orange-600/10 text-orange-400 mt-0.5 border border-orange-600/20">
                      <ShieldIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-white">
                        AI Safety Protocols
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Protection systems enabled
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program description */}
                <div className="mt-5 pt-5 border-t border-orange-600/15">
                  <div className="text-sm text-gray-500 font-mono">
                    <span className="text-orange-500 mr-1">&gt;</span>
                    {program.workout_plan.description.substring(0, 120)}...
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4 border-t border-orange-600/15">
                <Link href={`/programs/${program.id}`} className="w-full">
                  <Button className="w-full bg-orange-600 hover:bg-orange-500 text-white transition-all duration-200">
                    View Program Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 text-center">
          <Link href="/generate-program">
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-6 text-lg font-mono transition-all duration-200 shadow-lg shadow-orange-900/30"
            >
              Generate Your Program
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-gray-500 mt-4 text-sm">
            Join 500+ users with AI-customized fitness programs
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPrograms;
