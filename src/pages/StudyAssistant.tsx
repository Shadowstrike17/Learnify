import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { NotesSummary } from "@/components/NotesSummary";
import { FlashcardGenerator } from "@/components/FlashcardGenerator";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { Menu, Upload, Brain, BookText, HelpCircle, Lightbulb } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { FileUploader } from "@/components/FileUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const StudyAssistant = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [currentTab, setCurrentTab] = useState("summary");
  const [studyMaterial, setStudyMaterial] = useState({ type: "chemistry", content: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = (files: File[]) => {
    if (files.length > 0) {
      setIsLoading(true);
      
      // Simulate file processing
      setTimeout(() => {
        setIsLoading(false);
        setStudyMaterial({
          type: "chemistry",
          content: "Chemical Reaction Catalysts and Activation Energy"
        });
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
              <h1 className="text-xl font-semibold">AI Study Assistant</h1>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="gap-2 bg-app-blue hover:bg-app-blue-dark"
                >
                  <Upload className="h-4 w-4" />
                  <span>Upload Study Material</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Upload Study Materials</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <FileUploader onUpload={handleUpload} isLoading={isLoading} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="flex-1 py-6 px-4 md:px-8 overflow-y-auto bg-white">
          <div className="max-w-5xl mx-auto">
            {studyMaterial.content ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {studyMaterial.content}
                  </h2>
                  <p className="text-gray-500">
                    AI has analyzed your study material and generated the following resources.
                  </p>
                </div>
                
                <Tabs defaultValue="summary" value={currentTab} onValueChange={setCurrentTab}>
                  <TabsList className="mb-6">
                    <TabsTrigger value="summary" className="flex items-center gap-1">
                      <Brain className="h-4 w-4" /> Summary
                    </TabsTrigger>
                    <TabsTrigger value="flashcards" className="flex items-center gap-1">
                      <BookText className="h-4 w-4" /> Flashcards
                    </TabsTrigger>
                    <TabsTrigger value="questions" className="flex items-center gap-1">
                      <HelpCircle className="h-4 w-4" /> Practice Questions
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="summary">
                    <NotesSummary noteContent={studyMaterial.content} />
                  </TabsContent>
                  
                  <TabsContent value="flashcards">
                    <FlashcardGenerator />
                  </TabsContent>
                  
                  <TabsContent value="questions">
                    <QuestionGenerator />
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <Lightbulb className="h-16 w-16 mx-auto text-app-blue opacity-80" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Get started with AI Study Assistant</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                  Upload your study materials (notes, textbooks, or lecture recordings) and our AI will generate summaries, flashcards, and practice questions to help you study more efficiently.
                </p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="gap-2 bg-app-blue hover:bg-app-blue-dark"
                    >
                      <Upload className="h-5 w-5" />
                      <span>Upload Study Material</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Upload Study Materials</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <FileUploader onUpload={handleUpload} isLoading={isLoading} />
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="grid md:grid-cols-3 gap-6 mt-16">
                  <Card className="p-6 text-center">
                    <Brain className="h-10 w-10 mx-auto mb-4 text-app-blue" />
                    <h3 className="font-semibold mb-2">AI-Powered Summaries</h3>
                    <p className="text-gray-600 text-sm">
                      Extract key concepts and important details from your study materials.
                    </p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <BookText className="h-10 w-10 mx-auto mb-4 text-app-blue" />
                    <h3 className="font-semibold mb-2">Smart Flashcards</h3>
                    <p className="text-gray-600 text-sm">
                      Generate flashcards for effective spaced repetition learning.
                    </p>
                  </Card>
                  
                  <Card className="p-6 text-center">
                    <HelpCircle className="h-10 w-10 mx-auto mb-4 text-app-blue" />
                    <h3 className="font-semibold mb-2">Practice Questions</h3>
                    <p className="text-gray-600 text-sm">
                      Test your knowledge with AI-generated questions and answers.
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudyAssistant;
