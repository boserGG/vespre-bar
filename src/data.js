// Photos Unsplash, licence gratuite Unsplash, servies depuis leur CDN.
export const photo = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=72`
export const srcSet = (id) => [480, 800, 1200, 1800, 2400].map((w) => `${photo(id, w)} ${w}w`).join(', ')

export const PH = {
  comptoir: { id: '1767022724924-993b00fc04b3', by: 'Intricate Explorer' },
  salle: { id: '1578911489158-334e5cd2a051', by: 'Klara Kulikova' },
  barman: { id: '1761335633357-04fab36b333f', by: 'Jonathan Ikemura' },
  versement: { id: '1770164491578-09f08156db2d', by: 'Hybrid Storytellers' },
  bougie: { id: '1768949005507-8c0f571285f4', by: 'Orion Stephens' },
  orange: { id: '1778104959337-5260c89e2293', by: 'Milan Trninic' },
  cerise: { id: '1776018396028-d40694777383', by: 'David Valentine' },
  sepia: { id: '1781785162713-41d46465b35b', by: 'Sandie Clarke' },
  martini: { id: '1773188243990-b50e86881bd7', by: 'Brandee Taylor' },
  fume: { id: '1777791375151-a1123bc02802', by: 'Khanh Do' },
  figurine: { id: '1777791374515-372807e0228a', by: 'Khanh Do' },
}

export const NAV = [
  { id: '#carte', label: 'La carte' },
  { id: '#lieu', label: 'Le lieu' },
  { id: '#soirees', label: 'Soirées' },
  { id: '#reserver', label: 'Réserver' },
]

export const CARTE = [
  { nom: 'Épreuve', notes: 'Cognac, miel de châtaignier brûlé, amer d’orange', base: 'Cognac', prix: 19, p: PH.orange },
  { nom: 'Encre noire', notes: 'Rhum ambré, griotte, vermouth rouge, fumée de chêne', base: 'Rhum', prix: 18, p: PH.cerise },
  { nom: 'Grain fin', notes: 'Whisky tourbé, figue rôtie, cacao, sel fumé', base: 'Whisky', prix: 21, p: PH.fume },
  { nom: 'Linotype', notes: 'Gin au poivre de Timut, vermouth sec, olive de Nyons', base: 'Gin', prix: 17, p: PH.martini },
  { nom: 'Papier vergé', notes: 'Bourbon, blanc d’œuf, sirop de sarrasin, noix de muscade', base: 'Bourbon', prix: 18, p: PH.sepia },
  { nom: 'Page blanche', notes: 'Sans alcool. Thé fumé, verjus, coing, tonic de la maison', base: 'Zéro', prix: 13, p: PH.figurine },
]

export const SOIREES = [
  { jour: 'Jeu', date: '26.11', titre: 'Clair-obscur', genre: 'Trio jazz', etat: 'Places' },
  { jour: 'Ven', date: '27.11', titre: 'Sillons', genre: 'Vinyles soul — selecta invitée', etat: 'Complet' },
  { jour: 'Sam', date: '28.11', titre: 'Nuit d’épreuve', genre: 'Carte blanche au chef de bar', etat: 'Places' },
  { jour: 'Jeu', date: '03.12', titre: 'Basse continue', genre: 'Contrebasse & piano', etat: 'Places' },
  { jour: 'Sam', date: '12.12', titre: 'Les distillateurs', genre: 'Dégustation — 6 eaux-de-vie', etat: 'Liste d’attente' },
]

export const PRESSE = ['Nuit Blanche', 'Le Zinc', 'Carnet d’ivresse', 'Rive Droite']
