import { BucketProps } from '@/types/storage'

// TODO: get these urls via api
const bedroom = [
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/0rileMqXqBp4zRxAJtBH2.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/3v_ggRM6pFYVWaqiS5YnX.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/610cPh9stuAEpW77RH3Xf.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/OZzZkCDbfEJ8VofetzZsB.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/Sd7Cze5X-fWTK9xWOlBbE.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/U06bB_DNU1NBk9xWQ38UC.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/ZIQchQEac_wjQrwO6pbze.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/ZgAzgVsuRZSNJTLEIg_sz.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/dP6ECQhAbJhKPF-V54yEt.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/hy2FDRUhLVvW1I_Qrrz9z.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/oRUTTUBiN2PklJsWmu4do.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bedroom/uXNN7DgHiH873Tn7BAuwL.jpg',
]

const bathroom = [
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/1fif3LgMNCgwTrxHNel-Y.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/PNHzgdMEaBmognKlS2-pV.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/U7yjplcKlDusuZ-j0RlBc.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/Ua720LkPE_q9l1-ZMNVxC.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/Uz3XeZmY-rv3SDGiUZRL4.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/Y8VBHLP3eTd8Vx7cSekRh.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/ZFp52MF_f1HsBEla-0N8K.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/eILpHe4AMEIup7gr4DeOH.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/gSHJHMGNp86AQC9JwcWk1.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/k-h1TejH1Dif0eiu05W9X.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/oZ7WWuHj1-5PremxKHAPo.jpg',
  'https://yxoqmnwlixhxdxtgjthx.supabase.co/storage/v1/object/public/rooms-bathroom/oZ7WWuHj1-5PremxKHAPo.jpg',
]

const getRandomImage = (of: BucketProps) => {
  switch (of) {
    case 'bedroom':
      return bedroom[Math.floor(Math.random() * bedroom.length)]

    case 'bathroom':
      return bathroom[Math.floor(Math.random() * bathroom.length)]
  }
}

export default getRandomImage
