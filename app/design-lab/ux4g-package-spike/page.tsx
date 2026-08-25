import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UX4G package integration spike",
};

export default function Ux4gPackageSpikePage() {
  return (
    <main style={{ margin: "0 auto", maxWidth: "48rem", padding: "2rem 1rem" }}>
      <p>Unofficial prototype · Synthetic demonstration data</p>
      <h1>UX4G package integration spike</h1>
      <p>
        This isolated route verifies that the published UX4G stylesheet imports and renders in the selected
        Next.js setup. It is not the approved product interface.
      </p>

      <section aria-labelledby="ux4g-buttons" style={{ marginTop: "2rem" }}>
        <h2 id="ux4g-buttons">Actions</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          <button className="ux4g-btn-primary ux4g-btn-md" type="button">Continue</button>
          <button className="ux4g-btn-outline-primary ux4g-btn-md" type="button">Choose another route</button>
        </div>
      </section>

      <section aria-labelledby="ux4g-alert" style={{ marginTop: "2rem" }}>
        <h2 id="ux4g-alert">Status</h2>
        <div className="ux4g-alert ux4g-alert-info" role="status">
          Advisory route suggestions must remain explainable and optional.
        </div>
      </section>
    </main>
  );
}
