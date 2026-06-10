/* Minimal <image-slot> for the static/public build of Central Texas Now.
   Renders the `src` image cover-filled; on load error it removes the <img>
   so the brand-gradient background of the container shows instead.
   (The full drag-and-drop component is used in the authoring environment.) */
(function () {
  if (window.customElements && customElements.get("image-slot")) return;
  class ImageSlot extends HTMLElement {
    static get observedAttributes() { return ["src"]; }
    connectedCallback() { this._render(); }
    attributeChangedCallback() { if (this.isConnected) this._render(); }
    _render() {
      var src = this.getAttribute("src");
      if (!this.style.position) this.style.position = "relative";
      this.style.overflow = "hidden";
      if (!this.style.display) this.style.display = "block";
      this.innerHTML = "";
      if (!src) return;
      var img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      img.loading = "lazy";
      img.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;border:0;";
      img.onerror = function () { img.remove(); };
      img.src = src;
      this.appendChild(img);
    }
  }
  customElements.define("image-slot", ImageSlot);
})();
