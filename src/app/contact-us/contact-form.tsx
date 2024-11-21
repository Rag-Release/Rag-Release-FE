"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Check, Send, Upload } from "lucide-react";
import { useState } from "react";

interface ContactFormProps {
  option: string;
  setIsSubmitted: (value: boolean) => void;
}

export default function ContactForm({
  option,
  setIsSubmitted,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isVerified) {
      // Handle form submission logic here
      console.log("Form submitted:", { name, email, message, option, file });
      setIsSubmitted(true);
    } else {
      alert("Please verify that you are not a robot.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full bg-gray-700 text-white border-gray-600"
      />
      <Input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full bg-gray-700 text-white border-gray-600"
      />
      <Textarea
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="w-full bg-gray-700 text-white border-gray-600"
        rows={4}
      />
      <div className="flex items-center space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
        >
          <Upload className="mr-2 h-4 w-4" /> Upload File
        </Button>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
        {file && <span className="text-gray-300">{file.name}</span>}
      </div>
      <div className="flex items-center space-x-2 bg-gray-700 p-4 rounded-lg">
        <Checkbox
          id="verify"
          checked={isVerified}
          onCheckedChange={(checked) => setIsVerified(checked as boolean)}
          className="data-[state=checked]:bg-indigo-600"
        />
        <label
          htmlFor="verify"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
        >
          I&apos;m not a robot
        </label>
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Check className="h-5 w-5 text-green-500" />
          </motion.div>
        )}
      </div>
      <Button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
      >
        <Send className="mr-2 h-4 w-4" /> Send Message
      </Button>
    </form>
  );
}
