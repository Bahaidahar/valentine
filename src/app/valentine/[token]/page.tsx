"use client";

import { verifyValentine } from "@/app/actions/verifyValentine";
import ValentineDisplay from "@/components/ValentineDisplay";
import { ValentineCard } from "@/types/valentine";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ValentinePage = () => {
  const [valentine, setValentine] = useState<ValentineCard | null>(null);
  const params = useParams();
  const token = params.token as string;

  useEffect(() => {
    const fetchValentine = async () => {
      const valentine = await verifyValentine(token);
      setValentine(valentine);
    };
    fetchValentine();
  }, [token]);

  return <ValentineDisplay valentine={valentine} />;
};

export default ValentinePage;
