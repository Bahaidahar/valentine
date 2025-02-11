import { ValentineCard } from "@/types/valentine";
import { notFound } from "next/navigation";
import ValentineDisplay from "./ValentineDisplay";

export default async function ValentinePage({
  params,
}: {
  params: { token: string };
}) {
  let valentine: ValentineCard;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/verify-valentine`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: params.token }),
      }
    );

    if (!response.ok) {
      notFound();
    }

    valentine = await response.json();
  } catch (error) {
    console.error("Error verifying token:", error);
    notFound();
  }

  return <ValentineDisplay valentine={valentine} />;
}
