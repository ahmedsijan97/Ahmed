import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import cmsRoutes from "./src/server/cmsRoutes";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(cookieParser());

// Serve uploaded media files statically
const uploadsDir = path.join(process.cwd(), "public", "uploads");
app.use("/uploads", express.static(uploadsDir));

// Mount CMS API Routes
app.use("/api", cmsRoutes);

// Initialize Gemini Client (server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } catch (err) {
    console.warn("Failed to initialize GoogleGenAI with provided key:", err);
  }
}

const SYSTEM_INSTRUCTION = `You are the official AI Marketing Assistant for Sayed Ahmed Sijan.
Your goal is to represent Sayed professionally, provide insights into his marketing methodologies, answer client inquiries, explain his case studies, services, pricing frameworks, and help potential clients book a strategy consultation.

About Sayed Ahmed Sijan:
- Full Name: Sayed Ahmed Sijan
- Title: Digital Marketer & AI Performance Specialist
- Education: Bachelor of Science (B.Sc Honours), National University Gaibandha (Science & Quantitative Analytical background)
- Location: Gaibandha / Dhaka, Bangladesh (Available Worldwide for remote work and select retainers)
- Email: Ahmedsijan97@gmail.com
- Phone / WhatsApp: +880 1763 810310 (Direct WhatsApp link: https://wa.me/8801763810310)
- LinkedIn: https://linkedin.com/in/sayed-ahmed-sijan
- Facebook: https://facebook.com/sayed.ahmed.sijan
- GitHub: https://github.com/sayedahmedsijan

Key Metrics & Track Record:
- 5+ Years Experience in performance marketing, CRO, and SEO.
- $4.2M+ Ad Spend Managed profitably across Meta Ads, Google Ads, TikTok Ads.
- 3.8x Average Blended ROAS across client campaigns.
- 80+ Projects Completed & 35+ Brands Scaled globally.
- Average +147% ROAS boost on Meta/Google campaigns.
- -34% reduction in blended Customer Acquisition Cost (CPA).
- +82% Organic Search Traffic increase via Technical SEO.
- +61% Store Conversion Rate improvement via CRO & AI testing.

Core Services Offered:
1. High-Performance Meta & TikTok Advertising (CBO / Advantage+ Shopping Campaigns, creative matrix testing, retargeting).
2. Google Ads & Performance Max Scaling (Search intent capture, PMax multi-asset feeds, YouTube, Display).
3. E-commerce CRO & ROAS Optimization (Conversion rate optimization, landing page restructuring, A/B testing).
4. Technical & Local SEO / Google Business Profile (Rankings, schema markup, site speed, local map pack dominance).
5. Automated Lead Funnels & AI Marketing Systems (Python script automations, Zapier/Make lead routing, AI copywriting matrix).
6. Precision Data Tracking & GA4 Server-Side Setup (Google Tag Manager, Meta CAPI, offline conversion tracking).

Pricing & Packages:
- Growth Starter ($800 - $1,500/mo): 1-2 Channels, full setup, tracking, bi-weekly optimization.
- Scale Velocity ($1,800 - $3,500/mo): Multi-channel Meta + Google Ads, weekly CRO sprints, custom dashboard.
- Enterprise Growth Partner ($4,000+/mo or rev-share): Omnichannel ad management, dedicated Python AI automations, daily monitoring.
- One-Time Growth & Tracking Audit ($450): 40-point full-funnel audit with 7-day roadmap.

Guidelines for your tone and behavior:
- Be confident, articulate, data-driven, strategic, and polite.
- Explain marketing concepts clearly using practical metrics (ROAS, CPA, CTR, MER, LTV).
- When a user wants to hire, book a call, or get a quote, provide Sayed's direct contact details (Email: Ahmedsijan97@gmail.com, WhatsApp: +880 1763 810310) or prompt them to use the Contact page.
- Keep responses concise, well-formatted with markdown bullet points where helpful, and avoid overwhelming jargon.`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiEnabled: Boolean(aiClient) });
});

