import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Book,
  BookOpen,
  ChevronDown,
  ClipboardList,
  FilePlus,
  FileText,
  Folders,
  LayoutDashboard,
  Settings,
  Star,
  Trash,
  Upload,
  X,
  Plus,
  Pencil,
  File,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SidebarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar = ({ onClose, isMobile = false }: SidebarProps) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([
    { id: "chemistry", name: "Chemistry", isActive: true },
    { id: "physics", name: "Physics", isActive: false },
    { id: "biology", name: "Biology", isActive: false },
  ]);

  const [recentNotes, setRecentNotes] = useState([
    { id: "mechanics", name: "Mechanics Notes" },
    { id: "physics-review", name: "Physics" },
    { id: "cellular", name: "Cellular Systems" },
  ]);

  const toggleSubject = (id: string) => {
    setSubjects(
      subjects.map((subject) => ({
        ...subject,
        isActive: subject.id === id ? !subject.isActive : subject.isActive,
      }))
    );
  };

  const handleUpload = (files: File[]) => {
    console.log("Files to upload:", files);
    // Here you would process the files, perhaps with an API call
    // For now we'll just log them and close the dialog
  };

  const handleNewNote = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={cn(
        "h-screen flex flex-col bg-white border-r border-gray-200 w-[260px] transition-all duration-300 overflow-hidden",
        isMobile && "fixed z-50"
      )}
    >
      {isMobile && (
        <div className="flex justify-end p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <Avatar className="h-10 w-10">
          <AvatarImage src="" />
          <AvatarFallback className="bg-yellow-300 text-yellow-800">N</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">Nathan</span>
          <span className="text-xs text-gray-500">San Lucas High School</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-2 py-4">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive"
              )
            }
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/notes/new"
            className={({ isActive }) =>
              cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive"
              )
            }
            onClick={(e) => {
              e.preventDefault();
              handleNewNote();
            }}
          >
            <Pencil className="h-5 w-5" />
            <span>New Note</span>
          </NavLink>
        </nav>

        <div>
          <div className="section-header">SUBJECTS</div>
          <div className="space-y-1 px-2">
            {subjects.map((subject) => (
              <SubjectItem
                key={subject.id}
                subject={subject}
                onToggle={toggleSubject}
              />
            ))}
            <button className="flex items-center text-gray-500 hover:text-gray-700 px-4 py-2 text-sm gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        <div>
          <div className="section-header">RECENTS</div>
          <div className="space-y-1 px-2">
            {recentNotes.map((note) => (
              <NavLink
                key={note.id}
                to={`/notes/${note.id}`}
                className={({ isActive }) =>
                  cn(
                    "sidebar-item",
                    isActive ? "sidebar-item-active" : "sidebar-item-inactive"
                  )
                }
              >
                <FileText className="h-5 w-5" />
                <span>{note.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        <div>
          <div className="section-header">EXTRAS</div>
          <div className="space-y-1 px-2">
            <button className="sidebar-item sidebar-item-inactive">
              <ClipboardList className="h-5 w-5" />
              <span>Reports</span>
            </button>
            <button className="sidebar-item sidebar-item-inactive">
              <Star className="h-5 w-5" />
              <span>Assignments</span>
            </button>
            <button className="sidebar-item sidebar-item-inactive">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full flex items-center gap-2 bg-app-blue"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Study Materials</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload Study Materials</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <FileUploader onUpload={handleUpload} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const SubjectItem = ({ subject, onToggle }) => {
  return (
    <button
      className={cn(
        "sidebar-item w-full",
        subject.isActive
          ? "sidebar-item-active"
          : "sidebar-item-inactive"
      )}
      onClick={() => onToggle(subject.id)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <Book className="h-5 w-5" />
          <span>{subject.name}</span>
        </div>
        {subject.id === "chemistry" && (
          <X className="h-4 w-4 text-gray-400" />
        )}
      </div>
    </button>
  );
};
