import { COLORS, COLORS_WITH_ALPHA } from './colors'
import visaLogo from '../assets/visa.png'
import mastercardLogo from '../assets/mastercard.png'
import eloLogo from '../assets/elo.png'
import hipercardLogo from '../assets/hipercard.png'
import amexLogo from '../assets/amex.png'
import gpayLogo from '../assets/gpay.png'
import samsungLogo from '../assets/samsung.png'
import appleLogo from '../assets/apple.png'
import hiperLogo from '../assets/hiper.png'

export const SUMMARY_CARDS = [
  {
    label: 'Faturamento recebido',
    value: 'R$ 245.340,90',
    changeColor: 'text-brand-primary',
    dotColor: COLORS.PRIMARY,
    secondaryDotColor: COLORS_WITH_ALPHA.PRIMARY_ALPHA_25,
  },
  {
    label: 'Faturamento previsto',
    value: 'R$ 815.210,24',
    changeColor: 'text-brand-mint',
    dotColor: COLORS.PURPLE,
    secondaryDotColor: COLORS_WITH_ALPHA.PURPLE_ALPHA_42,
    badge: 'D+2',
  },
  {
    label: 'Vendas pendentes',
    value: 'R$ 15.332,18',
    changeColor: 'text-accent-orange',
    dotColor: COLORS.WARNING,
    secondaryDotColor: COLORS_WITH_ALPHA.WARNING_ALPHA_50,
  },
  {
    label: 'Ticket médio',
    value: 'R$ 192,30',
    changeColor: 'text-accent-lilac',
    dotColor: COLORS.PURPLE_LIGHT,
    secondaryDotColor: COLORS_WITH_ALPHA.PURPLE_LIGHT_ALPHA_45,
  },
  {
    label: 'Número de cobranças',
    value: '12.349',
    changeColor: 'text-neutral-slate',
    dotColor: COLORS.NEUTRAL_MIDNIGHT,
    secondaryDotColor: COLORS_WITH_ALPHA.NEUTRAL_ALPHA_45,
  },
]

export const STATUS_CARDS = [
  {
    label: 'Reembolsos',
    value: 'R$ 8.260,10',
    meta: '233 cobranças',
    delta: '4,5%',
    deltaColor: 'text-[#F89E26]',
    trendColor: COLORS.PRIMARY,
    trend: [15, 18, 16, 20, 28, 32, 30],
  },
  {
    label: 'Chargebacks',
    value: 'R$ 1.260,10',
    meta: '5 cobranças',
    delta: '0,5%',
    deltaColor: 'text-accent-crimson',
    trendColor: COLORS.PURPLE_LIGHT,
    trend: [8, 6, 4, 5, 7, 4, 3],
  },
  {
    label: 'Cancelados',
    value: 'R$ 3.120,60',
    meta: '32 cobranças',
    delta: '1,5%',
    deltaColor: 'text-neutral-slate',
    trendColor: COLORS.PURPLE,
    trend: [10, 12, 11, 14, 12, 10, 9],
  },
  {
    label: 'Não autorizado',
    value: 'R$ 6.120,60',
    meta: '122 cobranças',
    delta: '3,1%',
    deltaColor: 'text-accent-crimson',
    trendColor: COLORS.PRIMARY,
    trend: [20, 18, 22, 24, 21, 18, 16],
  },
]

export const CONVERSION_DATA = [
  { label: 'Crédito', value: 92, color: COLORS.PRIMARY },
  { label: 'Débito', value: 95, color: COLORS.PURPLE },
  { label: 'Boleto', value: 42, color: COLORS.PURPLE_LIGHT },
  { label: 'Pix', value: 98, color: COLORS.PRIMARY_LIGHTER },
]

export const BRAND_BARS = [
  { name: 'Visa', value: 65, logo: visaLogo },
  { name: 'Mastercard', value: 60, logo: mastercardLogo },
  { name: 'Elo', value: 42, logo: eloLogo },
  { name: 'Hipercard', value: 35, logo: hipercardLogo },
  { name: 'American Express', value: 30, logo: amexLogo },
  { name: 'Google Pay', value: 28, logo: gpayLogo },
  { name: 'Samsung Pay', value: 24, logo: samsungLogo },
  { name: 'Apple Pay', value: 38, logo: appleLogo },
  { name: 'Hiper', value: 26, logo: hiperLogo },
]