// Chat API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (aiClient) {
      try {
        // Build conversation contents
        const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history)) {
          for (const item of history) {
            if (item && (item.role === "user" || item.role === "model") && typeof item.text === "string") {
              contents.push({
                role: item.role,
                parts: [{ text: item.text }],
              });
            }
          }
        }

        // Add current user message
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });

        const response = await aiClient.models.generateContent({
          model: "gemini-3.7-flash",
          contents: contents.length > 0 ? contents : message,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const reply = response.text || "I'm here to assist you with Sayed's services and performance marketing. How can I help?";
        res.json({ reply });
        return;
      } catch (geminiError: any) {
        console.error("Gemini API generation error:", geminiError);
        // Fallback to intelligent local portfolio response
      }
    }

    // Intelligent fallback responses based on keyword matching if API key is not yet set
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes("service") || lower.includes("offer") || lower.includes("help") || lower.includes("what do you do")) {
      reply = `**Sayed Ahmed Sijan specializes in data-driven digital marketing & AI systems:**\n\n- **Meta & TikTok Ads:** Scaling CBO & Advantage+ Shopping Campaigns at 3.5x–5x+ ROAS.\n- **Google Performance Max & Search:** Capturing high-intent buyers with automated bidding.\n- **E-commerce CRO:** Systematic A/B testing and landing page optimizations (+61% avg conversion rate).\n- **Technical & Local SEO:** Dominating Google Map pack and organic search rankings.\n- **AI Marketing Automation:** Custom Python scripts and AI creative matrix testing.\n- **GA4 & Meta CAPI Tracking:** Bulletproof server-side conversion measurement.\n\nWould you like to discuss a specific channel for your business?`;
    } else if (lower.includes("price") || lower.includes("cost") || lower.includes("rate") || lower.includes("package") || lower.includes("fee")) {
      reply = `**Sayed's Flexible Investment Packages:**\n\n1. **Growth Starter** ($800–$1,500/mo): 1–2 channels, full tracking setup, and bi-weekly optimization.\n2. **Scale Velocity** ($1,800–$3,500/mo): Multi-channel Meta + Google Ads, weekly CRO sprints, and custom reporting.\n3. **Enterprise Partner** ($4,000+/mo): Omnichannel management, Python AI automation, and dedicated growth engineering.\n4. **One-Time Growth Audit** ($450): 40-point full-funnel audit with an actionable 7-day roadmap.\n\nSayed also offers customized proposals tailored to your monthly ad spend.`;
    } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp") || lower.includes("book") || lower.includes("call") || lower.includes("hire")) {
      reply = `**Get in touch directly with Sayed Ahmed Sijan:**\n\n- **Email:** [Ahmedsijan97@gmail.com](mailto:Ahmedsijan97@gmail.com)\n- **WhatsApp:** [+880 1763 810310](https://wa.me/8801763810310)\n- **LinkedIn:** [Sayed Ahmed Sijan](https://linkedin.com/in/sayed-ahmed-sijan)\n- **Location:** Gaibandha / Dhaka, Bangladesh (Working globally across US, UK, EU, UAE, & APAC time zones).\n\nYou can also head over to the **Contact** page on this website to send a project inquiry!`;
    } else if (lower.includes("case study") || lower.includes("result") || lower.includes("roas") || lower.includes("proof") || lower.includes("portfolio")) {
      reply = `**Highlighted Client Case Studies:**\n\n- **D2C Fashion & Apparel Brand:** Scaled from $15k/mo to **$110k/mo** at **4.2x ROAS** using Advantage+ creative testing.\n- **Local Solar & HVAC Contractor:** Generated **320% increase in qualified leads** while reducing CPA by **-38%**.\n- **SaaS B2B Platform:** Boosted trial conversions by **+74%** via search intent restructuring and remarketing funnels.\n\nCheck out the **Case Studies** tab on the navigation bar to see full metrics and breakdowns!`;
    } else if (lower.includes("who is") || lower.includes("about") || lower.includes("background") || lower.includes("sijan") || lower.includes("sayed")) {
      reply = `**Sayed Ahmed Sijan** is a Digital Marketer & AI Performance Specialist with 5+ years of experience and over **$4.2M+ in managed ad spend**. He holds a B.Sc (Honours) in Science from National University Gaibandha, applying rigorous scientific testing and Python automations to maximize ROI for e-commerce and local businesses.`;
    } else {
      reply = `Hello! I am **Sayed's AI Marketing Assistant**. I can help you with:\n\n- Exploring Sayed's services (Meta Ads, Google Ads, SEO, AI Automations)\n- Reviewing recent client case studies and 4.2x+ ROAS results\n- Answering pricing and package questions\n- Scheduling a strategy consultation or connecting directly via WhatsApp / Email\n\nWhat would you like to know today?`;
    }

    res.json({ reply });
  } catch (error: any) {
    console.error("Chat endpoint error:", error);
    res.status(500).json({ error: "Internal server error processing chat" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
