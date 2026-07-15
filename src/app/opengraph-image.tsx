import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            left: "20%",
            top: "20%",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.08)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "20%",
            bottom: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(139,92,246,0.06)",
            filter: "blur(80px)",
          }}
        />

        {/* Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(99,102,241,0.15)",
            border: "2px solid rgba(99,102,241,0.3)",
            marginBottom: 24,
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 700, color: "#a5b4fc" }}>HV</span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#fafafa",
            margin: 0,
            textAlign: "center",
            lineHeight: 1.1,
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Role */}
        <p
          style={{
            fontSize: 24,
            color: "#818cf8",
            margin: "16px 0 0",
            fontWeight: 500,
          }}
        >
          Senior Full Stack .NET Developer
        </p>

        {/* Tech badges */}
        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
          {["ASP.NET Core", "C#", "CQRS", "SQL Server"].map((tech) => (
            <span
              key={tech}
              style={{
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 14,
                color: "#a5b4fc",
                fontWeight: 500,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* URL */}
        <p style={{ position: "absolute", bottom: 32, color: "#3f3f46", fontSize: 16 }}>
          {siteConfig.url}
        </p>
      </div>
    ),
    { ...size },
  );
}
