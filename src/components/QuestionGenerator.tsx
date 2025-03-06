import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BrainCircuit, BarChart, CheckCheck, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

export const QuestionGenerator = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState("chemistry");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  
  const subjects = {
    chemistry: {
      title: "Chemistry Quiz",
      description: "Test your knowledge on chemical reactions and catalysts",
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "What effect does a catalyst have on a chemical reaction?",
          options: [
            { value: "a", label: "It increases the activation energy" },
            { value: "b", label: "It is consumed during the reaction" },
            { value: "c", label: "It lowers the activation energy" },
            { value: "d", label: "It changes the products formed" }
          ],
          correctAnswer: "c"
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "Which of the following describes an exothermic reaction?",
          options: [
            { value: "a", label: "A reaction that absorbs energy from its surroundings" },
            { value: "b", label: "A reaction that releases energy to its surroundings" },
            { value: "c", label: "A reaction with no energy change" },
            { value: "d", label: "A reaction that requires continuous energy input" }
          ],
          correctAnswer: "b"
        },
        {
          id: "q3",
          type: "multiple-choice",
          question: "What is activation energy?",
          options: [
            { value: "a", label: "The energy released at the end of a reaction" },
            { value: "b", label: "The minimum energy particles need to react" },
            { value: "c", label: "The energy difference between reactants and products" },
            { value: "d", label: "The energy stored in chemical bonds" }
          ],
          correctAnswer: "b"
        },
        {
          id: "q4",
          type: "multiple-choice",
          question: "Which factor does NOT typically increase the rate of a chemical reaction?",
          options: [
            { value: "a", label: "Increasing the temperature" },
            { value: "b", label: "Decreasing the concentration of reactants" },
            { value: "c", label: "Adding a catalyst" },
            { value: "d", label: "Increasing the surface area of solid reactants" }
          ],
          correctAnswer: "b"
        }
      ]
    },
    physics: {
      title: "Physics Quiz",
      description: "Test your knowledge on mechanics and forces",
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "Which of Newton's Laws states that for every action, there is an equal and opposite reaction?",
          options: [
            { value: "a", label: "First Law" },
            { value: "b", label: "Second Law" },
            { value: "c", label: "Third Law" },
            { value: "d", label: "Fourth Law" }
          ],
          correctAnswer: "c"
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "What is the formula for calculating force?",
          options: [
            { value: "a", label: "F = ma" },
            { value: "b", label: "F = mv" },
            { value: "c", label: "F = mg" },
            { value: "d", label: "F = m/a" }
          ],
          correctAnswer: "a"
        }
      ]
    },
    biology: {
      title: "Biology Quiz",
      description: "Test your knowledge on cellular systems",
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          question: "Which organelle is known as the 'powerhouse of the cell'?",
          options: [
            { value: "a", label: "Nucleus" },
            { value: "b", label: "Mitochondria" },
            { value: "c", label: "Golgi apparatus" },
            { value: "d", label: "Endoplasmic reticulum" }
          ],
          correctAnswer: "b"
        },
        {
          id: "q2",
          type: "multiple-choice",
          question: "What is the process by which cells divide?",
          options: [
            { value: "a", label: "Photosynthesis" },
            { value: "b", label: "Respiration" },
            { value: "c", label: "Mitosis" },
            { value: "d", label: "Osmosis" }
          ],
          correctAnswer: "c"
        }
      ]
    }
  };

  const currentSubject = subjects[selectedSubject];
  const currentQuestion = currentSubject.questions[currentQuestionIndex];
  
  const handleAnswerSelect = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentSubject.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
  };

  const handleGenerateNew = () => {
    toast({
      title: "Generating new questions",
      description: "Creating practice questions from your study materials...",
      duration: 2000,
    });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    currentSubject.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: currentSubject.questions.length,
      percentage: Math.round((correct / currentSubject.questions.length) * 100)
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-app-blue" />
          <span>Practice Questions</span>
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleGenerateNew}
            className="gap-2 bg-app-blue hover:bg-app-blue-dark"
          >
            <BrainCircuit className="h-4 w-4" />
            <span>Generate New</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(subjects).map((subject) => (
          <Button
            key={subject}
            variant={selectedSubject === subject ? "default" : "outline"}
            size="sm"
            onClick={() => handleSubjectChange(subject)}
            className={selectedSubject === subject ? "bg-app-blue hover:bg-app-blue-dark" : ""}
          >
            {subject.charAt(0).toUpperCase() + subject.slice(1)}
          </Button>
        ))}
      </div>

      {!showResults ? (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-lg">{currentSubject.title}</h3>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {currentSubject.questions.length}
            </span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-lg font-medium">{currentQuestion.question}</p>
              
              <div className="mt-4">
                <RadioGroup
                  value={answers[currentQuestion.id] || ""}
                  onValueChange={handleAnswerSelect}
                >
                  <div className="space-y-3">
                    {currentQuestion.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`${currentQuestion.id}-${option.value}`}
                        />
                        <Label 
                          htmlFor={`${currentQuestion.id}-${option.value}`}
                          className="text-base cursor-pointer"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                variant="default"
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion.id]}
                className="bg-app-blue hover:bg-app-blue-dark"
              >
                {currentQuestionIndex === currentSubject.questions.length - 1
                  ? "Finish"
                  : "Next"
                }
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Quiz Results</h3>
            <p className="text-gray-500">{currentSubject.title}</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-app-blue mb-2">
                {getScore().correct}/{getScore().total}
              </div>
              <p className="text-gray-500">
                You scored {getScore().percentage}%
              </p>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Score</span>
                <span>{getScore().percentage}%</span>
              </div>
              <Progress value={getScore().percentage} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <h4 className="font-medium">Question Review</h4>
            {currentSubject.questions.map((question, index) => (
              <div key={question.id} className="p-4 rounded-lg border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className={`h-6 w-6 flex items-center justify-center rounded-full ${
                    answers[question.id] === question.correctAnswer 
                      ? "bg-green-100 text-green-600" 
                      : "bg-red-100 text-red-600"
                  }`}>
                    {answers[question.id] === question.correctAnswer 
                      ? "✓" 
                      : "✗"}
                  </div>
                  <div>
                    <p className="font-medium">Question {index + 1}: {question.question}</p>
                    <p className="text-sm mt-1">
                      <span className="text-gray-500">Your answer: </span>
                      {question.options.find(o => o.value === answers[question.id])?.label || "Not answered"}
                    </p>
                    {answers[question.id] !== question.correctAnswer && (
                      <p className="text-sm mt-1 text-green-600">
                        Correct answer: {question.options.find(o => o.value === question.correctAnswer)?.label}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Try Again
            </Button>
            <Button
              variant="default"
              onClick={handleGenerateNew}
              className="bg-app-blue hover:bg-app-blue-dark"
            >
              Generate New Questions
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
