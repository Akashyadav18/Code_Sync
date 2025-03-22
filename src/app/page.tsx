"use client";

import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constrants";
import { useUserRole } from "@/hooks/UseUserRole";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModelMeeting from "@/components/ModelMeeting";

export default function Home() {

  const router = useRouter();

  const { isCandidate, isInterviewer, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModel, setShowModel] = useState(false);
  const [modelType, setModelType] = useState<"start" | "Join">();

  const handleQuickClick = (title: string) => {
    switch(title){
      case "New Call":
        setModelType("start");
        setShowModel(true);
        break;
      case "Join Interview":
        setModelType("Join");
        setShowModel(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`)
    }
    
  }

  if(isLoading) return <p>Loading...</p>

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className=" mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard 
              key={action.title}
              action={action}
              onClick={() => handleQuickClick(action.title)}
              />
            ))}
          </div>

            <ModelMeeting 
              isOpen={showModel}
              onClose={() => setShowModel(false)}
              title={modelType === "Join" ? "Join Interview" : "Start Meeting"}
              isJoinMeeting={modelType === "Join"}
            />

        </>
      ) : (
        <>
          <div>Candidate</div>
        </>
      )}
    </div>
  );
}
