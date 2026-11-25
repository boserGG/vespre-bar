import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'
import { CARTE, NAV, PH, PRESSE, SOIREES, photo, srcSet } from './data'
import { parisNow } from './status'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
const MOTION = '(prefers-reduced-motion: no-preference)'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
let lenis = null

function go(e, hash) {
  e?.preventDefault()
  const el = hash === '#top' ? 0 : document.querySelector(hash)
  if (lenis) { lenis.start(); lenis.scrollTo(el, { duration: 1.6 }) } // start : le menu met Lenis en pause
  else if (el === 0) window.scrollTo(0, 0)
  else el?.scrollIntoView()
}

function Img({ p, alt, sizes = '100vw', className = '', reveal = true, eager = false }) {
  return (
    <figure className={`img ${reveal ? 'reveal' : ''} ${className}`}>
      <img src={photo(p.id, 1200)} srcSet={srcSet(p.id)} sizes={sizes} alt={alt}
        loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} decoding="async" />
    </figure>
  )
}

const Mark = (props) => <span {...props}>Vespre<sup>®</sup></span>
const Label = ({ n, children }) => <p className="label" data-fade><span>({n})</span> {children}</p>

function Clock() {
  const [t, setT] = useState(parisNow)
  useEffect(() => {
    const id = setInterval(() => setT(parisNow()), 15000)
    return () => clearInterval(id)
  }, [])
  return <><span className="hide-sm">{t.label}</span><span className="status"><i />{t.open}</span></>
}

function Header({ open, setOpen }) {
  return (
    <header className="header">
      <a href="#top" className="header__logo" onClick={(e) => go(e, '#top')}><Mark /></a>
      <span className="header__meta hide-sm">Lyon — Presqu’île</span>
      <span className="header__meta header__clock"><Clock /></span>
      <button className="header__menu" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
        <span className="header__menu-txt" data-alt={open ? 'Menu' : 'Fermer'}>{open ? 'Fermer' : 'Menu'}</span>
        <span className={`burger ${open ? 'is-open' : ''}`} aria-hidden="true"><i /><i /></span>
      </button>
    </header>
  )
}

function Menu({ open, setOpen }) {
  const root = useRef(null)
  useGSAP(() => {
    const k = reduced() ? 0 : 1
    if (open) {
      lenis?.stop()
      gsap.timeline()
        .set(root.current, { visibility: 'visible' })
        .fromTo(root.current, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 * k, ease: 'expo.inOut' })
        .fromTo('.menu__link span', { yPercent: 110 }, { yPercent: 0, stagger: 0.06, duration: 1 * k, ease: 'expo.out' }, '-=0.45')
        .fromTo('.menu__side > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 * k }, '<0.2')
      root.current.querySelector('a')?.focus({ preventScroll: true })
    } else {
      lenis?.start()
      gsap.to(root.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 0.8 * k, ease: 'expo.inOut', onComplete: () => gsap.set(root.current, { visibility: 'hidden' }) })
    }
  }, { dependencies: [open], scope: root })

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  return (
    <div id="menu" className="menu" ref={root} role="dialog" aria-modal="true" aria-label="Navigation" inert={!open}>
      <nav className="menu__nav">
        {NAV.map((l, i) => (
          <a key={l.id} href={l.id} className="menu__link" onClick={(e) => { setOpen(false); go(e, l.id) }}>
            <span><small>0{i + 1}</small>{l.label}</span>
          </a>
        ))}
      </nav>
      <aside className="menu__side">
        <Img p={PH.versement} alt="" reveal={false} sizes="30vw" className="menu__img" />
        <p>12 passage des Imprimeurs<br />69002 Lyon</p>
        <p>Mardi → dimanche<br />18h — 2h</p>
      </aside>
    </div>
  )
}

