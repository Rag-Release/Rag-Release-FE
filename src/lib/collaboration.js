import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";

let ydoc = null;
let provider = null;

export const getYDoc = (roomName = "book-editor-demos") => {
  if (!ydoc) {
    ydoc = new Y.Doc();
    provider = new WebrtcProvider("book-editor-demos", ydoc, {
      signaling: ["ws://localhost:4444"], // Your local signaling server
    });
  }
  return { ydoc, provider };
};
