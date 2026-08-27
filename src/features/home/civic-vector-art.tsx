type ArtProps = { className?: string };

export function ParliamentArt({ className }: ArtProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 420 260">
    <path d="M42 199h336M62 215h296" />
    <path d="M75 194v-54c0-18 14-32 32-32h206c18 0 32 14 32 32v54" />
    <path d="M89 108c19-37 65-61 121-61s102 24 121 61" />
    <path d="M111 107c18-24 55-40 99-40s81 16 99 40" />
    <path d="M210 48V20m0 0 36 9-36 10" />
    <path d="M97 138h226M97 161h226M97 184h226" />
    {Array.from({ length: 12 }, (_, index) => <path d={`M${111 + index * 18} 111v82`} key={index} />)}
    <path d="M54 137h21m270 0h21M42 199l20-16m316 16-20-16" />
    <circle cx="210" cy="89" r="8" />
  </svg>;
}

export function IndiaGateArt({ className }: ArtProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 320 260">
    <path d="M57 220h206M73 205h174M89 189h142" />
    <path d="M100 188V79h120v109" />
    <path d="M113 79V57h94v22M126 57V38h68v19M143 38V24h34v14" />
    <path d="M128 188v-60c0-19 14-34 32-34s32 15 32 34v60" />
    <path d="M107 102h106M107 116h106" />
    <path d="M110 137h18m64 0h18M110 154h18m64 0h18" />
    <path d="M89 189 73 205m158-16 16 16" />
    <circle cx="160" cy="69" r="5" />
  </svg>;
}

export function ConstitutionArt({ className }: ArtProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 320 260">
    <path d="M62 51h196v161H62z" />
    <path d="M78 67h164v129H78z" />
    <path d="M103 91h114M113 175h94" />
    <circle cx="160" cy="132" r="34" />
    <circle cx="160" cy="132" r="5" />
    {Array.from({ length: 12 }, (_, index) => <path d="M160 102v25" key={index} transform={`rotate(${index * 30} 160 132)`} />)}
    <path d="M112 224h96M128 212v12m64-12v12" />
  </svg>;
}

export function GandhiArt({ className }: ArtProps) {
  return <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 320 360">
    <path d="M117 102c1-43 20-70 50-70 31 0 49 27 47 70-1 38-22 72-49 72-26 0-47-33-48-72Z" />
    <path d="M128 65c10-20 24-29 41-29 18 0 32 10 40 30M133 137c9 12 20 18 33 18 14 0 25-6 34-19" />
    <circle cx="143" cy="94" r="17" /><circle cx="190" cy="94" r="17" /><path d="M160 94h13m-47-3-17-5m98 5 17-5" />
    <path d="M162 96c-4 14-6 24-6 30 5 4 11 5 18 2M152 141c10 5 19 5 29 0" />
    <path d="M119 171c-34 18-53 47-58 88m145-88c30 18 47 48 52 88" />
    <path d="M120 172c8 44 23 75 47 92 21-18 36-49 43-92" />
    <path d="M89 214c29 28 55 55 78 82 22-25 43-52 64-82M105 276l-11 57m130-57 12 57M74 333h188" />
    <path d="M66 142c5 42 6 84 4 126M61 143h18" />
    <path d="M109 203c17 11 35 17 56 17 22 0 41-6 58-18" />
    <path d="M132 174c-1 18-6 34-14 48m81-49c2 18 7 34 15 48" />
  </svg>;
}