function Hero() {
  const root = useRef(null)
  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      const split = SplitText.create('.hero__mark', { type: 'chars', mask: 'chars' })
      gsap.from(split.chars, { yPercent: 118, duration: 1.5, ease: 'expo.out', stagger: 0.055, delay: 0.2 })
      gsap.from('.hero__hint', { opacity: 0, y: 10, duration: 1, delay: 1.1 })

      gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: '+=170%', pin: true, scrub: true } })
        .to('.hero__hint', { opacity: 0, duration: 0.12 }, 0)
        .fromTo('.hero__dark', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 1 }, 0)
        .fromTo('.hero__img', { scale: 1.4, yPercent: -8 }, { scale: 1.06, yPercent: 0, ease: 'none', duration: 1.7 }, 0)
        .from('.hero__ui [data-in]', { y: 40, opacity: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out' }, 0.85)
    })
  }, { scope: root })

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__layer hero__light">
        <h1 className="hero__mark"><Mark /></h1>
        <p className="hero__hint label">(Faites défiler)</p>
      </div>
      <div className="hero__layer hero__dark" aria-hidden="true">
        <img className="hero__img" src={photo(PH.comptoir.id, 1800)} srcSet={srcSet(PH.comptoir.id)} sizes="100vw" alt="" fetchPriority="high" />
        <div className="hero__shade" />
        <p className="hero__mark"><Mark /></p>
      </div>
      <div className="hero__ui">
        <div className="hero__intro">
          <p data-in>Bar à cocktails et salon d’écoute, installé dans une ancienne imprimerie de la Presqu’île. On y boit lentement, à la lumière des bougies.</p>
          <a data-in href="#reserver" className="btn" onClick={(e) => go(e, '#reserver')}>Réserver une table <Arrow /></a>
        </div>
        <ol className="hero__index hide-sm">
          {NAV.map((l, i) => (
            <li key={l.id} data-in><a href={l.id} onClick={(e) => go(e, l.id)}><small>0{i + 1}</small>{l.label}</a></li>
          ))}
        </ol>
        <div className="hero__trust">
          <div className="trust" data-in>
            <div className="trust__faces">
              {[PH.orange, PH.cerise, PH.sepia, PH.martini].map((p) => <img key={p.id} src={photo(p.id, 120)} alt="" />)}
            </div>
            <p>4,9 / 5 — plus de 2 000 soirées<br />servies depuis 2019.</p>
          </div>
          <ul className="presse hide-sm">
            {PRESSE.map((n) => <li key={n} data-in>{n}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

const Arrow = () => (
  <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
)

function Manifeste() {
  return (
    <section className="manifeste dark" id="manifeste">
      <Label n="01">Manifeste</Label>
      <p className="manifeste__text" data-words>
        Ici, la nuit se boit lentement. Sous les poutres noircies de l’imprimerie Vial, nous servons des cocktails d’auteur, des disques choisis plutôt que des playlists, et trente-huit places — pas une de plus.
      </p>
      <div className="manifeste__media">
        <Img p={PH.bougie} alt="Une bougie posée sur le comptoir" sizes="(max-width: 760px) 60vw, 26vw" className="m1" />
        <Img p={PH.versement} alt="Un whisky versé sur un gros glaçon" sizes="(max-width: 760px) 80vw, 38vw" className="m2" />
      </div>
      <ul className="stats">
        {[[1928, 'Année de l’imprimerie'], [38, 'Places, pas une de plus'], [214, 'Références au comptoir'], [6, 'Soirs par semaine']].map(([n, t]) => (
          <li key={t} data-fade><strong data-count={n}>{n}</strong><span>{t}</span></li>
        ))}
      </ul>
    </section>
  )
}

function Carte() {
  // active : image qui se dévoile ; last : image précédente, gardée dessous pendant la transition.
  const [{ active, last }, setShown] = useState({ active: 0, last: -1 })
  const show = (i) => setShown((s) => (s.active === i ? s : { active: i, last: s.active }))

  return (
    <section className="carte light" id="carte">
      <div className="sec-head">
        <Label n="02">La carte — Hiver 2026</Label>
        <h2 className="h2" data-lines>Six signatures,<br /><em>une saison.</em></h2>
      </div>
      <div className="carte__body">
      <ul className="carte__list">
        {CARTE.map((c, i) => (
          <li key={c.nom} className={`row carte__row ${i === active ? 'is-active' : ''}`} data-fade onPointerEnter={() => show(i)}>
            <span className="carte__n">0{i + 1}</span>
            <img className="carte__thumb" src={photo(c.p.id, 200)} alt="" loading="lazy" />
            <h3 className="carte__nom">{c.nom}</h3>
            <p className="carte__notes">{c.notes}</p>
            <span className="carte__base label">{c.base}</span>
            <span className="carte__prix">{c.prix} €</span>
          </li>
        ))}
      </ul>
      <aside className="carte__aside" aria-hidden="true" data-fade>
        <div className="carte__frame">
          {CARTE.map((c, i) => (
            <img key={c.nom} src={photo(c.p.id, 800)} alt="" loading="lazy"
              className={i === active ? 'is-active' : i === last ? 'is-last' : ''} />
          ))}
        </div>
        <p className="carte__caption label"><span>0{active + 1}</span> {CARTE[active].nom} — {CARTE[active].base}</p>
      </aside>
      </div>
    </section>
  )
}

function Lieu() {
  return (
    <section className="lieu dark" id="lieu">
      <div className="lieu__hero">
        <Img p={PH.salle} alt="La salle de Vespre, lumières basses et banquettes" className="lieu__img" />
        <div className="lieu__over">
          <Label n="03">Le lieu</Label>
          <h2 className="lieu__title" data-chars>L’imprimerie</h2>
        </div>
      </div>
      <div className="lieu__grid">
        <div className="lieu__text">
          <p className="lead" data-lines>Les presses sont parties en 1987. Il reste les poutres, le parquet taché d’encre et une lumière qui ne dépasse jamais celle d’une bougie.</p>
          <p data-fade>Un comptoir de chêne de onze mètres, une platine, deux cents vinyles et un fond de salle où l’on parle bas. Le chef de bar compose la carte avec les producteurs de la vallée du Rhône, au fil des saisons.</p>
        </div>
        <Img p={PH.barman} alt="Le chef de bar prépare un cocktail" sizes="(max-width: 760px) 90vw, 40vw" className="lieu__portrait" />
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k}>Cocktails d’auteur <i>✺</i> Vinyles <i>✺</i> Clair-obscur <i>✺</i> Eaux-de-vie rares <i>✺</i> Trente-huit places <i>✺</i>&nbsp;</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Soirees() {
  return (
    <section className="soirees light" id="soirees">
      <div className="sec-head">
        <Label n="04">Soirées</Label>
        <h2 className="h2" data-lines>Ce qui se joue<br /><em>au comptoir.</em></h2>
      </div>
      <ul className="soirees__list">
        {SOIREES.map((s) => (
          <li key={s.date} className="row soiree" data-fade>
            <span className="soiree__date"><small>{s.jour}</small>{s.date}</span>
            <h3 className="soiree__titre">{s.titre}</h3>
            <p className="soiree__genre">{s.genre}</p>
            <span className={`soiree__etat label ${s.etat === 'Complet' ? 'is-full' : ''}`}>{s.etat}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Magnetic({ children, ...props }) {
  const el = useRef(null)
  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches || reduced()) return
    const x = gsap.quickTo(el.current, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const y = gsap.quickTo(el.current, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e) => {
      const r = el.current.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * 0.3); y((e.clientY - r.top - r.height / 2) * 0.3)
    }
    const leave = () => { x(0); y(0) }
    const node = el.current
    node.addEventListener('pointermove', move)
    node.addEventListener('pointerleave', leave)
    return () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave) }
  })
  return <button ref={el} {...props}>{children}</button>
}

function Reserver() {
  const [sent, setSent] = useState(false)
  return (
    <section className="reserver dark" id="reserver">
      <div className="reserver__grid">
        <div>
          <Label n="05">Réserver</Label>
          <h2 className="h2 h2--xl" data-lines>Une table<br /><em>vous attend.</em></h2>
        </div>
        <form className="form" data-fade onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
          <label className="field"><span className="label">Nom</span><input required name="nom" autoComplete="name" placeholder="Votre nom" /></label>
          <label className="field"><span className="label">Date</span><input required type="date" name="date" /></label>
          <label className="field"><span className="label">Heure</span>
            <select name="heure" defaultValue="20:00">{['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].map((h) => <option key={h}>{h}</option>)}</select>
          </label>
          <label className="field"><span className="label">Couverts</span>
            <select name="couverts" defaultValue="2">{[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</select>
          </label>
          <Magnetic className="btn btn--big" type="submit">Demander une table <Arrow /></Magnetic>
          <p className="form__note" role="status">{sent ? 'Merci. Vespre est un bar fictif : aucune demande n’a été envoyée.' : ''}</p>
        </form>
      </div>
      <div className="infos">
        <div data-fade><p className="label">Adresse</p><p>12 passage des Imprimeurs<br />69002 Lyon — Presqu’île</p></div>
        <div data-fade><p className="label">Horaires</p><p>Mardi → dimanche<br />18h — 2h</p></div>
        <div data-fade><p className="label">Écrire</p><p>bonsoir@vespre.bar<br />@vespre.lyon</p></div>
      </div>
    </section>
  )
}

const NOTICE_KEY = 'vespre-notice-vu'
const seen = () => { try { return sessionStorage.getItem(NOTICE_KEY) } catch { return null } }

// Avertissement « projet fictif », affiché une fois par visite.
function Notice() {
  const ref = useRef(null)
  useEffect(() => {
    if (seen()) return
    const id = setTimeout(() => {
      const d = ref.current
      if (!d || d.open) return
      d.showModal()
      lenis?.stop()
      if (reduced()) return
      gsap.timeline()
        .from(d, { opacity: 0, duration: 0.5 })
        .from('.notice__card', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, 0)
        .from('.notice__card > *', { y: 18, opacity: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out' }, 0.45)
    }, 1800)
    return () => clearTimeout(id)
  }, [])

  const close = () => {
    try { sessionStorage.setItem(NOTICE_KEY, '1') } catch { /* navigation privée : on ignore */ }
    const d = ref.current
    const done = () => { d.close(); lenis?.start(); gsap.set(d, { clearProps: 'opacity' }) }
    if (reduced()) return done()
    gsap.to(d, { opacity: 0, duration: 0.45, ease: 'power2.inOut', onComplete: done })
  }

  return (
    <dialog ref={ref} className="notice" aria-labelledby="notice-title" aria-describedby="notice-desc"
      onCancel={(e) => { e.preventDefault(); close() }} onClick={(e) => e.target === ref.current && close()}>
      <div className="notice__card">
        <button className="notice__close" onClick={close} aria-label="Fermer l’avertissement">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
        <p className="label"><span>(Avis)</span> Projet fictif</p>
        <h2 id="notice-title" className="notice__title">Ce bar <em>n’existe pas.</em></h2>
        <p id="notice-desc">
          Vespre est une page de présentation réalisée pour démontrer des compétences en design et en développement web.
          Le nom, l’adresse, la carte, les avis, les mentions presse, les soirées et la réservation sont inventés.
        </p>
        <p className="notice__small">
          Les photos proviennent d’Unsplash, sous licence gratuite. Les personnes qui y apparaissent n’ont aucun lien avec ce projet.
        </p>
        <button className="btn" onClick={close}>Découvrir le site <Arrow /></button>
      </div>
    </dialog>
  )
}

function Footer() {
  return (
    <footer className="footer dark">
      <p className="footer__mark" data-chars aria-label="Vespre">Vespre</p>
      <div className="footer__row">
        <p>© 2026 Vespre® — bar fictif, site de présentation.</p>
        <p className="footer__credits">Photos Unsplash : {[...new Set(Object.values(PH).map((p) => p.by))].join(', ')}.</p>
        <a href="#top" onClick={(e) => go(e, '#top')}>Haut de page ↑</a>
      </div>
    </footer>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (reduced()) return
    lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null }
  }, [])

  useGSAP(() => {
    gsap.matchMedia().add(MOTION, () => {
      gsap.from('.header > *', { opacity: 0, y: -12, stagger: 0.08, duration: 1, ease: 'power3.out', delay: 0.6 })
      // Header : se cache en descendant, revient en remontant (évite qu'il recouvre les grands titres).
      const hdr = gsap.to('.header', { yPercent: -130, paused: true, duration: 0.6, ease: 'power3.inOut' })
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => (s.direction === 1 && s.scroll() > window.innerHeight * 0.6 ? hdr.play() : hdr.reverse()) })
      const header = document.querySelector('.header')
      const show = () => hdr.reverse()
      header.addEventListener('focusin', show)

      gsap.from('.gridlines i', { scaleY: 0, transformOrigin: 'top', stagger: 0.12, duration: 1.8, ease: 'expo.inOut', delay: 0.3 })

      // Images : se dévoilent de haut en bas pendant le défilement, complètes au centre de l'écran.
      gsap.utils.toArray('.reveal').forEach((fig) => {
        gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top bottom', end: 'center center', scrub: true } })
          .fromTo(fig, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' })
          .fromTo(fig.querySelector('img'), { scale: 1.3, yPercent: -8 }, { scale: 1, yPercent: 0, ease: 'none' }, 0)
      })

      gsap.utils.toArray('[data-words]').forEach((el) => {
        const s = SplitText.create(el, { type: 'words' })
        gsap.from(s.words, { opacity: 0.14, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 50%', scrub: true } })
      })

      gsap.utils.toArray('[data-lines]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines', mask: 'lines', autoSplit: true,
          onSplit: (s) => gsap.from(s.lines, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: el, start: 'top 85%' } }),
        })
      })

      gsap.utils.toArray('[data-chars]').forEach((el) => {
        const s = SplitText.create(el, { type: 'chars', mask: 'chars' })
        gsap.from(s.chars, { yPercent: 115, duration: 1.4, ease: 'expo.out', stagger: 0.045, scrollTrigger: { trigger: el, start: 'top 80%' } })
      })

      gsap.utils.toArray('[data-fade]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 28, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
      })

      gsap.utils.toArray('[data-count]').forEach((el) => {
        const n = +el.dataset.count
        const o = { v: n > 1000 ? 1800 : 0 }
        gsap.to(o, { v: n, duration: 2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = Math.round(o.v) } })
      })
      return () => header.removeEventListener('focusin', show)
    })
  })

  return (
    <>
      <a href="#manifeste" className="skip">Aller au contenu</a>
      <div className="gridlines" aria-hidden="true"><i /><i /><i /></div>
      <Header open={open} setOpen={setOpen} />
      <Menu open={open} setOpen={setOpen} />
      <main>
        <Hero />
        <Manifeste />
        <Carte />
        <Lieu />
        <Soirees />
        <Reserver />
      </main>
      <Footer />
      <Notice />
    </>
  )
}
