import { SectionHeader } from "@/components/shared/SectionHeader";
import { CertificateCard } from "@/components/cards/CertificateCard";
import type { Certificate } from "@/types/certificate";
import certificatesData from "@/data/certificates.json";

export function CertificationsSection() {
  const certificates = certificatesData as Certificate[];

  return (
    <section id="certifications" className="section relative" aria-label="Certifications">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Certifications"
          title="Verified"
          titleHighlight="credentials"
          description="Certifications that demonstrate commitment to continuous learning and professional development."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, index) => (
            <CertificateCard key={cert.id} certificate={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
