import { describe, expect, it } from "vitest";
import { addDraftDetail, analyseStatement, answerClarification, composeProfessionalDraft, nextMissingField, voiceLanguages } from "@/src/features/chatbot/voice-grievance-demo";

describe("voice grievance demonstration", () => {
  it("supports a useful set of Indian speech locales", () => {
    expect(voiceLanguages.at(0)?.code).toBe("en-IN");
    expect(voiceLanguages.at(1)?.code).toBe("hi-IN");
    expect(voiceLanguages.length).toBeGreaterThanOrEqual(12);
  });

  it("asks for a missing period before drafting", () => {
    const draft = analyseStatement("My pension payment has not arrived and I want it released immediately");
    expect(nextMissingField(draft)).toBe("date");
    expect(nextMissingField(answerClarification(draft, "date", "Since July 2026"))).toBe("location");
  });

  it("creates a formal draft without deleting the citizen's words", () => {
    const original = "I paid 499 rupees on 18 August for mobile activation, but it is inactive. Please refund it.";
    const text = composeProfessionalDraft(analyseStatement(original));
    expect(text).toContain(original);
    expect(text).toContain("Citizen's original statement");
    expect(text).toContain("time-bound resolution");
  });

  it("keeps later citizen corrections in the approved draft", () => {
    const base = analyseStatement("I paid on 18 August for mobile activation. Please refund it.");
    const updated = addDraftDetail(base, "The shop also gave me receipt number DEMO-22");
    expect(composeProfessionalDraft(updated)).toContain("Additional detail: The shop also gave me receipt number DEMO-22");
  });
});
