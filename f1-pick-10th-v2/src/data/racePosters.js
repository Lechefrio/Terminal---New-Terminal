const track = (viewBox, path, rotate = 0) => ({ viewBox, path, rotate });

export const racePosters = [
  {
    id: "canada",
    match: ["2026-can", "can", "canada", "canadian", "montreal", "montréal", "gilles villeneuve"],
    location: "Montréal",
    theme: "red",
    accent: "Grand Prix du Canada",
    track: track("0 0 420 280", "M58 110 C88 84 135 76 152 82 C167 88 150 98 175 104 C204 111 224 98 238 106 C257 118 278 138 303 164 C337 198 374 224 392 235 C370 236 336 224 286 198 C234 171 175 144 130 125 C96 111 70 120 62 137 C49 131 43 123 58 110 Z M76 133 C126 160 202 196 278 226 C308 238 346 246 390 246", -8),
  },
  {
    id: "monaco",
    match: ["2026-mon", "monaco", "monte carlo"],
    location: "Monte Carlo",
    theme: "red",
    accent: "Grand Prix de Monaco",
    track: track("0 0 420 280", "M54 206 C68 182 72 146 92 126 C118 100 152 112 178 118 C210 126 258 118 294 96 C318 82 346 52 358 72 C372 96 330 102 328 128 C326 158 366 150 364 176 C362 204 318 214 286 206 C248 196 226 214 190 224 C148 236 110 218 92 192 C80 176 64 218 54 206 Z M88 188 C96 154 110 122 136 118 C160 114 164 140 190 152", -2),
  },
  {
    id: "barcelona",
    match: ["2026-esp", "2026-bar", "barcelona", "catalunya", "cataluna", "spain", "spanish", "montmelo", "montmeló"],
    location: "Montmeló",
    theme: "gold",
    accent: "Barcelona-Catalunya",
    track: track("0 0 420 280", "M44 140 C52 100 88 86 132 88 L228 90 C254 92 266 120 246 138 L212 164 L292 166 C330 168 354 146 380 160 C406 174 390 212 354 204 C314 196 294 184 260 190 L96 196 C54 198 28 172 44 140 Z M70 136 C98 138 126 132 146 112 C164 96 190 98 204 116", 0),
  },
  {
    id: "austria",
    match: ["2026-aut", "austria", "austrian", "spielberg", "red bull ring"],
    location: "Spielberg",
    theme: "red",
    accent: "Austrian Grand Prix",
    track: track("0 0 420 280", "M74 86 L224 94 C252 96 260 112 242 132 C222 154 182 148 154 148 C132 150 124 172 148 186 L332 186 C374 186 382 224 344 236 L142 232 C110 230 92 208 108 180 C118 160 116 134 92 116 C74 102 64 92 74 86 Z", -2),
  },
  {
    id: "great-britain",
    match: ["2026-gbr", "british", "great britain", "silverstone", "uk"],
    location: "Silverstone",
    theme: "blue",
    accent: "British Grand Prix",
    track: track("0 0 420 280", "M94 86 C126 82 174 88 204 104 L316 182 C354 210 328 248 292 230 L226 196 C198 182 170 206 136 190 C104 176 104 144 126 132 C98 118 78 108 94 86 Z M136 132 C164 110 202 116 226 144 C244 164 230 190 204 190", 8),
  },
  {
    id: "belgium",
    match: ["2026-bel", "belgium", "belgian", "spa", "francorchamps"],
    location: "Spa-Francorchamps",
    theme: "red",
    accent: "Belgian Grand Prix",
    track: track("0 0 420 280", "M54 188 C78 132 128 98 180 82 C230 66 268 58 292 66 C318 74 310 90 336 88 C372 86 394 112 374 132 C348 154 318 128 294 150 C270 172 322 196 286 220 C250 244 218 198 176 206 C132 214 92 224 54 188 Z M70 184 C102 156 128 158 150 176 C176 196 196 196 226 174", 2),
  },
  {
    id: "hungary",
    match: ["2026-hun", "hungary", "hungarian", "mogyorod", "mogyoród", "hungaroring"],
    location: "Mogyoród",
    theme: "green",
    accent: "Hungarian Grand Prix",
    track: track("0 0 420 280", "M132 70 C178 72 208 102 228 132 C244 156 272 138 284 162 C302 198 256 214 224 200 C188 184 184 222 144 216 C112 212 114 178 116 146 C118 116 96 104 104 84 C104 74 116 70 132 70 Z M128 84 C150 104 148 138 132 166 C120 190 140 202 166 194", 0),
  },
  {
    id: "netherlands",
    match: ["2026-ned", "dutch", "netherlands", "zandvoort"],
    location: "Zandvoort",
    theme: "orange",
    accent: "Dutch Grand Prix",
    track: track("0 0 420 280", "M142 50 C166 48 172 68 158 100 C146 128 148 152 176 144 C214 132 266 128 306 144 C340 158 332 194 300 198 C256 204 222 186 184 204 C146 222 112 208 118 172 C124 136 116 104 128 76 C132 62 136 52 142 50 Z M150 96 C178 110 184 136 172 166 C160 196 136 212 104 196", 3),
  },
  {
    id: "italy",
    match: ["2026-ita", "italy", "italian", "monza"],
    location: "Monza",
    theme: "green",
    accent: "Gran Premio d'Italia",
    track: track("0 0 420 280", "M118 56 C162 94 188 144 216 174 L356 176 C384 178 392 202 366 218 L170 216 C138 214 124 190 134 164 C146 134 112 104 88 78 C74 64 98 42 118 56 Z", -1),
  },
  {
    id: "madrid",
    match: ["2026-mad", "madrid", "madring", "spain madrid", "spanish madrid"],
    location: "Madrid",
    theme: "gold",
    accent: "Gran Premio de España",
    track: track("0 0 420 280", "M48 178 C56 110 112 74 176 76 C210 78 226 98 248 94 C276 88 310 72 340 84 C374 98 360 138 322 136 C278 134 254 158 258 190 C262 222 224 238 196 216 C170 196 146 216 112 208 C74 200 44 198 48 178 Z M86 182 C118 184 134 162 126 136 C120 112 136 96 164 94", -5),
  },
  {
    id: "azerbaijan",
    match: ["2026-aze", "azerbaijan", "baku"],
    location: "Baku",
    theme: "cyan",
    accent: "Azerbaijan Grand Prix",
    track: track("0 0 420 280", "M46 178 L96 150 L142 160 L290 72 L360 78 L356 128 L258 126 L190 184 L108 222 Z M108 222 L78 204 L46 178 M190 184 L238 214 L328 210", -11),
  },
  {
    id: "singapore",
    match: ["2026-sin", "singapore", "marina bay"],
    location: "Marina Bay",
    theme: "red",
    accent: "Singapore Grand Prix",
    track: track("0 0 420 280", "M74 198 L112 112 L150 152 L314 154 L340 82 L364 84 L356 210 L232 212 L146 204 L126 234 Z M126 234 L102 202 L74 198 M150 152 L126 190", 0),
  },
  {
    id: "united-states",
    match: ["2026-usa", "united states", "usa", "austin", "cota", "americas", "circuit of the americas"],
    location: "Austin",
    theme: "blue",
    accent: "United States Grand Prix",
    track: track("0 0 420 280", "M58 194 L120 150 C144 130 166 110 198 96 L344 54 C356 52 364 62 356 74 L310 136 C288 170 256 184 218 180 C188 176 178 200 150 214 C114 232 84 216 58 194 Z M120 150 C142 172 164 166 176 146 C188 126 208 126 224 144", -2),
  },
  {
    id: "mexico-city",
    match: ["2026-mex", "mexico", "mexico city", "ciudad de mexico", "ciudad de méxico"],
    location: "Mexico City",
    theme: "green",
    accent: "Gran Premio de la Ciudad de México",
    track: track("0 0 420 280", "M54 172 L286 58 C328 44 354 66 354 106 L350 220 L314 248 L294 182 L108 202 C76 206 50 194 54 172 Z M86 178 L118 160 L136 188 L238 178 L268 198", -10),
  },
  {
    id: "sao-paulo",
    match: ["2026-bra", "sao paulo", "são paulo", "brazil", "brazilian", "interlagos"],
    location: "São Paulo",
    theme: "green",
    accent: "Grande Prêmio de São Paulo",
    track: track("0 0 420 280", "M72 126 C132 82 224 70 312 78 C354 82 368 116 340 144 C314 170 292 154 276 182 C252 222 194 236 136 218 C86 204 42 170 72 126 Z M136 218 L134 158 C134 118 168 94 216 90 M276 182 C248 160 254 124 292 106", 0),
  },
  {
    id: "las-vegas",
    match: ["2026-lvg", "2026-las", "las vegas", "vegas", "the strip"],
    location: "The Strip",
    theme: "purple",
    accent: "Las Vegas Grand Prix",
    track: track("0 0 420 280", "M58 168 L94 104 C102 82 136 76 144 102 L146 138 L280 138 L310 80 C324 58 354 72 342 98 L316 220 L94 220 Z M94 220 L58 168 M146 138 L146 220", 0),
  },
  {
    id: "qatar",
    match: ["2026-qat", "qatar", "lusail", "losail"],
    location: "Lusail",
    theme: "maroon",
    accent: "Qatar Grand Prix",
    track: track("0 0 420 280", "M94 86 C122 64 152 84 144 124 C138 156 166 160 182 126 C202 84 234 72 250 104 C266 136 238 156 250 188 C264 222 324 210 336 164 C346 124 378 100 388 136 C402 190 360 232 304 236 L108 236 C74 236 54 210 70 180 C86 150 68 110 94 86 Z", 0),
  },
  {
    id: "abu-dhabi",
    match: ["2026-abu", "2026-uae", "abu dhabi", "yas", "yas island"],
    location: "Yas Island",
    theme: "green",
    accent: "Abu Dhabi Grand Prix",
    track: track("0 0 420 280", "M64 220 L104 98 L336 96 L356 108 L286 148 L246 210 L186 162 L134 232 Z M104 98 L150 150 L186 162 M246 210 L216 238 L134 232", 0),
  },
];

const normalize = (value = "") =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function getRacePoster(dashboard = {}) {
  const haystack = normalize([
    dashboard.raceId,
    dashboard.raceCode,
    dashboard.nextRace,
    dashboard.raceName,
    dashboard.venue,
    dashboard.location,
    dashboard.city,
  ].filter(Boolean).join(" "));

  return racePosters.find((poster) => poster.match.some((term) => haystack.includes(normalize(term)))) || racePosters[0];
}
