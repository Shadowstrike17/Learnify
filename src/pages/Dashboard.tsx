import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  Menu,
  Plus,
  User2,
  FileQuestion,
  ListChecks,
  Clock,
} from "lucide-react";
import { FlashcardGenerator } from "@/components/FlashcardGenerator";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState("recentNotes");

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  const handleNoteClick = (id: string) => {
    navigate(`/notes/${id}`);
  };

  return (
    <div className="min-h-screen bg-app-blue/5 flex">
      {showSidebar && (
        <Sidebar
          onClose={() => setShowSidebar(false)}
          isMobile={isMobile}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 shadow-sm px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!showSidebar && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setShowSidebar(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => navigate("/")}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline-block">New</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                icon={<BookOpen className="h-5 w-5 text-emerald-500" />}
                title="Study Materials"
                value="12"
                trend="+3 this week"
                trendUp={true}
              />
              <DashboardCard
                icon={<FileQuestion className="h-5 w-5 text-purple-500" />}
                title="Practice Questions"
                value="48"
                trend="+15 generated"
                trendUp={true}
              />
              <DashboardCard
                icon={<Clock className="h-5 w-5 text-amber-500" />}
                title="Study Time"
                value="8.5 hrs"
                trend="this week"
                trendUp={true}
              />
            </div>

            <div className="flex items-center border-b border-gray-200 mb-6">
              <TabButton 
                isActive={activeTab === "recentNotes"} 
                onClick={() => setActiveTab("recentNotes")}
              >
                Recent Notes
              </TabButton>
              <TabButton 
                isActive={activeTab === "flashcards"} 
                onClick={() => setActiveTab("flashcards")}
              >
                Flashcards
              </TabButton>
              <TabButton 
                isActive={activeTab === "questions"} 
                onClick={() => setActiveTab("questions")}
              >
                Practice Questions
              </TabButton>
            </div>

            {activeTab === "recentNotes" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StudyCard
                  title="Using a Catalyst and the Rate of a Reaction"
                  subject="Chemistry"
                  lastEdited="2 days ago"
                  progress={85}
                  onClick={() => handleNoteClick("chemistry-catalyst")}
                />
                <StudyCard
                  title="Mechanics: Forces and Motion"
                  subject="Physics"
                  lastEdited="1 week ago"
                  progress={62}
                  onClick={() => handleNoteClick("mechanics")}
                />
                <StudyCard
                  title="Cellular Systems and Functions"
                  subject="Biology"
                  lastEdited="3 days ago"
                  progress={45}
                  onClick={() => handleNoteClick("cellular")}
                />
                <StudyCard
                  title="Introduction to Organic Chemistry"
                  subject="Chemistry"
                  lastEdited="5 days ago"
                  progress={30}
                  onClick={() => handleNoteClick("organic-chemistry")}
                />
                <StudyCard
                  title="Waves and Optics"
                  subject="Physics"
                  lastEdited="2 weeks ago"
                  progress={20}
                  onClick={() => handleNoteClick("waves")}
                />
                <StudyCard
                  title="Cell Division and Reproduction"
                  subject="Biology"
                  lastEdited="1 month ago"
                  progress={15}
                  onClick={() => handleNoteClick("cell-division")}
                />
              </div>
            )}

            {activeTab === "flashcards" && <FlashcardGenerator />}
            {activeTab === "questions" && <QuestionGenerator />}
          </div>
        </main>
      </div>
    </div>
  );
};

const TabButton = ({ isActive, onClick, children }) => (
  <button
    className={cn(
      "px-4 py-2 font-medium text-sm transition-all duration-200 border-b-2",
      isActive
        ? "text-app-blue-dark border-app-blue"
        : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

const DashboardCard = ({ icon, title, value, trend, trendUp = true }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
      <span
        className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
          trendUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        )}
      >
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

const StudyCard = ({ title, subject, lastEdited, progress, onClick }) => (
  <div
    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100"
    onClick={onClick}
  >
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="h-5 w-5 text-app-blue" />
        <span className="text-xs font-medium bg-app-blue-light text-app-blue-dark px-2 py-0.5 rounded-full">
          {subject}
        </span>
      </div>
      <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">Last edited {lastEdited}</p>
      
      <div className="mt-4 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-700">{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-app-blue rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;
