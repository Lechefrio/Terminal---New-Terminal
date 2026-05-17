const normalizeDriverName = (name = "") =>
  String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();

const commonsFile = (filename) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=180`;

const photos = {
  "alexander albon": commonsFile("Alex_Albon_(cropped).jpg"),
  "alex albon": commonsFile("Alex_Albon_(cropped).jpg"),
  "fernando alonso": commonsFile("Alonso-68_(24710447098).jpg"),
  "kimi antonelli": commonsFile("Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin,_TX_(cropped).jpg"),
  "andrea kimi antonelli": commonsFile("Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin,_TX_(cropped).jpg"),
  "oliver bearman": commonsFile("2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_(cropped).jpg"),
  "gabriel bortoleto": commonsFile("Gabriel_Bortoleto_(cropped).jpg"),
  "valterri bottas": commonsFile("Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_(028A7556).jpg"),
  "valtteri bottas": commonsFile("Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_(028A7556).jpg"),
  "valtteri botas": commonsFile("Valtteri_Bottas_at_the_2026_Adelaide_Motorsport_Festival_(028A7556).jpg"),
  "franco colapinto": commonsFile("Conferencia_de_prensa_Colapinto_ACA_octubre_2023_-_BugWarp_(13)_(cropped).jpg"),
  "pierre gasly": commonsFile("2022_French_Grand_Prix_(52279065728)_(midcrop).png"),
  "isack hadjar": commonsFile("Isack_Hadjar_2025.png"),
  "lewis hamilton": commonsFile("Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_(54566928382)_(cropped).jpg"),
  "nico hulkenberg": commonsFile("Nico_Hulkenberg_2016_Malaysia.jpg"),
  "nico hülkenberg": commonsFile("Nico_Hulkenberg_2016_Malaysia.jpg"),
  "liam lawson": commonsFile("Liam_Lawson_at_the_Red_Bull_Fan_Zone_–_Crown_Riverwalk,_Melbourne_(028A7792)_(cropped).jpg"),
  "charles leclerc": commonsFile("2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_(cropped2).jpg"),
  "arvid lindblad": commonsFile("Arvid_Lindblad_at_the_Red_Bull_Fan_Zone_–_Crown_Riverwalk,_Melbourne_(028A7869)_(cropped).jpg"),
  "lando norris": commonsFile("2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_(cropped2).jpg"),
  "esteban ocon": commonsFile("Esteban_Ocon_2024_Suzuka_(cropped).jpg"),
  "sergio perez": commonsFile("2021_US_GP_driver_parade_(cropped2).jpg"),
  "sergio pérez": commonsFile("2021_US_GP_driver_parade_(cropped2).jpg"),
  "oscar piastri": commonsFile("Oscar_Piastri_2024_(cropped).jpg"),
  "george russell": commonsFile("KingsLeonSilverstne040724_(28_of_112)_(53838006028)_(cropped).jpg"),
  "carlos sainz": commonsFile("Formula1Gabelhofen2022_(04)_(cropped2).jpg"),
  "carlos sainz jr": commonsFile("Formula1Gabelhofen2022_(04)_(cropped2).jpg"),
  "carlos saintz": commonsFile("Formula1Gabelhofen2022_(04)_(cropped2).jpg"),
  "carlos saintz jr": commonsFile("Formula1Gabelhofen2022_(04)_(cropped2).jpg"),
  "lance stroll": commonsFile("2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_(cropped).jpg"),
  "max verstappen": commonsFile("2024-08-25_Motorsport,_Formel_1,_Großer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_(medium_crop).jpg"),
};

export function getDriverPhoto(name) {
  return photos[normalizeDriverName(name)] || "";
}
