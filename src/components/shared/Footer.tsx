/**
 * Footer — a seamless closing gradient that fades the final section
 * into the page background with no visible gap or extra content.
 * All closing copy lives in FinalSection to avoid duplication.
 */
export function Footer() {
  return (
    <footer
      aria-hidden="true"
      className="h-0 overflow-hidden"
    />
  );
}
