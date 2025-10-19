"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { CheckCircle2, BookOpen, Target, Lightbulb, ListTodo, ArrowRight, Github } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: ListTodo,
      title: "Task Management",
      description:
        "Add, remove, and update tasks effortlessly. Keep track of everything you need to accomplish with a clean, intuitive interface.",
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      icon: CheckCircle2,
      title: "Daily Checklist",
      description:
        "Create customized daily checklists to stay focused on your goals. Mark items as complete and build consistent habits.",
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      icon: BookOpen,
      title: "Journal Writing",
      description:
        "Express yourself with markdown-based journal entries. Capture your thoughts, ideas, and reflections in a beautiful editor.",
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      icon: Lightbulb,
      title: "Daily Summary",
      description:
        "Document what you learned and achieved each day. Build a personal knowledge base of your growth and progress.",
      color: "from-amber-500/20 to-amber-600/20",
    },
    {
      icon: Target,
      title: "Purpose of Study",
      description:
        "Define your why and keep it visible. Remind yourself of your goals and stay motivated throughout your journey.",
      color: "from-rose-500/20 to-rose-600/20",
    },
  ]

  const steps = [
    {
      step: "01",
      title: "Set Your Purpose",
      description:
        "Start by defining your purpose of study. This becomes your north star, reminding you why you're on this journey.",
    },
    {
      step: "02",
      title: "Plan Your Day",
      description:
        "Create a customized daily checklist with specific goals. Break down your objectives into manageable tasks.",
    },
    {
      step: "03",
      title: "Track & Execute",
      description:
        "Manage your tasks throughout the day. Add, update, or remove tasks as your priorities evolve.",
    },
    {
      step: "04",
      title: "Reflect & Learn",
      description:
        "Journal your thoughts and write daily summaries. Document what you learned and what you achieved.",
    },
  ];

  return (
    <div className="w-full mx-auto min-h-screen bg-background text-foreground">
      <nav className="sticky w-full top-0 bg-background/80 backdrop-blur-md border-b z-50">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Progress Path</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
            <span className="text-sm font-medium text-emerald-400">
              Your Personal Growth Companion
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight text-balance">
            Master Your Goals with{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-primary bg-clip-text text-transparent">
              Progress Path
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            A comprehensive productivity app designed for students and learners.
            Manage tasks, track daily progress, journal your thoughts, and stay
            connected to your purpose.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to organize your life, track your progress,
              and achieve your goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-emerald-500/50 bg-background/50 backdrop-blur-sm overflow-hidden w-full max-w-sm"
                >
                  <div className={`h-1 bg-gradient-to-r ${feature.color}`} />
                  <div className="p-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">How It Works</h2>

          <div className="space-y-8">
            {steps.map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-600/20 border border-emerald-500/30">
                    <span className="text-lg font-bold text-emerald-400">
                      {item.step}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600/10 to-emerald-500/10 border-y border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and learners who are already using
            Progress Path to achieve their goals.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 gap-2"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a
                href="https://github.com/amitbhagat358"
                className="flex gap-1 items-center hover:text-foreground transition"
              >
                <GitHubLogoIcon/>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/amitbhagat358/"
                className="flex gap-1 items-center hover:text-foreground transition"
              >
                <LinkedInLogoIcon/>
                LinkedIn
              </a>
            </div>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <span>
                Made with ❤️ by
                <Link
                  href="https://linkedin.com/in/amitbhagat358"
                  className="text-foreground hover:text-primary font-bold underline-primary transition"
                >
                  {" "}
                  Amit Bhagat
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
