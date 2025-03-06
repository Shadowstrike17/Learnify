import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { TextEditor } from "@/components/TextEditor";
import { NotesSummary } from "@/components/NotesSummary";
import { FlashcardGenerator } from "@/components/FlashcardGenerator";
import { QuestionGenerator } from "@/components/QuestionGenerator";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Menu,
  BrainCircuit,
  Layers,
  FileQuestion,
  Plus,
  ChevronLeft,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CHEMISTRY_CATALYST_CONTENT = `
Using a Catalyst and the Rate of a Reaction

7.4 Mechanism of reaction and catalysis

Earlier it was mentioned that it is the collision of particles that causes reactions to occur and that only some of these collisions are successful. This is because the reactant particles have a wide range of kinetic energy, and only a small fraction of the particles will have enough energy to actually break bonds so that a chemical reaction can take place. The minimum energy that is needed for a reaction to take place is called the activation energy.

Remember that a molecule must have energy greater than the activation energy, as well as the correct orientation, for the reaction to take place.

An exothermic reaction can be represented by:

Reactants → Products + Energy  i.e. a reaction that releases energy
`;

const NotesViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState("notes");
  const [noteContent, setNoteContent] = useState(CHEMISTRY_CATALYST_CONTENT);
  const [highlightedText, setHighlightedText] = useState<{
    text: string;
    type: string;
  }[]>([
    { text: "reactions to occur", type: "blue" },
    { text: "activation energy", type: "blue" },
  ]);

  useEffect(() => {
    setShowSidebar(!isMobile);
  }, [isMobile]);

  const handleShare = () => {
    toast({
      title: "Link copied to clipboard",
      description: "Share this link with your study group",
      duration: 2000,
    });
  };

  const handleFormatText = (format: string, selection?: string) => {
    if (format === "highlight") {
      const text = selection || window.getSelection()?.toString() || "";
      if (text) {
        setHighlightedText([...highlightedText, { text, type: "blue" }]);
      }
    }
  };

  const renderHighlightedContent = (content: string) => {
    let highlightedContent = content;
    
    highlightedText.forEach(({ text, type }) => {
      const highlightClass = type === "blue" ? "highlight" : "highlight-" + type;
      highlightedContent = highlightedContent.replace(
        new RegExp(text, "g"),
        `<span class="${highlightClass}">${text}</span>`
      );
    });

    return { __html: highlightedContent };
  };

  return (
    <div className="min-h-screen bg-white flex">
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold">Using a Catalyst and the Rate of a Reaction</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline-block">Share</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 py-6 px-4 md:px-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="ai">AI Summary</TabsTrigger>
                  <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                  <TabsTrigger value="questions">Practice Questions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="notes" className="mt-6">
                  <div className="bg-white rounded-xl shadow-sm">
                    <div className="mb-4 sticky top-16 z-10 bg-white pt-2 pb-2">
                      <TextEditor onFormatText={handleFormatText} />
                    </div>
                    
                    <div className="space-y-6 px-6 pb-6">
                      <h1 className="text-3xl font-bold">Using a Catalyst and the Rate of a Reaction</h1>
                      
                      <div>
                        <h2 className="text-lg text-app-blue font-medium">7.4 Mechanism of reaction and catalysis</h2>
                      </div>
                      
                      <div 
                        className="note-content text-gray-800 leading-relaxed" 
                        dangerouslySetInnerHTML={renderHighlightedContent(`
                          Earlier it was mentioned that it is the collision of particles that causes reactions to occur and that only some of these collisions are successful. This is because the reactant particles have a wide range of kinetic energy, and only a small fraction of the particles will have enough energy to actually break bonds so that a chemical reaction can take place. The minimum energy that is needed for a reaction to take place is called the activation energy.
                        `)}
                      />
                      
                      <div className="important-note border-l-4 border-app-blue p-4 bg-app-blue-light my-6">
                        <p>Remember that a molecule must have energy greater than the activation energy, as well as the correct orientation, for the reaction to take place.</p>
                      </div>
                      
                      <div className="text-blue-500 font-medium">
                        An exothermic reaction can be represented by:
                      </div>
                      
                      <div className="important-note border-l-4 border-app-blue p-4 bg-app-blue-light my-6">
                        <p>Reactants → Products + Energy  i.e. a reaction that releases energy</p>
                      </div>
                      
                      <div>
                        <img 
                          src="https://ib.bioninja.com.au/_Media/activation-energy_med.jpeg" 
                          alt="Activation energy diagram" 
                          className="rounded-lg max-w-full h-auto my-4"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="ai" className="mt-6">
                  <NotesSummary noteContent={noteContent} />
                </TabsContent>
                
                <TabsContent value="flashcards" className="mt-6">
                  <FlashcardGenerator />
                </TabsContent>
                
                <TabsContent value="questions" className="mt-6">
                  <QuestionGenerator />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NotesViewer;
