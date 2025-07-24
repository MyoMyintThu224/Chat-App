import React, { useEffect, useRef, useState } from "react";
import { db, auth } from "../lib/firebase";
import {
  collection, addDoc, query, orderBy, onSnapshot,
  serverTimestamp, updateDoc, doc, setDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaFileAlt, FaPaperPlane, FaSmile,
  FaPaperclip, FaCheck, FaCheckDouble
} from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";

export default function ChatBox() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "typingStatus"), (snapshot) => {
      const status = {};
      snapshot.forEach((doc) => {
        const { uid, isTyping } = doc.data();
        if (uid !== user?.uid && isTyping) {
          status[uid] = true;
        }
      });
      setTypingUsers(status);
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (text.trim() === "" && !file) return;
    const docRef = await addDoc(collection(db, "messages"), {
      text,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: serverTimestamp(),
      status: "sent",
    });
    await updateDoc(doc(db, "messages", docRef.id), {
      status: "delivered",
    });
    setText("");
    setFile(null);
    setImagePreview(null);
  };

  const handleTyping = async (typing) => {
    if (!user) return;
    await setDoc(doc(db, "typingStatus", user.uid), {
      uid: user.uid,
      isTyping: typing,
    });
  };

  const handleEmojiClick = (emoji) => {
    setText((prev) => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected?.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-3xl mx-auto bg-gradient-to-br from-sky-100 via-blue-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white shadow-lg rounded-none sm:rounded-lg overflow-hidden">

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3 scrollbar-thin scrollbar-thumb-sky-400">
        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={`flex ${msg.uid === user?.uid ? "justify-end" : "justify-start"}`}
            ref={idx === messages.length - 1 ? scrollRef : null}
          >
            <div
              className={`max-w-[85%] sm:max-w-[70%] px-4 py-2 rounded-xl shadow-sm transition-all duration-200 ${
                msg.uid === user?.uid
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
                {msg.displayName}
              </p>
              <p className="text-sm break-words">{msg.text}</p>
              {msg.uid === user?.uid && (
                <div className="text-xs flex justify-end mt-1 text-white">
                  {msg.status === "delivered" ? <FaCheckDouble size={12} /> : <FaCheck size={12} />}
                </div>
              )}
            </div>
          </div>
        ))}
        {Object.keys(typingUsers).length > 0 && (
          <p className="text-xs text-blue-500 italic animate-pulse">Someone is typing...</p>
        )}
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-30 animate-fadeIn">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="auto" />
        </div>
      )}

      {/* Preview */}
      {imagePreview && (
        <div className="mb-2 px-4">
          <img
            src={imagePreview}
            alt="preview"
            className="w-24 sm:w-32 rounded-md shadow-md border border-sky-400"
          />
        </div>
      )}
      {file && !imagePreview && (
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2 px-4">
          <FaFileAlt /> {file.name}
        </div>
      )}

      {/* Input */}
      <div className="p-3 sm:p-4 bg-white dark:bg-gray-800 border-t border-blue-200 dark:border-gray-700 flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-sky-600 dark:text-sky-400 hover:text-sky-500 transition"
        >
          <FaSmile size={20} />
        </button>

        <label className="text-gray-500 dark:text-gray-300 hover:text-sky-600 cursor-pointer">
          <FaPaperclip size={20} />
          <input type="file" onChange={handleFileChange} className="hidden" />
        </label>

        <input
          type="text"
          className="flex-1 bg-sky-50 dark:bg-gray-700 text-gray-800 dark:text-white border border-sky-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:focus:ring-blue-500"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping(true);
          }}
          onBlur={() => handleTyping(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
              handleTyping(false);
            }
          }}
        />

        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-sky-500 text-white px-3 py-2 rounded-md transition duration-300"
        >
          <FaPaperPlane size={18} />
        </button>
      </div>
    </div>
  );
}
