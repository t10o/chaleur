export const lottery = (): "rainbow" | "red" | "purple" | "green" | "lose" => {
  // 1/40 緑
  const GREEN_ELECTION_NUMBERS = [
    2214, 1530, 2325, 307, 1317, 2322, 1472, 1284, 2141, 207, 2895, 2822, 2731,
    2817, 639, 2420, 510, 2243, 3066, 2331, 2700, 1060, 1886, 2742, 2347, 31,
    2524, 703, 1165, 1537, 551, 537, 2783, 2485, 2235, 610, 1205, 2441, 215,
    3021, 978, 1706, 3014, 2765, 2201, 1143, 1112, 1078, 2934, 1854, 2768, 370,
    453, 1491, 866, 1811, 198, 1623, 2086, 1282, 1144, 2948, 1, 2224, 2088,
    1699, 2513, 833, 2131, 1783, 502, 252, 742, 1651, 2872, 2581, 2542, 3037,
    2329, 470,
  ];

  // 1/111.1 紫
  const PURPLE_ELECTION_NUMBERS = [
    1449, 1260, 489, 1262, 3127, 2186, 2808, 196, 3044, 2237, 3135, 166, 589,
    3030, 2836, 2047, 2827, 1661, 566, 335, 2903, 1683, 376, 924, 1582, 677,
    1135, 2135,
  ];

  // 1/200 赤
  const RED_ELECTION_NUMBERS = [
    2863, 1048, 1074, 1842, 859, 1208, 393, 1267, 209, 2637, 1404, 2051, 1131,
    783, 1225,
  ];

  // 1/319 虹
  const RAINBOW_ELECTION_NUMBERS = [
    461, 2001, 2267, 1192, 3165, 418, 425, 3, 1572, 7,
  ];

  const number = Math.floor(Math.random() * 3190);

  if (RAINBOW_ELECTION_NUMBERS.includes(number)) return "rainbow";
  if (RED_ELECTION_NUMBERS.includes(number)) return "red";
  if (PURPLE_ELECTION_NUMBERS.includes(number)) return "purple";
  if (GREEN_ELECTION_NUMBERS.includes(number)) return "green";

  return "lose";
};
