export type SeasonId = 'navidad' | 'madres' | 'verano' | 'otono';

export interface SeasonConfig {
  id: SeasonId;
  name: string;
  badgeLabel: string;
  sublabel: string;
  icon: string;
  primaryColor: string;
  accentColor: string;
  tagline: string;
  ornamentDescription: string;
}

export const SEASONS: Record<SeasonId, SeasonConfig> = {
  navidad: {
    id: 'navidad',
    name: 'Temporada de Navidad & Año Nuevo',
    badgeLabel: '🎄 Edición Navidad',
    sublabel: 'Diciembre & Fin de Año',
    icon: '🎄',
    primaryColor: '#D4AF37',
    accentColor: '#B31317',
    tagline: 'Lazos festivos, guirnaldas de pino, campanas doradas y estrellas de Belén.',
    ornamentDescription: 'Guirnaldas de pino verde en las esquinas, campanas dobles doradas con lazos de terciopelo rojo, copos de nieve de filigrana, muérdago con bayas y lluvia de estrellas doradas.',
  },
  madres: {
    id: 'madres',
    name: 'Temporada Día de las Madres',
    badgeLabel: '💐 Edición Madres',
    sublabel: 'Mayo & Afecto Familiar',
    icon: '💐',
    primaryColor: '#E5B83B',
    accentColor: '#D84B75',
    tagline: 'Rosas bordadas, lazos de seda rosa, jazmines criollos y corazones de filigrana.',
    ornamentDescription: 'Enredaderas de rosas silvestres y jazmín en las esquinas, corazones repujados en oro y lazos de seda con dedicatorias de amor.',
  },
  verano: {
    id: 'verano',
    name: 'Temporada Cacao, Ron & San Juan',
    badgeLabel: '☀️ Edición Verano',
    sublabel: 'Junio a Agosto',
    icon: '☀️',
    primaryColor: '#F5D061',
    accentColor: '#A0522D',
    tagline: 'Mazorcas de cacao criollo, rayos de sol dorados y flores de maracuyá.',
    ornamentDescription: 'Frutos de cacao dorados, hojas de cafeto en flor, ráfagas de sol tropical en orfebrería y barricas de roble añejo.',
  },
  otono: {
    id: 'otono',
    name: 'Temporada Cosecha & Dulces de Olla',
    badgeLabel: '🍂 Edición Cosecha',
    sublabel: 'Septiembre a Noviembre',
    icon: '🍂',
    primaryColor: '#D4AF37',
    accentColor: '#8B4513',
    tagline: 'Atados de canela en rama, hojas de roble tostadas y calderos de cobre.',
    ornamentDescription: 'Ramas de canela Ceilán con cordel rústico, hojas doradas de otoño, estrellas de anís flotantes y pailas de cobre con paletas de madera.',
  },
};
