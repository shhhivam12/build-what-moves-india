import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CriticalComponentsLab } from "@/src/design-system/components/critical-components-lab";

describe("CriticalComponentsLab", () => {
  it("switches interface language without replacing the original citizen statement", async () => {
    const user = userEvent.setup();
    render(<CriticalComponentsLab />);

    const statement = screen.getByRole("textbox", { name: "What happened?" }) as HTMLTextAreaElement;
    const originalText = statement.value;

    await user.selectOptions(screen.getByRole("combobox", { name: "Language" }), "hi");

    expect(screen.getByRole("heading", { level: 1, name: "अपनी शिकायत बताएँ" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "क्या हुआ?" })).toHaveValue(originalText);
  });

  it("offers every current language target and labels unreviewed catalogues", async () => {
    const user = userEvent.setup();
    render(<CriticalComponentsLab />);

    const language = screen.getByRole("combobox", { name: "Language" });
    expect(screen.getAllByRole("option")).toHaveLength(23);

    await user.selectOptions(language, "ur");

    expect(screen.getByText(/Translation preview:/)).toBeInTheDocument();
    expect(document.querySelector("[lang='ur']")).toHaveAttribute("dir", "rtl");
  });

  it("shows a linked validation error and preserves the selected route", async () => {
    const user = userEvent.setup();
    render(<CriticalComponentsLab />);

    await user.clear(screen.getByRole("textbox", { name: "What happened?" }));
    await user.click(screen.getByRole("radio", { name: /Banking services/ }));
    await user.click(screen.getByRole("button", { name: "Continue to route confirmation" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter at least 20 characters");
    expect(screen.getByRole("radio", { name: /Banking services/ })).toBeChecked();
  });
});
