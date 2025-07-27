import { Button } from '../components/ui/button';
import {
  Card,
  Carddocs,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  ArrowRight,
  Code2,
  Palette,
  Smartphone,
  Zap,
  Users,
  Trophy,
  Star,
  Play,
  CheckCircle,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <>
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-teal-500/20 text-teal-300 border-teal-500/30">
              🚀 Master Modern Frontend Development
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build the
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {' '}
                Future{' '}
              </span>
              of Web
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Master React, TypeScript, Next.js, and modern CSS frameworks
              through hands-on projects. Join thousands of developers building
              exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                data-cy="start-journey-button"
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-lg px-8 py-6"
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>50K+ Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Industry Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="py-16 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Master the Modern Stack
            </h2>
            <p className="text-gray-400">
              Learn the technologies that power today's best web applications
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', color: 'from-blue-400 to-blue-600' },
              { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
              { name: 'Next.js', color: 'from-gray-700 to-gray-900' },
              { name: 'Tailwind', color: 'from-teal-400 to-teal-600' },
              { name: 'Astro', color: 'from-orange-400 to-orange-600' },
              { name: 'Vite', color: 'from-purple-400 to-purple-600' },
            ].map((tech, index) => (
              <div key={index} className="group cursor-pointer">
                <div
                  className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-center text-gray-300 font-medium">
                  {tech.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose FrontendPro?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience learning like never before with our cutting-edge
              platform designed for modern developers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 className="w-8 h-8" />,
                title: 'Interactive Code Editor',
                description:
                  'Write, test, and deploy code directly in your browser with our advanced IDE',
                gradient: 'from-purple-500 to-purple-700',
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'Real-time Feedback',
                description:
                  'Get instant feedback on your code with AI-powered suggestions and corrections',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Design Systems',
                description:
                  'Learn to build scalable design systems and component libraries',
                gradient: 'from-pink-500 to-rose-500',
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: 'Responsive Design',
                description:
                  'Master mobile-first development and progressive web app techniques',
                gradient: 'from-green-500 to-emerald-500',
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'Community Driven',
                description:
                  'Join a vibrant community of developers sharing knowledge and projects',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: 'Industry Certification',
                description:
                  'Earn recognized certificates that boost your career prospects',
                gradient: 'from-indigo-500 to-purple-500',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-xl">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <Carddocs>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </Carddocs>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section
        id="courses"
        className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Learning Paths
            </h2>
            <p className="text-xl text-gray-400">
              Structured curricula designed by industry experts
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'React Mastery',
                description:
                  'From basics to advanced patterns, hooks, and state management',
                lessons: 45,
                duration: '12 weeks',
                level: 'Beginner to Advanced',
                image: '/placeholder.svg?height=200&width=300',
              },
              {
                title: 'TypeScript Pro',
                description:
                  'Type-safe development with advanced TypeScript techniques',
                lessons: 32,
                duration: '8 weeks',
                level: 'Intermediate',
                image: '/placeholder.svg?height=200&width=300',
              },
              {
                title: 'Modern CSS & Design',
                description:
                  'CSS Grid, Flexbox, animations, and design systems',
                lessons: 38,
                duration: '10 weeks',
                level: 'All Levels',
                image: '/placeholder.svg?height=200&width=300',
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative">
                  <img
                    src={course.image || '/placeholder.svg'}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-purple-500/80 text-white">
                      {course.level}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-xl">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <Carddocs>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Start Learning
                  </Button>
                </Carddocs>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Active Students' },
              { number: '200+', label: 'Expert Instructors' },
              { number: '95%', label: 'Job Placement Rate' },
              { number: '4.9/5', label: 'Student Rating' },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've accelerated their careers with
              FrontendPro. Start your journey today with our comprehensive
              learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-12 py-6"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 text-lg px-12 py-6 bg-transparent"
              >
                View Pricing
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
