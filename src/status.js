// Horaires : du mardi au dimanche, 18h → 2h (fermé le lundi soir).
// day : 0 = dimanche … 6 = samedi, heure de Paris.
export function status(day, hour) {
  if (hour < 2) return day === 2 ? 'Ouvre ce soir à 18h' : 'Ouvert jusqu’à 2h' // la nuit appartient à la veille
  if (hour >= 18) return day === 1 ? 'Fermé le lundi' : 'Ouvert jusqu’à 2h'
  return day === 1 ? 'Fermé le lundi' : 'Ouvre ce soir à 18h'
}

export function parisNow(now = new Date()) {
  const p = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }))
  const label = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris', weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
  }).format(now)
  return { label, open: status(p.getDay(), p.getHours()) }
}
