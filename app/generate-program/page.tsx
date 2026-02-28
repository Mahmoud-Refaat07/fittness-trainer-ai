"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { vapi } from "@/lib/vapi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const GenerateProgramPage = () => {
  const [callActive, setCallActive] = useState<boolean>(false);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [callEnded, setCallEnded] = useState<boolean>(false);

  const { user } = useUser();
  const router = useRouter();

  const messageContainerRef = useRef<HTMLDivElement>(null);

  const toggleCall = async () => {
    if (callActive) vapi.stop();
    else {
      try {
        setConnecting(true);
        setMessages([]);
        setCallEnded(false);
        const fullName = user?.firstName
          ? `${user.firstName} ${user.lastName || ""}`.trim()
          : "There";
        await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORK_FLOW_ID, {
          variableValues: {
            full_name: fullName,
          },
        });
      } catch (error) {
        console.log("Failed to start call", error);
        setConnecting(false);
      }
    }
  };

  // auto-scroll messages
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // navigate user to profile page after the call ends
  useEffect(() => {
    if (callEnded) {
      const redirectTimer = setTimeout(() => {
        router.push("/profile");
      }, 1500);
      return () => clearTimeout(redirectTimer);
    }
  }, [callEnded]);

  // setup event listeners for vapi
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call started");
      setConnecting(false);
      setCallActive(true);
      setCallEnded(false);
    };

    const handleCallEndMessage = () => {
      console.log("Call ended");
      setCallActive(false);
      setConnecting(false);
      setIsSpeaking(false);
      setCallEnded(true);
    };

    const handleSpeechStart = () => {
      console.log("AI started speaking");
      setIsSpeaking(true);
    };

    const handleSpeechEnd = () => {
      console.log("AI stopped speaking");
      setIsSpeaking(false);
    };

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const handleError = (error: any) => {
      console.log("Vapi Error", error);
      setConnecting(false);
      setCallActive(false);
    };
    vapi
      .on("call-start", handleCallStart)
      .on("call-end", handleCallEndMessage)
      .on("speech-start", handleSpeechStart)
      .on("speech-end", handleSpeechEnd)
      .on("message", handleMessage)
      .on("error", handleError);

    // CLEAN-UP
    return () => {
      vapi
        .off("call-start", handleCallStart)
        .off("call-end", handleCallEndMessage)
        .off("speech-start", handleSpeechStart)
        .off("speech-end", handleSpeechEnd)
        .off("message", handleMessage)
        .off("error", handleError);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-5xl">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-600/30 bg-orange-600/5 text-orange-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
            AI Session
          </div>
          <h1 className="text-3xl font-bold font-mono">
            <span className="text-white">Generate Your </span>
            <span className="text-orange-500">Fitness Program</span>
          </h1>
        </div>

        {/* Video Call Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* AI Assistant Card */}
          <Card className="bg-black/60 backdrop-blur-sm border border-orange-600/30 hover:border-orange-500/50 transition-all duration-300 overflow-hidden relative">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-orange-600/20 bg-black/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-xs text-orange-400 font-mono tracking-widest">
                  AI.COACH
                </span>
              </div>
              <span className="text-xs text-gray-600 font-mono">v3.5</span>
            </div>

            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* Voice wave animation */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-center items-center h-20">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`mx-1 w-1.5 bg-orange-500 rounded-full transition-all duration-300 ${
                      isSpeaking
                        ? "animate-sound-wave opacity-80"
                        : "opacity-20"
                    }`}
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>

              {/* AI Avatar */}
              <div className="relative size-28 mb-4">
                <div
                  className={`absolute -inset-1 rounded-full bg-orange-600/20 ${isSpeaking ? "animate-pulse" : ""}`}
                ></div>
                <div className="absolute inset-0 rounded-full border border-orange-600/40 overflow-hidden">
                  <img
                    src="/ai-avatar.jpg"
                    alt="ai-assistant"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h2 className="text-lg font-bold text-white font-mono">
                FitVoice AI
              </h2>
              <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">
                Fitness & Diet Coach
              </p>

              {/* Speaking indicator */}
              <div
                className={`mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full border font-mono transition-all duration-300 ${
                  isSpeaking
                    ? "bg-orange-600/20 border-orange-500/50"
                    : "bg-black/40 border-orange-600/20"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    isSpeaking ? "bg-orange-500 animate-pulse" : "bg-gray-600"
                  }`}
                ></div>
                <span className="text-xs text-gray-400">
                  {isSpeaking
                    ? "Speaking..."
                    : callActive
                      ? "Listening..."
                      : callEnded
                        ? "Redirecting to profile"
                        : "Waiting..."}
                </span>
              </div>
            </div>
          </Card>

          {/* User Card */}
          <Card className="bg-black/60 backdrop-blur-sm border border-orange-600/30 hover:border-orange-500/50 transition-all duration-300 overflow-hidden relative">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-orange-600/20 bg-black/40">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-400 font-mono tracking-widest">
                  USER.SESSION
                </span>
              </div>
              <span className="text-xs text-gray-600 font-mono">LIVE</span>
            </div>

            <div className="aspect-video flex flex-col items-center justify-center p-6 relative">
              {/* User Avatar */}
              <div className="relative size-28 mb-4">
                <div className="absolute -inset-1 rounded-full border border-orange-600/20"></div>
                <img
                  src={user?.imageUrl}
                  alt="User"
                  className="size-full object-cover rounded-full border border-orange-600/30"
                />
              </div>

              <h2 className="text-lg font-bold text-white font-mono">You</h2>
              <p className="text-xs text-gray-500 mt-1 tracking-widest uppercase">
                {user
                  ? (user.firstName + " " + (user.lastName || "")).trim()
                  : "Guest"}
              </p>

              {/* Ready indicator */}
              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 font-mono">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-400">Ready</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Message Container */}
        {messages.length > 0 && (
          <div
            ref={messageContainerRef}
            className="w-full bg-black/60 backdrop-blur-sm border border-orange-600/20 rounded-xl px-5 py-4 mb-8 h-64 overflow-y-auto scroll-smooth"
          >
            {/* Top shimmer */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-4"></div>

            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div className="animate-fadeIn" key={i}>
                  <div
                    className={`text-xs font-mono mb-1 ${
                      msg.role === "assistant"
                        ? "text-orange-400"
                        : "text-gray-500"
                    }`}
                  >
                    {msg.role === "assistant" ? "> FitVoice AI" : "> You"}
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              ))}
              {callEnded && (
                <div className="animate-fadeIn">
                  <div className="text-xs font-mono text-orange-400 mb-1">
                    {">"} System
                  </div>
                  <p className="text-sm text-gray-300">
                    Your fitness program has been created! Redirecting to your
                    profile...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="w-full flex justify-center gap-4">
          <Button
            className={`w-44 text-base font-mono rounded-full px-8 py-6 relative transition-all duration-200 shadow-lg ${
              callActive
                ? "bg-red-600 hover:bg-red-500 shadow-red-900/30"
                : callEnded
                  ? "bg-green-600 hover:bg-green-500 shadow-green-900/30"
                  : "bg-orange-600 hover:bg-orange-500 shadow-orange-900/30"
            } text-white`}
            onClick={toggleCall}
          >
            {connecting && (
              <span className="absolute inset-0 rounded-full animate-ping bg-orange-500/40"></span>
            )}
            {callActive
              ? "End Call"
              : connecting
                ? "Connecting..."
                : callEnded
                  ? "View Profile"
                  : "Start Call"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateProgramPage;
