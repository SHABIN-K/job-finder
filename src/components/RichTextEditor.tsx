"use client";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
  SetStateAction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { EditorProps } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface RichTextEditorProps extends EditorProps {
  initialValue?: string;
}

const RichTextEditor = forwardRef<Object, RichTextEditorProps>(
  function RichTextEditor({ initialValue, onChange, ...props }, ref) {
    const [editorState, setEditorState] = useState(() => {
      if (initialValue) {
        try {
          const contentState = convertFromRaw(JSON.parse(initialValue));
          return EditorState.createWithContent(contentState);
        } catch (error) {
          console.error("Failed to parse initialValue JSON", error);
          return EditorState.createEmpty();
        }
      } else {
        return EditorState.createEmpty();
      }
    });

    useImperativeHandle(ref, () => ({
      getEditorState: () => editorState,
      setEditorState: (state: SetStateAction<EditorState>) =>
        setEditorState(state),
    }));

    return (
      <Editor
        editorState={editorState}
        onEditorStateChange={(state) => {
          setEditorState(state);
          onChange?.(convertToRaw(state.getCurrentContent())); // Propagate changes as RawDraftContentState
        }}
        editorClassName={cn(
          "border rounded-md px-3 min-h-[150px] cursor-text ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          props.editorClassName,
        )}
        toolbar={{
          options: ["inline", "list", "link", "history"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
        toolbarClassName="flex border-b border-muted bg-muted px-4"
        {...props}
      />
    );
  },
);

export default RichTextEditor;
