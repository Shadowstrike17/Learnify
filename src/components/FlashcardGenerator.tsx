import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, ChevronLeft, ChevronRight, Shuffle, Plus, Trash } from "lucide-react";

export const FlashcardGenerator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("chemistry");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const chemistryCards = [
    {
      question: "What is activation energy?",
      answer: "The minimum energy that is needed for a reaction to take place. Reactant particles need enough energy to actually break bonds so that a chemical reaction can occur."
    },
    {
      question: "How does a catalyst affect a chemical reaction?",
      answer: "A catalyst lowers the activation energy required for a reaction, increasing the rate of reaction without being consumed in the process."
    },
    {
      question: "What is an exothermic reaction?",
      answer: "A reaction that releases energy to the surroundings, usually in the form of heat. The products have less energy than the reactants."
    },
    {
      question: "What factors affect the rate of reaction?",
      answer: "Temperature, concentration, pressure (for gases), surface area, catalysts, and light."
    }
  ];
  
  const physicsCards = [
    {
      question: "Define Newton's First Law of Motion",
      answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force."
    },
    {
      question: "What is the formula for calculating kinetic energy?",
      answer: "KE = ½mv², where m is mass and v is velocity."
    }
  ];
  
  const biologyCards = [
    {
      question: "What is cellular respiration?",
      answer: "The process by which cells break down glucose and other molecules to generate ATP, releasing energy for cellular processes."
    },
    {
      question: "Describe the structure of DNA",
      answer: "DNA is a double helix structure composed of two strands of nucleotides. Each nucleotide contains a sugar (deoxyribose), a phosphate group, and a nitrogenous base (A, T, G, or C)."
    }
  ];

  const cardsMap = {
    chemistry: chemistryCards,
    physics: physicsCards,
    biology: biologyCards
  };

  const handleNextCard = () => {
    const cards = cardsMap[activeTab];
    setShowAnswer(false);
    setActiveCardIndex((prevIndex) => 
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousCard = () => {
    const cards = cardsMap[activeTab];
    setShowAnswer(false);
    setActiveCardIndex((prevIndex) => 
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleShuffleCards = () => {
    setShowAnswer(false);
    setActiveCardIndex(0);
    toast({
      title: "Cards shuffled",
      description: "Your flashcards have been randomized",
      duration: 2000,
    });
  };

  const generateNewFlashcards = () => {
    toast({
      title: "Generating new flashcards",
      description: "Creating flashcards from your study materials...",
      duration: 2000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-app-blue" />
          <span>Flashcards</span>
        </h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="gap-2"
            onClick={handleShuffleCards}
          >
            <Shuffle className="h-4 w-4" />
            <span>Shuffle</span>
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="gap-2 bg-app-blue hover:bg-app-blue-dark"
            onClick={generateNewFlashcards}
          >
            <Plus className="h-4 w-4" />
            <span>Generate</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chemistry" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
          <TabsTrigger value="physics">Physics</TabsTrigger>
          <TabsTrigger value="biology">Biology</TabsTrigger>
        </TabsList>
        
        {Object.entries(cardsMap).map(([subject, cards]) => (
          <TabsContent key={subject} value={subject} className="focus-visible:outline-none focus-visible:ring-0">
            <div className="relative min-h-[300px]">
              <div className="flex justify-center my-6">
                <div className="text-sm text-gray-500">
                  Card {activeCardIndex + 1} of {cards.length}
                </div>
              </div>
              
              <div 
                className="max-w-xl mx-auto cursor-pointer perspective-1000"
                onClick={() => setShowAnswer(!showAnswer)}
              >
                <div 
                  className={cn(
                    "relative transition-transform duration-500 transform-style-3d",
                    showAnswer ? "rotate-y-180" : ""
                  )}
                  style={{ 
                    transformStyle: "preserve-3d",
                    minHeight: "300px" 
                  }}
                >
                  {/* Front side (Question) */}
                  <div 
                    className={cn(
                      "absolute w-full h-full backface-hidden p-8 rounded-xl shadow-md bg-white border border-gray-100 flex flex-col justify-center",
                      showAnswer && "hidden"
                    )}
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <h3 className="text-gray-500 text-sm font-medium mb-2">Question:</h3>
                    <p className="text-xl font-medium text-center">
                      {cards[activeCardIndex].question}
                    </p>
                    <div className="mt-6 text-center text-sm text-gray-400">
                      Click to reveal answer
                    </div>
                  </div>
                  
                  {/* Back side (Answer) */}
                  <div 
                    className={cn(
                      "absolute w-full h-full backface-hidden p-8 rounded-xl shadow-md bg-app-blue-light border border-app-blue/20 flex flex-col justify-center",
                      !showAnswer && "hidden"
                    )}
                    style={{ 
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"  
                    }}
                  >
                    <h3 className="text-app-blue-dark text-sm font-medium mb-2">Answer:</h3>
                    <p className="text-gray-800">
                      {cards[activeCardIndex].answer}
                    </p>
                    <div className="mt-6 text-center text-sm text-gray-500">
                      Click to see question
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center gap-6 mt-8">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handlePreviousCard}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={handleNextCard}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
