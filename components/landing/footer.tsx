export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <p className="font-serif text-lg font-semibold text-foreground">
          Selah
        </p>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          A sacred space for personalized prayer. Respectful of all faiths,
          beliefs, and spiritual traditions.
        </p>
        <div className="flex gap-6 text-xs text-muted-foreground">
          <span>Privacy-first</span>
          <span>Inclusive</span>
          <span>Open to all</span>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {"Selah \u00A9 2026. Made with reverence."}
        </p>
      </div>
    </footer>
  )
}
