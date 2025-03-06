import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrainCircuit, BookOpen, Search, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NotesSummary = ({ noteContent }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summary");

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summaryText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "summary-catalyst-reaction.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Summary downloaded",
      description: "Your notes summary has been downloaded",
      duration: 2000,
    });
  };

  const summaryText = `
Summary: Chemical Reaction Catalysts and Activation Energy

Key Points:
1. Activation Energy: The minimum energy required for a chemical reaction to occur. Only particles with enough energy can break bonds and initiate reactions.

2. Catalysts: Substances that increase reaction rates by providing an alternative pathway with lower activation energy. Catalysts are not consumed in the reaction.

3. Reaction Mechanism: The collision of particles causes reactions, but only collisions with sufficient energy and correct orientation are successful.

4. Exothermic Reactions: These reactions release energy (usually as heat) and can be represented as: Reactants → Products + Energy
  `;

  const keyTerms = [
    { term: "Activation Energy", definition: "The minimum energy that is needed for a reaction to take place" },
    { term: "Catalyst", definition: "A substance that increases the rate of a chemical reaction without being consumed" },
    { term: "Exothermic Reaction", definition: "A reaction that releases energy to its surroundings" },
    { term: "Reaction Rate", definition: "The speed at which reactants are converted to products in a chemical reaction" },
    { term: "Orientation", definition: "The spatial arrangement of reactant molecules during collision" },
    { term: "Kinetic Energy", definition: "The energy possessed by particles due to their motion" },
  ];

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-app-blue" />
          <span>AI Summary</span>
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => handleCopy(summaryText)}
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="keyterms">Key Terms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-4">
          <Card className="p-6 bg-white">
            <div className="space-y-4">
              <h3 className="font-medium text-lg text-gray-800">
                Chemical Reaction Catalysts and Activation Energy
              </h3>
              
              <h4 className="font-medium text-gray-700">Key Points:</h4>
              <ul className="space-y-2 pl-6 list-disc">
                <li className="text-gray-700">
                  <span className="font-medium">Activation Energy:</span> The minimum energy required for a chemical reaction to occur. Only particles with enough energy can break bonds and initiate reactions.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Catalysts:</span> Substances that increase reaction rates by providing an alternative pathway with lower activation energy. Catalysts are not consumed in the reaction.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Reaction Mechanism:</span> The collision of particles causes reactions, but only collisions with sufficient energy and correct orientation are successful.
                </li>
                <li className="text-gray-700">
                  <span className="font-medium">Exothermic Reactions:</span> These reactions release energy (usually as heat) and can be represented as: Reactants → Products + Energy
                </li>
              </ul>
              
              <div className="important-note">
                <p className="font-medium">Remember:</p>
                <p>A molecule must have energy greater than the activation energy, as well as the correct orientation, for the reaction to take place.</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="keyterms" className="mt-4">
          <Card className="p-6 bg-white">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-app-blue focus:border-app-blue text-sm"
                  placeholder="Search key terms..."
                />
              </div>
              
              <div className="divide-y">
                {keyTerms.map((item, index) => (
                  <div key={index} className="py-3">
                    <dt className="font-medium text-gray-800">{item.term}</dt>
                    <dd className="mt-1 text-gray-600">{item.definition}</dd>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
