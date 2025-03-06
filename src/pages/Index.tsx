import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  FileAudio,
  FilePieChart,
  Upload,
  Search,
  Share2,
  BrainCog,
  CheckCircle,
  BookMarked,
  CalendarCheck
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = () => {
    // For demo, navigate to dashboard after brief loading state
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleDemoClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-app-blue to-blue-500">
      <div className="container px-4 py-16 animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">
              Learnify
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your AI-powered study assistant that helps summarize notes, 
              generate flashcards, and create practice questions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl backdrop-blur-sm p-8 mb-16 animate-slide-in">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Start studying smarter
                </h2>
                <p className="text-gray-600 mb-6">
                  Upload your lecture notes, PDF materials, or audio recordings and 
                  let our AI assistant transform them into effective study materials.
                </p>
                <div className="space-y-6">
                  <FileUploader onUpload={handleUpload} isLoading={isLoading} />
                  <div className="text-center">
                    <span className="text-gray-500 text-sm">or</span>
                  </div>
                  <Button 
                    onClick={handleDemoClick}
                    className="w-full bg-app-blue hover:bg-app-blue-dark text-white"
                  >
                    Try Demo Materials
                  </Button>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <FeatureCard 
                    icon={<FileText className="text-app-blue" />}
                    title="Text & PDFs"
                    description="Upload notes and documents"
                  />
                  <FeatureCard 
                    icon={<FileAudio className="text-app-blue" />}
                    title="Audio"
                    description="Convert lectures to notes"
                  />
                  <FeatureCard 
                    icon={<BrainCircuit className="text-app-blue" />}
                    title="AI Summaries"
                    description="Extract key concepts"
                  />
                  <FeatureCard 
                    icon={<FilePieChart className="text-app-blue" />}
                    title="Flashcards"
                    description="Auto-generate study cards"
                  />
                  <FeatureCard 
                    icon={<BrainCog className="text-app-blue" />}
                    title="Practice Questions"
                    description="Test your knowledge"
                  />
                  <FeatureCard 
                    icon={<Share2 className="text-app-blue" />}
                    title="Collaboration"
                    description="Study with peers"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <TestimonialCard 
              quote="Learnify helped me improve my grades by 15% in just one semester!"
              name="Alex Thompson"
              role="High School Senior"
              icon={<CheckCircle className="text-green-500" />}
            />
            <TestimonialCard 
              quote="The AI summaries saved me hours of study time. Absolutely game-changing."
              name="Mia Johnson"
              role="College Freshman"
              icon={<BookMarked className="text-app-blue" />}
            />
            <TestimonialCard 
              quote="The practice questions feature helped me prepare perfectly for my exams."
              name="David Chen"
              role="Graduate Student"
              icon={<CalendarCheck className="text-purple-500" />}
            />
          </div>

          <div className="text-center text-white/80 text-sm">
            <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 transition-all duration-300 hover:shadow-md hover:scale-105">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-app-blue/10 rounded-full">
        {icon}
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </div>
);

const TestimonialCard = ({ quote, name, role, icon }) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/30">
    <div className="flex items-center gap-2 mb-4">
      {icon}
      <div className="h-1 w-6 bg-gray-200 rounded-full"></div>
    </div>
    <p className="text-gray-700 mb-4 italic">"{quote}"</p>
    <div>
      <p className="font-medium text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  </div>
);

export default Index;
