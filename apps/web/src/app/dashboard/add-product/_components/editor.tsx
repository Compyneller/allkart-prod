import React, { useRef, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialValue?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  initialValue = "",
  onChange,
  placeholder = "Start writing...",
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      // Initialize Quill
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder,
        readOnly,
      });

      // Set initial content
      if (initialValue) {
        quillRef.current.root.innerHTML = initialValue;
      }

      // Listen for text changes
      quillRef.current.on("text-change", () => {
        if (quillRef.current && onChange) {
          const html = quillRef.current.root.innerHTML;
          onChange(html);
        }
      });
    }

    // Cleanup
    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;
      }
    };
  }, []);

  // Update readOnly state
  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.enable(!readOnly);
    }
  }, [readOnly]);

  return (
    <div className="border rounded-2xl">
      <div className="border-none" ref={editorRef} />
    </div>
  );
};

export default QuillEditor;
