# Vespre® — site vitrine d’un bar fictif

> **Projet fictif.** Vespre n’existe pas. Ce site est une page de présentation réalisée pour démontrer des compétences en design et en développement web. Le nom, l’adresse, la carte, les avis, les mentions presse, les soirées et le formulaire de réservation sont inventés. Le formulaire n’envoie aucune donnée.

Site vitrine pour un bar à cocktails imaginaire, installé dans une ancienne imprimerie de la Presqu’île de Lyon. Le site mise sur la direction artistique et le mouvement :

- ouverture plein écran : la photo se dévoile au défilement et le titre change de couleur au passage du rideau ;
- images révélées de haut en bas au fil du défilement, complètes au centre de l’écran ;
- défilement fluide, menu plein écran, textes animés mot par mot et ligne par ligne ;
- carte des cocktails avec image fixe qui change au survol ;
- mise en page adaptée au mobile, et prise en compte du réglage « réduire les animations ».

## Technologies

[React](https://react.dev) · [Vite](https://vite.dev) · [GSAP](https://gsap.com) (ScrollTrigger, SplitText) · [Lenis](https://lenis.darkroom.engineering) · CSS natif

## Lancer le projet

Node.js 20.19+ ou 22.12+ est requis.

```bash
npm install
npm run dev      # http://vespre-bar.localhost:5191
npm run build    # version de production dans dist/
npm run preview  # prévisualise le build
npm test         # vérifie le calcul des horaires d’ouverture
```

## Déploiement sur Netlify

Le fichier `netlify.toml` contient déjà la configuration : commande `npm run build`, dossier publié `dist`, Node 22. Il suffit d’importer le dépôt GitHub dans Netlify.

## Structure

```
src/
  App.jsx       sections du site et animations
  data.js       contenus (carte, soirées, photos)
  status.js     horaires d’ouverture (heure de Paris)
  styles.css    styles
public/         favicon
```

## Crédits

### Photographies

Photos publiées sur [Unsplash](https://unsplash.com) sous la [licence Unsplash](https://unsplash.com/license), gratuite. Elles sont chargées depuis le CDN d’Unsplash et ne sont pas incluses dans ce dépôt. Les personnes visibles sur les photos n’ont aucun lien avec ce projet.

Intricate Explorer, Klara Kulikova, Jonathan Ikemura, Hybrid Storytellers, Orion Stephens, Milan Trninic, David Valentine, Sandie Clarke, Brandee Taylor, Khanh Do.

### Polices

Polices distribuées via [Fontsource](https://fontsource.org), sous licence [SIL Open Font License 1.1](https://openfontlicense.org) :

- [Inter Tight](https://github.com/rsms/inter-tight), © The Inter Project Authors
- [Instrument Serif](https://github.com/Instrument/instrument-serif), © The Instrument Serif Project Authors
- [Fragment Mono](https://github.com/weiweihuanghuang/fragment-mono), © The Fragment-Mono Project Authors

Les textes complets des licences se trouvent dans `node_modules/@fontsource*/*/LICENSE` après `npm install`.

### Bibliothèques

- React, React DOM, Vite, Lenis : licence MIT
- GSAP et @gsap/react : [licence standard gratuite de GSAP](https://gsap.com/standard-license)

## Licence

Le code source de ce projet est publié sous [licence MIT](LICENSE). Elle ne s’applique pas aux photographies, aux polices ni aux bibliothèques tierces, qui gardent leur propre licence.
