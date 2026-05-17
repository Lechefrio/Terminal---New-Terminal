const normalizeDriverName = (name = "") =>
  String(name)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();

const photos = {
  "alexander albon": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Alex_Albon_%28cropped%29.jpg/160px-Alex_Albon_%28cropped%29.jpg",
  "alex albon": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Alex_Albon_%28cropped%29.jpg/160px-Alex_Albon_%28cropped%29.jpg",
  "fernando alonso": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Alonso-68_%2824710447098%29.jpg/160px-Alonso-68_%2824710447098%29.jpg",
  "kimi antonelli": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg/160px-Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg",
  "andrea kimi antonelli": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg/160px-Kimi_Antonelli_at_the_2025_US_Grand_Prix_in_Austin%2C_TX_%28cropped%29.jpg",
  "oliver bearman": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg/160px-2025_Japan_GP_-_Haas_-_Oliver_Bearman_-_Thursday_%28cropped%29.jpg",
  "gabriel bortoleto": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Gabriel_Bortoleto_%28cropped%29.jpg/160px-Gabriel_Bortoleto_%28cropped%29.jpg",
  "franco colapinto": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Conferencia_de_prensa_Colapinto_ACA_octubre_2023_-_BugWarp_%2813%29_%28cropped%29.jpg/160px-Conferencia_de_prensa_Colapinto_ACA_octubre_2023_-_BugWarp_%2813%29_%28cropped%29.jpg",
  "pierre gasly": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png/160px-2022_French_Grand_Prix_%2852279065728%29_%28midcrop%29.png",
  "isack hadjar": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Isack_Hadjar_2025.png/160px-Isack_Hadjar_2025.png",
  "lewis hamilton": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg/160px-Prime_Minister_Keir_Starmer_meets_Sir_Lewis_Hamilton_%2854566928382%29_%28cropped%29.jpg",
  "nico hulkenberg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nico_Hulkenberg_2016_Malaysia.jpg/160px-Nico_Hulkenberg_2016_Malaysia.jpg",
  "nico hülkenberg": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Nico_Hulkenberg_2016_Malaysia.jpg/160px-Nico_Hulkenberg_2016_Malaysia.jpg",
  "liam lawson": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7792%29_%28cropped%29.jpg/160px-Liam_Lawson_at_the_Red_Bull_Fan_Zone_%E2%80%93_Crown_Riverwalk%2C_Melbourne_%28028A7792%29_%28cropped%29.jpg",
  "charles leclerc": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg/160px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3978_by_Stepro_%28cropped2%29.jpg",
  "lando norris": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg/160px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3968_by_Stepro_%28cropped2%29.jpg",
  "esteban ocon": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg/160px-Esteban_Ocon_2024_Suzuka_%28cropped%29.jpg",
  "sergio perez": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2021_US_GP_driver_parade_%28cropped2%29.jpg/160px-2021_US_GP_driver_parade_%28cropped2%29.jpg",
  "sergio pérez": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/2021_US_GP_driver_parade_%28cropped2%29.jpg/160px-2021_US_GP_driver_parade_%28cropped2%29.jpg",
  "oscar piastri": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Oscar_Piastri_2024_%28cropped%29.jpg/160px-Oscar_Piastri_2024_%28cropped%29.jpg",
  "george russell": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg/160px-KingsLeonSilverstne040724_%2828_of_112%29_%2853838006028%29_%28cropped%29.jpg",
  "carlos sainz": "https://upload.wikimedia.org/wikipedia/commons/1/13/Carlos_Sainz_Jr._at_2025_pre-season_testing_for_Atlassian_Williams_Racing_Formula_One_team.jpg",
  "carlos sainz jr": "https://upload.wikimedia.org/wikipedia/commons/1/13/Carlos_Sainz_Jr._at_2025_pre-season_testing_for_Atlassian_Williams_Racing_Formula_One_team.jpg",
  "lance stroll": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg/160px-2025_Japan_GP_-_Aston_Martin_-_Lance_Stroll_-_Fanzone_Stage_%28cropped%29.jpg",
  "max verstappen": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg/160px-2024-08-25_Motorsport%2C_Formel_1%2C_Gro%C3%9Fer_Preis_der_Niederlande_2024_STP_3973_by_Stepro_%28medium_crop%29.jpg",
};

export function getDriverPhoto(name) {
  return photos[normalizeDriverName(name)] || "";
}
