"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SparkleIcon } from "lucide-react";
import { useUserRole } from "@/hooks/UseUserRole";

const DashboardBtn = () => {

    const {isCandidate, isInterviewer, isLoading} = useUserRole();

    if (isCandidate || isLoading) return null;

    return (
        <Link href={"/"}>
            <Button className="gap-2 font-medium">
                <SparkleIcon className="size-4" />
                DashBoard
            </Button>
        </Link>
    );
};

export default DashboardBtn;
