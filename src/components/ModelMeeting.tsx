import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingActions from "@/hooks/useMeetingActions";

interface MeetingModelProp {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    isJoinMeeting: boolean;
}

const ModelMeeting = ({
    isOpen,
    onClose,
    title,
    isJoinMeeting,
}: MeetingModelProp) => {
    const [meetingUrl, setMeetingUrl] = useState("");

    const { createInstanceMeeting, joinMeeting } = useMeetingActions();

    const handleStart = () => {
        if (isJoinMeeting) {
            // if it's a full URL extract meeting ID
            const meetingId = meetingUrl.split("/").pop();
            if (meetingId) joinMeeting(meetingId);
        } else {
            createInstanceMeeting();
        }

        setMeetingUrl("");
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    {isJoinMeeting && (
                        <Input
                            placeholder="Paste Meeting link here..."
                            value={meetingUrl}
                            onChange={(e) => setMeetingUrl(e.target.value)}
                        />
                    )}

                    <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleStart}
                            disabled={isJoinMeeting && !meetingUrl.trim()}
                        >
                            {isJoinMeeting ? "Join Meeting" : "Start Meeting"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModelMeeting;
