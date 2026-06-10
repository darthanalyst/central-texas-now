/* Central Texas Now — shared chrome: top bar, masthead, nav, weather, footer.
   All exported to window for the main app. Uses CSS vars defined in the host. */
const { useState: useStateChrome } = React;

/* ---- tiny inline icon set ---- */
function Icon({ name, size = 18, stroke = 1.6 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    back: <><path d="M19 12H5M11 18l-6-6 6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
    close: <><path d="M6 6l12 12M18 6L6 18" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
  };
  return <svg {...common} aria-hidden="true">{paths[name]}</svg>;
}

/* ---- top utility bar ---- */
function TopBar({ go }) {
  return (
    <div className="ctn-topbar">
      <div className="ctn-wrap ctn-topbar-in">
        <div className="ctn-tb-left">
          <span className="ctn-date">Tuesday, June 9, 2026</span>
          <span className="ctn-tb-wx"><Icon name="sun" size={14} /> Waco 96° · Sunny</span>
        </div>
        <div className="ctn-tb-right">
          <a onClick={() => go("section/community")}>Newsletters</a>
          <a onClick={() => go("section/news")}>Obituaries</a>
          <a onClick={() => go("section/weather")}>Traffic</a>
          <a className="ctn-sub" onClick={() => go("home")}>Subscribe</a>
        </div>
      </div>
    </div>
  );
}

/* ---- masthead + nav (masthead style is tweakable) ---- */
function Masthead({ go, route, mastStyle }) {
  const sections = window.CTN_DATA.SECTIONS;
  const navKeys = ["news", "crime", "weather", "sports", "politics", "community"];
  const activeSection = route.name === "section" ? route.slug : (route.name === "article" ? window.CTN_DATA.byId(route.id)?.section : null);
  const [menuOpen, setMenuOpen] = useStateChrome(false);
  const navTo = (path) => { setMenuOpen(false); go(path); };

  const Logo = (
    <a className="ctn-logo" onClick={() => navTo("home")}>
      <span className="ctn-logo-ct">Central Texas</span>
      <span className="ctn-logo-now">Now</span>
    </a>
  );

  const Burger = (
    <button
      className={"ctn-burger" + (menuOpen ? " open" : "")}
      aria-label={menuOpen ? "Close menu" : "Open menu"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((v) => !v)}
    >
      <Icon name={menuOpen ? "close" : "menu"} size={22} />
    </button>
  );

  const MobileMenu = (
    <div className={"ctn-mobile-menu" + (menuOpen ? " open" : "")}>
      <nav className="ctn-mm-nav">
        {navKeys.map((k) => (
          <a key={k} className={activeSection === k ? "on" : ""} onClick={() => navTo("section/" + k)}>{sections[k].name}</a>
        ))}
      </nav>
      <div className="ctn-mm-util">
        <a onClick={() => navTo("section/community")}>Newsletters</a>
        <a onClick={() => navTo("section/news")}>Obituaries</a>
        <a onClick={() => navTo("section/weather")}>Traffic</a>
      </div>
      <a className="ctn-mm-sub" onClick={() => navTo("home")}>Subscribe</a>
    </div>
  );

  if (mastStyle === "bar") {
    return (
      <header className="ctn-mast ctn-mast-bar">
        <div className="ctn-wrap ctn-mast-bar-in">
          {Burger}
          {Logo}
          <nav className="ctn-nav-inline">
            {navKeys.map((k) => (
              <a key={k} className={activeSection === k ? "on" : ""} onClick={() => navTo("section/" + k)}>{sections[k].name}</a>
            ))}
          </nav>
          <button className="ctn-search-btn" aria-label="Search"><Icon name="search" size={18} /></button>
        </div>
        {MobileMenu}
      </header>
    );
  }

  if (mastStyle === "serif") {
    return (
      <header className="ctn-mast ctn-mast-serif">
        <div className="ctn-wrap ctn-mast-center">
          {Burger}
          <a className="ctn-logo ctn-logo-serif" onClick={() => navTo("home")}>Central Texas <em>Now</em></a>
          <div className="ctn-mast-tag">Waco · Temple · Killeen · Fort Cavazos · Belton</div>
        </div>
        <nav className="ctn-nav-rule">
          <div className="ctn-wrap ctn-nav-rule-in">
            {navKeys.map((k) => (
              <a key={k} className={activeSection === k ? "on" : ""} onClick={() => navTo("section/" + k)}>{sections[k].name}</a>
            ))}
          </div>
        </nav>
        {MobileMenu}
      </header>
    );
  }

  /* default: "block" — dark bar with NOW mark + nav (The Signal) */
  return (
    <header className="ctn-mast ctn-mast-block">
      <div className="ctn-wrap ctn-mast-block-in">
        {Burger}
        {Logo}
        <nav className="ctn-nav-block">
          {navKeys.map((k) => (
            <a key={k} className={activeSection === k ? "on" : ""} onClick={() => navTo("section/" + k)}>{sections[k].name}</a>
          ))}
        </nav>
        <div className="ctn-mast-right">
          <span className="ctn-mast-wx">Waco 96°</span>
          <button className="ctn-search-btn ghost" aria-label="Search"><Icon name="search" size={17} /></button>
        </div>
      </div>
      {MobileMenu}
    </header>
  );
}

