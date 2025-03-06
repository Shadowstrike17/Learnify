import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TextEditor } from "@/components/TextEditor";
import { Menu, Save, Share2, ChevronDown, BrainCircuit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { NotesSummary } from "@/components/NotesSummary";
import { FlashcardGenerator } from "@/components/FlashcardGenerator";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotesEditor = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const { toast } = useToast();
  const [savedStatus, setSavedStatus] = useState("");
  const [currentTab, setCurrentTab] = useState("editor");
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("Using a Catalyst and the Rate of a Reaction");
  const [subjectInfo, setSubjectInfo] = useState("7.4 Mechanism of reaction and catalysis");
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Add CSS for highlights
    const style = document.createElement('style');
    style.innerHTML = `
      .highlight {
        background-color: rgba(120, 170, 255, 0.2);
        padding: 0 2px;
        border-radius: 2px;
      }
      .note-content blockquote {
        border-left: 4px solid #3b82f6;
        padding-left: 1rem;
        font-style: italic;
        margin: 1rem 0;
        color: #4b5563;
      }
      .note-content h3 {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0.75rem 0;
      }
      .note-content h4 {
        font-size: 1.125rem;
        font-weight: 500;
        margin: 0.5rem 0;
        color: #1e3a8a;
      }
      .note-content [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #9ca3af;
        font-style: italic;
      }
      .important-note {
        background-color: #f8fafc;
        border-left: 4px solid #3b82f6;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 0.25rem;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const handleSaveNote = () => {
    setSavedStatus("Saved");
    toast({
      title: "Note Saved",
      description: "Your note has been saved successfully!",
      duration: 3000,
    });
  };
  
  const handleShareNote = () => {
    toast({
      title: "Share Link Created",
      description: "A shareable link has been copied to your clipboard.",
      duration: 3000,
    });
  };

  const handleNoteContentChange = (content) => {
    setNoteContent(content);
    setSavedStatus("Unsaved changes");
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
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{noteTitle}</h1>
                  {savedStatus && (
                    <span className="text-sm text-gray-500">({savedStatus})</span>
                  )}
                </div>
                <div className="flex items-center text-sm text-app-blue">
                  <span>{subjectInfo}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleShareNote}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline-block">Share</span>
              </Button>
              
              <Button
                size="sm"
                className="gap-1 bg-app-blue hover:bg-app-blue-dark"
                onClick={handleSaveNote}
              >
                <Save className="h-4 w-4" />
                <span className="hidden sm:inline-block">Save</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6 px-4 md:px-8 overflow-y-auto bg-white">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="editor" value={currentTab} onValueChange={setCurrentTab}>
              <TabsList className="mb-4 bg-gray-100">
                <TabsTrigger value="editor" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Save className="h-4 w-4" /> Editor
                </TabsTrigger>
                <TabsTrigger value="ai-summary" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <BrainCircuit className="h-4 w-4" /> AI Summary
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Save className="h-4 w-4" /> Flashcards
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="editor">
                <TextEditor initialContent={noteContent} onChange={handleNoteContentChange} />
              </TabsContent>
              
              <TabsContent value="ai-summary">
                <NotesSummary noteContent={noteContent} />
              </TabsContent>
              
              <TabsContent value="flashcards">
                <FlashcardGenerator />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesEditor;
