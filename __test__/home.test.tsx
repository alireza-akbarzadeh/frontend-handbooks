import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "@/components/common/footer.astro";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByText("FrontendPro")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /Empowering developers to build the future of web experiences/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders the copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 FrontendPro/i)).toBeInTheDocument();
  });
});
