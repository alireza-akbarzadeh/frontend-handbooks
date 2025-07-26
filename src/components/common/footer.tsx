import { Code2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">FrontendPro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering developers to build the future of web experiences.
            </p>
          </div>
          {/* other columns stay the same */}
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FrontendPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
