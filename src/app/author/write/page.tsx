"use client";

import Collaboration from "@tiptap/extension-collaboration";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
  Italic,
  LinkIcon,
  List,
  Redo,
  Save,
  Underline,
  Send,
  Undo,
  Users,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getYDoc } from "@/lib/collaboration";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";

const { ydoc, provider } = getYDoc();

// // Initialize Yjs
// const ydoc = new Y.Doc();
// const provider = new WebrtcProvider("book-editor-demo", ydoc, {
//   signaling: ["ws://localhost:4444"], // Your local signaling server
// });

const awareness = provider.awareness;

export default function Component() {
  const [activeUsers, setActiveUsers] = useState([
    { name: "John Smith", role: "Author", color: "#ff0000" },
    { name: "Sarah Wilson", role: "Reviewer", color: "#00ff00" },
  ]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Collaboration.configure({ document: ydoc }),
      LinkExtension,
      LinkExtension,
      ImageExtension,
    ],
  });

  //   const editor = useEditor({
  //     extensions: [
  //       StarterKit,
  //       Collaboration.configure({
  //         document: ydoc,
  //       }),
  //       CollaborationCursor.configure({
  //         provider: awareness,
  //         user: {
  //           name: "Author Name",
  //           color: "#ff0000",
  //         },
  //       }),
  //     ],
  //     content: "",
  //     editorProps: {
  //       attributes: {
  //         class:
  //           "prose prose-invert max-w-none min-h-[500px] p-4 focus:outline-none",
  //       },
  //     },
  //   });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8">
          <Input
            className="mb-4 text-3xl font-bold bg-transparent border-none text-white placeholder:text-gray-400"
            placeholder="Enter your book title..."
          />
          <div className="flex items-center gap-4">
            <Select defaultValue="chapter1">
              <SelectTrigger className="w-[200px] bg-gray-900">
                <SelectValue placeholder="Select chapter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="chapter1">Chapter 1</SelectItem>
                <SelectItem value="chapter2">Chapter 2</SelectItem>
                <SelectItem value="chapter3">Chapter 3</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="text-sm text-gray-400">
                Active collaborators:
              </span>
              <TooltipProvider>
                <div className="flex items-center gap-1">
                  {activeUsers.map((user, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger>
                        <Badge
                          variant="outline"
                          className="ml-2"
                          style={{ borderColor: user.color }}
                        >
                          {user.name}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user.role}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 p-2">
            <div className="flex flex-wrap items-center gap-2">
              <TooltipProvider>
                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                        className={
                          editor?.isActive("bold") ? "bg-gray-800" : ""
                        }
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                        className={
                          editor?.isActive("italic") ? "bg-gray-800" : ""
                        }
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                        className={
                          editor?.isActive("underline") ? "bg-gray-800" : ""
                        }
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Underline</TooltipContent>
                  </Tooltip>
                </div>

                <div className="h-6 w-px bg-gray-800" />

                <Select defaultValue="normal">
                  <SelectTrigger className="w-[130px] bg-gray-900">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="heading1">Heading 1</SelectItem>
                    <SelectItem value="heading2">Heading 2</SelectItem>
                    <SelectItem value="heading3">Heading 3</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="16">
                  <SelectTrigger className="w-[80px] bg-gray-900">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>

                <div className="h-6 w-px bg-gray-800" />

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          editor?.chain().focus().toggleBulletList().run()
                        }
                        className={
                          editor?.isActive("bulletList") ? "bg-gray-800" : ""
                        }
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bullet List</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Left</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Center</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Right</TooltipContent>
                  </Tooltip>
                </div>

                <div className="h-6 w-px bg-gray-800" />

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Image</TooltipContent>
                  </Tooltip>
                </div>

                <div className="h-6 w-px bg-gray-800" />

                <div className="flex items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.chain().focus().undo().run()}
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Undo</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => editor?.chain().focus().redo().run()}
                      >
                        <Redo className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Redo</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>

          <EditorContent editor={editor} className="min-h-[600px]" />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" className="w-40">
            <Save className="mr-2 h-4 w-4" />
            Save as draft
          </Button>
          <Button className="w-40 bg-pink-500 hover:bg-pink-600">
            <Send className="mr-2 h-4 w-4" />
            Publish Manuscript
          </Button>
        </div>
      </main>
    </div>
  );
}
