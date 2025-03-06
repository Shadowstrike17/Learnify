import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Bold, Italic, Underline, Heading1, List, ListOrdered, 
  HighlighterIcon, Pencil, Save, BookText, Heading2,
  AlignLeft, AlignCenter, AlignRight, Quote, Link, Image
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TextEditorProps {
  onChange?: (value: string) => void;
  onFormatText?: (format: string, selection?: string) => void;
  initialContent?: string;
}

export const TextEditor = ({ onChange, onFormatText, initialContent = "" }: TextEditorProps) => {
  const [activeButtons, setActiveButtons] = useState({
    bold: false,
    italic: false,
    underline: false,
    heading: false,
    highlight: false,
    align: "left"
  });
  
  const [noteContent, setNoteContent] = useState(initialContent);
  const [notesTitle, setNotesTitle] = useState("Untitled Note");
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; title: string; content: string }>>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load saved notes from localStorage
    const savedNotesData = localStorage.getItem('studyNotes');
    if (savedNotesData) {
      setSavedNotes(JSON.parse(savedNotesData));
    }
  }, []);

  const handleButtonClick = (type: string) => {
    if (type.startsWith('align')) {
      setActiveButtons(prev => ({
        ...prev,
        align: type.replace('align', '').toLowerCase()
      }));
    } else {
      setActiveButtons((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));
    }
    
    // Apply the formatting to current selection
    if (editorRef.current) {
      const selection = window.getSelection();
      
      if (selection && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
        
        let formattedText = selectedText;
        let wrapper: HTMLElement | null = null;
        
        switch (type) {
          case "bold":
            wrapper = document.createElement('strong');
            break;
          case "italic":
            wrapper = document.createElement('em');
            break;
          case "underline":
            wrapper = document.createElement('u');
            break;
          case "heading":
            wrapper = document.createElement('h3');
            wrapper.className = 'text-xl font-semibold my-3';
            break;
          case "heading2":
            wrapper = document.createElement('h4');
            wrapper.className = 'text-lg font-medium my-2 text-app-blue-dark';
            break;
          case "highlight":
            wrapper = document.createElement('span');
            wrapper.className = 'highlight';
            break;
          case "quote":
            wrapper = document.createElement('blockquote');
            wrapper.className = 'border-l-4 border-app-blue pl-4 italic my-4 text-gray-600';
            break;
          case "alignLeft":
            wrapper = document.createElement('div');
            wrapper.className = 'text-left';
            break;
          case "alignCenter":
            wrapper = document.createElement('div');
            wrapper.className = 'text-center';
            break;
          case "alignRight":
            wrapper = document.createElement('div');
            wrapper.className = 'text-right';
            break;
          case "list":
            // Create an unordered list with the selected text
            const ul = document.createElement('ul');
            ul.className = 'list-disc pl-5 my-3';
            const li = document.createElement('li');
            li.textContent = selectedText;
            ul.appendChild(li);
            
            range.deleteContents();
            range.insertNode(ul);
            selection.removeAllRanges();
            return;
          case "orderedList":
            // Create an ordered list with the selected text
            const ol = document.createElement('ol');
            ol.className = 'list-decimal pl-5 my-3';
            const liOl = document.createElement('li');
            liOl.textContent = selectedText;
            ol.appendChild(liOl);
            
            range.deleteContents();
            range.insertNode(ol);
            selection.removeAllRanges();
            return;
        }
        
        if (wrapper) {
          range.deleteContents();
          wrapper.appendChild(document.createTextNode(selectedText));
          range.insertNode(wrapper);
          selection.removeAllRanges();
        }
      }
      
      // Update content state
      if (editorRef.current) {
        setNoteContent(editorRef.current.innerHTML);
        if (onChange) {
          onChange(editorRef.current.innerHTML);
        }
      }
    }
  };

  const saveNote = () => {
    if (editorRef.current && editorRef.current.innerHTML.trim() !== "") {
      const newNote = {
        id: Date.now().toString(),
        title: notesTitle,
        content: editorRef.current.innerHTML
      };
      
      const updatedNotes = [...savedNotes, newNote];
      setSavedNotes(updatedNotes);
      
      // Save to localStorage
      localStorage.setItem('studyNotes', JSON.stringify(updatedNotes));
      
      // Clear the editor
      setNotesTitle("Untitled Note");
      editorRef.current.innerHTML = "";
      setNoteContent("");
    }
  };

  const loadNote = (note: { id: string; title: string; content: string }) => {
    setNotesTitle(note.title);
    setNoteContent(note.content);
    if (editorRef.current) {
      editorRef.current.innerHTML = note.content;
    }
  };

  return (
    <Tabs defaultValue="editor" className="w-full">
      <TabsList className="mb-4 bg-gray-100">
        <TabsTrigger value="editor" className="flex items-center gap-2 data-[state=active]:bg-white">
          <Pencil className="h-4 w-4" /> Editor
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex items-center gap-2 data-[state=active]:bg-white">
          <BookText className="h-4 w-4" /> Saved Notes
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="editor" className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={notesTitle}
              onChange={(e) => setNotesTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-app-blue focus:border-transparent text-lg font-semibold"
              placeholder="Enter note title"
            />
            <Button onClick={saveNote} className="bg-app-blue hover:bg-app-blue-dark">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </div>
          
          <div className="bg-white rounded-md shadow-sm border border-gray-200 flex flex-wrap items-center p-2 editor-toolbar gap-1">
            <div className="flex items-center mr-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md", 
                  activeButtons.bold ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("bold")}
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md", 
                  activeButtons.italic ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("italic")}
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md", 
                  activeButtons.underline ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("underline")}
                title="Underline"
              >
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-8 border-l border-gray-200 mx-1" />
            
            <div className="flex items-center mr-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md", 
                  activeButtons.heading ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("heading")}
                title="Heading 1"
              >
                <Heading1 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md"
                )}
                onClick={() => handleButtonClick("heading2")}
                title="Heading 2"
              >
                <Heading2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md", 
                  activeButtons.highlight ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("highlight")}
                title="Highlight"
              >
                <HighlighterIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 min-w-9 h-9 rounded-md"
                onClick={() => handleButtonClick("quote")}
                title="Quote"
              >
                <Quote className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-8 border-l border-gray-200 mx-1" />
            
            <div className="flex items-center mr-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-1 min-w-9 h-9 rounded-md"
                onClick={() => handleButtonClick("list")}
                title="Bullet List"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 min-w-9 h-9 rounded-md"
                onClick={() => handleButtonClick("orderedList")}
                title="Numbered List"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-8 border-l border-gray-200 mx-1" />
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md",
                  activeButtons.align === "left" ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("alignLeft")}
                title="Align Left"
              >
                <AlignLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md",
                  activeButtons.align === "center" ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("alignCenter")}
                title="Align Center"
              >
                <AlignCenter className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "p-1 min-w-9 h-9 rounded-md",
                  activeButtons.align === "right" ? "bg-app-blue-light text-app-blue-dark" : ""
                )}
                onClick={() => handleButtonClick("alignRight")}
                title="Align Right"
              >
                <AlignRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div 
            ref={editorRef}
            className="w-full min-h-[500px] p-6 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-app-blue focus:border-transparent note-content shadow-sm"
            contentEditable={true}
            dangerouslySetInnerHTML={{ __html: noteContent }}
            onInput={(e) => {
              setNoteContent((e.target as HTMLDivElement).innerHTML);
              if (onChange) {
                onChange((e.target as HTMLDivElement).innerHTML);
              }
            }}
            data-placeholder="Start typing your notes here..."
          />
        </div>
      </TabsContent>
      
      <TabsContent value="saved">
        {savedNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {savedNotes.map((note) => (
              <Card 
                key={note.id} 
                className="p-4 hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                onClick={() => loadNote(note)}
              >
                <h3 className="font-semibold mb-2 text-gray-800 text-lg">{note.title}</h3>
                <div className="text-gray-500 text-sm h-20 overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: note.content.substring(0, 150) + '...' }} />
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
                  {new Date(parseInt(note.id)).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <BookText className="h-10 w-10 mx-auto mb-3 text-gray-400" />
            <p className="text-lg font-medium mb-2">No saved notes yet</p>
            <p>Create and save some notes to see them here.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
