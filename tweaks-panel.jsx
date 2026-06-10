/* Minimal Tweaks shim for the static/public build of Central Texas Now.
   Provides useTweaks() (state only, no persistence) and no-op Tweak* panel
   components so the app renders in its default design without the editor UI.
   (The full Tweaks panel is used in the authoring environment.) */
window.useTweaks = function (defaults) {
  var pair = React.useState(defaults || {});
  var state = pair[0], set = pair[1];
  var setTweak = function (k, v) {
    set(function (prev) {
      if (k && typeof k === "object") return Object.assign({}, prev, k);
      var next = Object.assign({}, prev);
      next[k] = v;
      return next;
    });
  };
  return [state, setTweak];
};
function TweaksPanel() { return null; }
function TweakSection() { return null; }
function TweakRow() { return null; }
function TweakSlider() { return null; }
function TweakToggle() { return null; }
function TweakRadio() { return null; }
function TweakSelect() { return null; }
function TweakText() { return null; }
function TweakNumber() { return null; }
function TweakColor() { return null; }
function TweakButton() { return null; }
Object.assign(window, {
  TweaksPanel, TweakSection, TweakRow, TweakSlider, TweakToggle,
  TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton,
});