/* ---- weather widget (interactive: switch cities) ---- */
const WX = {
  Waco:    { hi: 96, lo: 74, cond: "Sunny",        wind: "S 12 mph",  days: [["Wed",98,75],["Thu",99,76],["Fri",97,74],["Sat",92,72]] },
  Temple:  { hi: 95, lo: 73, cond: "Mostly Sunny", wind: "S 10 mph",  days: [["Wed",97,74],["Thu",98,75],["Fri",96,73],["Sat",91,71]] },
  Killeen: { hi: 97, lo: 74, cond: "Sunny",        wind: "SSW 13 mph",days: [["Wed",99,75],["Thu",100,76],["Fri",98,74],["Sat",93,72]] },
  Belton:  { hi: 95, lo: 72, cond: "Sunny",        wind: "S 11 mph",  days: [["Wed",97,73],["Thu",98,74],["Fri",96,72],["Sat",91,70]] },
};
function WeatherWidget() {
  const [city, setCity] = useStateChrome("Waco");
  const d = WX[city];
  return (
    <div className="ctn-wx">
      <div className="ctn-wx-head">
        <span className="ctn-wx-label"><Icon name="sun" size={15} /> Forecast</span>
        <span className="ctn-wx-alert">Heat Advisory</span>
      </div>
      <div className="ctn-wx-cities">
        {Object.keys(WX).map((c) => (
          <button key={c} className={c === city ? "on" : ""} onClick={() => setCity(c)}>{c}</button>
        ))}
      </div>
      <div className="ctn-wx-now">
        <div className="ctn-wx-temp">{d.hi}°</div>
        <div className="ctn-wx-meta">
          <div className="ctn-wx-cond">{d.cond}</div>
          <div className="ctn-wx-sub">Low {d.lo}° · Wind {d.wind}</div>
        </div>
      </div>
      <div className="ctn-wx-days">
        {d.days.map((day) => (
          <div className="ctn-wx-day" key={day[0]}>
            <span>{day[0]}</span>
            <Icon name="sun" size={16} />
            <span className="ctn-wx-hi">{day[1]}°</span>
            <span className="ctn-wx-lo">{day[2]}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- newsletter callout ---- */
function NewsletterBox() {
  const [done, setDone] = useStateChrome(false);
  return (
    <div className="ctn-nl">
      <Icon name="mail" size={20} />
      <h4 className="ctn-nl-h">The Central Texas Brief</h4>
      <p className="ctn-nl-p">Every weekday morning: the stories that matter from Waco to the Bell County line.</p>
      {done ? (
        <div className="ctn-nl-ok">You’re in. Watch your inbox.</div>
      ) : (
        <form className="ctn-nl-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
          <input type="email" required placeholder="you@email.com" aria-label="Email" />
          <button type="submit">Sign up</button>
        </form>
      )}
    </div>
  );
}

/* ---- footer ---- */
function Footer({ go }) {
  const s = window.CTN_DATA.SECTIONS;
  return (
    <footer className="ctn-footer">
      <div className="ctn-wrap ctn-footer-in">
        <div className="ctn-footer-brand">
          <a className="ctn-logo" onClick={() => go("home")}>
            <span className="ctn-logo-ct">Central Texas</span><span className="ctn-logo-now">Now</span>
          </a>
          <p>Independent local reporting for Waco, Temple, Killeen, Fort Cavazos and Belton.</p>
          <p className="ctn-footer-fine">centraltexasnow.com · 254-555-0100</p>
        </div>
        <div className="ctn-footer-cols">
          <div>
            <h5>Sections</h5>
            {Object.values(s).map((sec) => <a key={sec.slug} onClick={() => go("section/" + sec.slug)}>{sec.name}</a>)}
          </div>
          <div>
            <h5>Company</h5>
            <a onClick={() => go("home")}>About Us</a><a onClick={() => go("home")}>Newsroom</a>
            <a onClick={() => go("home")}>Advertise</a><a onClick={() => go("home")}>Contact</a>
          </div>
          <div>
            <h5>More</h5>
            <a onClick={() => go("home")}>Newsletters</a><a onClick={() => go("home")}>Obituaries</a>
            <a onClick={() => go("home")}>Archive</a><a onClick={() => go("home")}>Tips</a>
          </div>
        </div>
      </div>
      <div className="ctn-wrap ctn-footer-legal">
        <span>© 2026 Central Texas Now. All rights reserved.</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Icon, TopBar, Masthead, WeatherWidget, NewsletterBox, Footer });
