/* Central Texas Now — page views: Home, Section, Article. Exported to window. */
const { useEffect: useEffectPages } = React;

/* Resolve a story image: prefer a bundler-inlined blob (standalone export),
   else the normal img/<id>.jpg path used in the live project. */
function CTN_IMG(id) {
  return (window.__resources && window.__resources[id]) || ("img/" + id + ".jpg");
}

/* Photo = a story image. Same id across placements shares the same picture.
   The container carries the brand gradient, so if the image is missing the
   gradient shows through. Navigation lives on headlines, not the image. */
function Photo({ slot, cap, className = "", ratio }) {
  const wrapStyle = {};
  if (ratio) wrapStyle.aspectRatio = ratio;
  const story = window.CTN_DATA.byId(slot);
  if (story && story.hero) wrapStyle.background = story.hero;
  return (
    <div className={"ctn-photo " + className} style={wrapStyle}>
      <image-slot
        id={"img-" + slot}
        src={CTN_IMG(slot)}
        placeholder={cap || "Drop a photo"}
        radius="3"
        style={{ width: "100%", height: "100%", display: "block" }}
      ></image-slot>
    </div>
  );
}

function Kicker({ children, onClick }) { return <div className="ctn-kicker" onClick={onClick}>{children}</div>; }

function Byline({ a, dot }) {
  return (
    <div className="ctn-byline">
      By <b>{a.author}</b>{dot ? <> · {a.date}</> : null}
    </div>
  );
}

