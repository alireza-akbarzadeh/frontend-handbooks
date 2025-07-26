import {Button, buttonVariants} from '@/components/ui/button';
import { Code2 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FrontendPro</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/courses"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Courses
            </a>
            <a
              href="/docs"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Docs
              </a>
            <a
              href="/features"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="/pricing"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
                href="/login"
              className={buttonVariants({className:"border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white bg-transparent",variant: "outline"})}
            >
              LogIn
            </a>
            <Button
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
              Start Learning
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
