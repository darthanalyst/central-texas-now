/* Central Texas Now — Tweaks UI (uses tweaks-panel.jsx helpers). */
function CTNTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Masthead" />
      <TweakRadio
        label="Style" value={t.masthead}
        options={[{ value: "block", label: "Block" }, { value: "bar", label: "Bar" }, { value: "serif", label: "Serif" }]}
        onChange={(v) => setTweak("masthead", v)}
      />

      <TweakSection label="Typography" />
      <TweakRadio
        label="Headlines" value={t.headlineFont}
        options={[{ value: "sans", label: "Sans" }, { value: "serif", label: "Serif" }]}
        onChange={(v) => setTweak("headlineFont", v)}
      />
      <TweakRadio
        label="Density" value={t.density}
        options={[{ value: "compact", label: "Compact" }, { value: "regular", label: "Regular" }, { value: "comfy", label: "Comfy" }]}
        onChange={(v) => setTweak("density", v)}
      />

      <TweakSection label="Brand" />
      <TweakColor
        label="Accent" value={t.accent}
        options={["#b3122f", "#0b3d6b", "#c2410c", "#15604d", "#3a3a3a"]}
        onChange={(v) => setTweak("accent", v)}
      />
      <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
    </TweaksPanel>
  );
}
window.CTNTweaks = CTNTweaks;