/* ============ HOME (The Signal) ============ */
function HomePage({ go }) {
  const D = window.CTN_DATA;
  const lead = D.byId("fort-cavazos-barracks");
  const latest = ["loop-172-expansion", "belton-lake-reopens", "temple-isd-four-day", "heat-advisory"].map(D.byId);
  const featured = D.byId("silos-district-growth");
  const sideTop = ["matt-baker-appeal", "baylor-recruit", "killeen-san-juan-sister-cities", "mama-cat-dachshund-puppies"].map(D.byId);
  const trio = ["matt-baker-appeal", "griner-freshman-of-the-year", "mama-cat-dachshund-puppies"].map(D.byId);
  const legacy = ["killeen-san-juan-sister-cities", "fort-hood-widow-remembers", "griner-freshman-of-the-year", "matt-baker-appeal"].map(D.byId);
  const open = (id) => () => go("article/" + id);

  return (
    <div className="ctn-home">
      {/* full-bleed hero — image behind, headline navigates */}
      <section className="ctn-hero" style={{ background: lead.hero }}>
        <image-slot
          id={"img-" + lead.id}
          src={CTN_IMG(lead.id)}
          placeholder="Drop the lead photo"
          className="ctn-hero-slot"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
        ></image-slot>
        <div className="ctn-hero-overlay"></div>
        <div className="ctn-hero-cred">Photo · Fort Cavazos Garrison Command</div>
        <div className="ctn-hero-inner">
          <div className="ctn-wrap">
            <span className="ctn-hero-flag" onClick={open(lead.id)}>{lead.kicker}</span>
            <h1 className="ctn-hero-h"><a onClick={open(lead.id)}>{lead.title}</a></h1>
            <p className="ctn-hero-dek">{lead.dek}</p>
            <div className="ctn-hero-by">By {lead.author} · {lead.readMin} min read</div>
          </div>
        </div>
      </section>

      {/* latest strip */}
      <div className="ctn-strip">
        <div className="ctn-wrap ctn-strip-in">
          <div className="ctn-strip-tag">Latest</div>
          <div className="ctn-strip-items">
            {latest.map((a) => (
              <a className="ctn-strip-it" key={a.id} onClick={open(a.id)}>
                <div className="ctn-strip-t">{a.kicker} · {a.date.replace(" hours ago", "h").replace(" hour ago", "h").replace(" min ago", "m")}</div>
                <h4>{a.title}</h4>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="ctn-wrap">
        {/* feature + ranked side */}
        <section className="ctn-feat">
          <article className="ctn-feat-big">
            <Photo slot={featured.id} cap={featured.heroCap} ratio="16/9" />
            <Kicker onClick={open(featured.id)}>{featured.kicker}</Kicker>
            <h2 className="ctn-feat-h"><a onClick={open(featured.id)}>{featured.title}</a></h2>
            <p className="ctn-feat-dek">{featured.dek}</p>
            <Byline a={featured} />
          </article>
          <div className="ctn-feat-side">
            {sideTop.map((a, i) => (
              <div className="ctn-si" key={a.id}>
                <span className="ctn-si-n">{i + 1}</span>
                <div>
                  <h3 className="ctn-si-h"><a onClick={open(a.id)}>{a.title}</a></h3>
                  <div className="ctn-si-m">{D.SECTIONS[a.section].name}{a.flagship ? " · Archive" : ""}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* two-column main + rail */}
        <div className="ctn-mainrail">
          <main>
            <div className="ctn-secline"><span className="ctn-secline-t">More from Central Texas</span><span className="ctn-secline-ru"></span></div>
            <section className="ctn-trio">
              {trio.map((a) => (
                <article className="ctn-tc" key={a.id}>
                  <Photo slot={a.id} cap={a.heroCap} ratio="3/2" />
                  <Kicker onClick={open(a.id)}>{a.kicker}</Kicker>
                  <h3 className="ctn-tc-h"><a onClick={open(a.id)}>{a.title}</a></h3>
                  <p className="ctn-tc-dek">{a.dek}</p>
                  <Byline a={a} dot />
                </article>
              ))}
            </section>

            {/* from the archive — the legacy high-equity URLs */}
            <div className="ctn-secline"><span className="ctn-secline-t">From the Archive</span><span className="ctn-secline-ru"></span></div>
            <section className="ctn-archive">
              {legacy.map((a) => (
                <article className="ctn-ev" key={a.id}>
                  <Photo slot={a.id} cap="" ratio="4/3" />
                  <h4 className="ctn-ev-h"><a onClick={open(a.id)}>{a.title}</a></h4>
                  <div className="ctn-ev-m">{D.SECTIONS[a.section].name} · {a.date}</div>
                </article>
              ))}
            </section>
          </main>

          <aside className="ctn-rail">
            <WeatherWidget />
            <NewsletterBox />
            <div className="ctn-rail-most">
              <h4 className="ctn-rail-h">Most Read</h4>
              {["killeen-san-juan-sister-cities", "matt-baker-appeal", "fort-cavazos-barracks", "griner-freshman-of-the-year", "mama-cat-dachshund-puppies"].map((id, i) => {
                const a = D.byId(id);
                return (
                  <a className="ctn-rail-mr" key={id} onClick={open(id)}>
                    <span className="ctn-rail-mr-n">{i + 1}</span>
                    <span className="ctn-rail-mr-t">{a.title}</span>
                  </a>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ============ SECTION ============ */
function SectionPage({ go, slug }) {
  const D = window.CTN_DATA;
  const sec = D.SECTIONS[slug];
  const arts = D.bySection(slug);
  const lead = arts[0];
  const rest = arts.slice(1);
  const open = (id) => () => go("article/" + id);

  useEffectPages(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <div className="ctn-wrap ctn-section">
      <div className="ctn-section-head">
        <h1>{sec.name}</h1>
        <p>{sec.blurb}</p>
      </div>
      <div className="ctn-mainrail">
        <main>
          {lead ? (
            <article className="ctn-sec-lead">
              <Photo slot={lead.id} cap={lead.heroCap} ratio="16/9" />
              <Kicker onClick={open(lead.id)}>{lead.kicker}</Kicker>
              <h2 className="ctn-feat-h"><a onClick={open(lead.id)}>{lead.title}</a></h2>
              <p className="ctn-feat-dek">{lead.dek}</p>
              <Byline a={lead} dot />
            </article>
          ) : null}
          <div className="ctn-sec-list">
            {rest.map((a) => (
              <article className="ctn-sec-row" key={a.id}>
                <div className="ctn-sec-row-txt">
                  <Kicker onClick={open(a.id)}>{a.kicker}</Kicker>
                  <h3 className="ctn-sec-row-h"><a onClick={open(a.id)}>{a.title}</a></h3>
                  <p className="ctn-sec-row-dek">{a.dek}</p>
                  <Byline a={a} dot />
                </div>
                <Photo slot={a.id} cap="" className="ctn-sec-row-img" ratio="4/3" />
              </article>
            ))}
            {rest.length === 0 ? <p className="ctn-empty">More {sec.name.toLowerCase()} coverage is on the way.</p> : null}
          </div>
        </main>
        <aside className="ctn-rail">
          <WeatherWidget />
          <NewsletterBox />
        </aside>
      </div>
    </div>
  );
}

/* ============ ARTICLE ============ */
function ArticlePage({ go, id }) {
  const D = window.CTN_DATA;
  const a = D.byId(id);
  const open = (x) => () => go("article/" + x);
  useEffectPages(() => { window.scrollTo(0, 0); }, [id]);
  if (!a) return <div className="ctn-wrap ctn-section"><p className="ctn-empty">Story not found.</p></div>;

  const sec = D.SECTIONS[a.section];
  const related = D.bySection(a.section).filter((x) => x.id !== a.id).slice(0, 3);
  const moreFill = related.length < 3 ? D.ARTICLES.filter((x) => x.id !== a.id && x.section !== a.section).slice(0, 3 - related.length) : [];
  const relatedAll = related.concat(moreFill);

  return (
    <div className="ctn-article">
      <div className="ctn-wrap">
        <div className="ctn-crumb">
          <a onClick={() => go("home")}>Home</a> <span>/</span> <a onClick={() => go("section/" + a.section)}>{sec.name}</a>
        </div>
      </div>

      <article className="ctn-wrap ctn-art-body-wrap">
        <header className="ctn-art-head">
          <Kicker>{a.kicker}</Kicker>
          <h1 className="ctn-art-h">{a.title}</h1>
          <p className="ctn-art-dek">{a.dek}</p>
          <div className="ctn-art-meta">
            <div className="ctn-art-author">
              <span className="ctn-art-avatar">{a.author.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
              <span>
                <b>{a.author}</b>{a.role ? <span className="ctn-art-role">{a.role}</span> : null}
              </span>
            </div>
            <div className="ctn-art-when"><Icon name="clock" size={14} /> {a.date} · {a.readMin} min read</div>
          </div>
        </header>

        <figure className="ctn-art-hero">
          <Photo slot={a.id} cap="" ratio="16/9" />
          <figcaption>{a.heroCap}</figcaption>
        </figure>

        <div className="ctn-art-cols">
          <div className="ctn-art-rule"></div>
          <div className="ctn-art-prose">
            {a.flagship ? (
              <div className="ctn-art-flag">This story is part of the Central Texas Now archive.</div>
            ) : null}
            {a.body.map((b, i) => {
              if (b.t === "h") return <h2 key={i} className="ctn-art-sub">{b.x}</h2>;
              if (b.t === "q") return (
                <blockquote key={i} className="ctn-art-quote">
                  <p>{b.x}</p>{b.by ? <cite>{b.by}</cite> : null}
                </blockquote>
              );
              return <p key={i}>{b.x}</p>;
            })}
            <div className="ctn-art-tags">
              {a.tags.map((t) => <span key={t} className="ctn-tag">{t}</span>)}
            </div>
          </div>
        </div>
      </article>

      <section className="ctn-wrap ctn-related">
        <div className="ctn-secline"><span className="ctn-secline-t">More to Read</span><span className="ctn-secline-ru"></span></div>
        <div className="ctn-trio">
          {relatedAll.map((r) => (
            <article className="ctn-tc" key={r.id}>
              <Photo slot={r.id} cap="" ratio="3/2" />
              <Kicker onClick={open(r.id)}>{r.kicker}</Kicker>
              <h3 className="ctn-tc-h"><a onClick={open(r.id)}>{r.title}</a></h3>
              <Byline a={r} dot />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, SectionPage, ArticlePage, Photo });
