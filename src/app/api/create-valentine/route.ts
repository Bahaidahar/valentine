import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ValentineCard } from "@/types/valentine";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const valentine: ValentineCard = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    const token = jwt.sign(valentine, JWT_SECRET);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Error creating valentine:", error);
    return NextResponse.json(
      { error: "Failed to create valentine" },
      { status: 500 }
    );
  }
}
