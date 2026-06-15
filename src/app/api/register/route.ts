import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabase } from "@/lib/supabase";

// Define the directory and file path for storing leads
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, industry, challenge } = body;

    // Server-side validation
    if (!name || !email || !company || !industry) {
      return NextResponse.json(
        { success: false, error: "Todos los campos obligatorios (nombre, email, empresa, sector) son requeridos." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    // Prepare lead object for local backup
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      company,
      industry,
      challenge: challenge || "Ninguno especificado",
      timestamp: new Date().toISOString(),
    };

    // 1. Insert into Supabase
    const { error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          name,
          email,
          company,
          industry,
          challenge: challenge || null,
        },
      ]);

    if (dbError) {
      console.error("Error inserting into Supabase:", dbError);
      return NextResponse.json(
        { success: false, error: `Error de base de datos: ${dbError.message}` },
        { status: 500 }
      );
    }

    // 2. Ensure the local backup directory exists and append lead (resilience fallback)
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      let leads = [];
      if (fs.existsSync(LEADS_FILE)) {
        try {
          const fileContent = fs.readFileSync(LEADS_FILE, "utf-8");
          leads = JSON.parse(fileContent);
        } catch (err) {
          console.error("Error reading leads file, resetting:", err);
        }
      }

      leads.push(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
    } catch (localErr) {
      console.error("Local backup failed, but database insert succeeded:", localErr);
    }

    return NextResponse.json(
      { success: true, message: "Inscripción recibida correctamente. ¡Nos pondremos en contacto contigo!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error interno en el servidor." },
      { status: 500 }
    );
  }
}
