import type { DeepSkyObject } from "@/types/space";

/**
 * Deep-sky records.
 *
 * Distances are the values published on the linked NASA pages. Where NASA
 * gives a range the range is kept and the claim is marked "estimated" rather
 * than collapsed into a single number.
 */
const VERIFIED = "2026-11-10";

export const deepSkyObjects: DeepSkyObject[] = [
  {
    id: "orion-nebula",
    name: "Orion Nebula",
    catalogName: "M42",
    kind: "emission-nebula",
    kindLabel: "Emission nebula",
    constellation: "Orion",
    distance: "About 1,344 light-years",
    summary:
      "The nearest large star-forming region to Earth, visible to the unaided eye as a fuzzy patch below Orion's Belt.",
    overview: [
      "The Orion Nebula is a vast cloud of gas and dust where new stars are forming. Ultraviolet light from young, hot stars makes the gas glow, which is why it appears as a bright nebula rather than a dark cloud.",
      "Hubble observations revealed protoplanetary disks — the birthplaces of future planetary systems — around many of the nebula's young stars. It is one of the most studied star-forming regions in the sky.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 42 (NGC 1976)", claim: "confirmed", sourceIds: ["SRC-NASA-ORION"] },
      { label: "Distance", value: "About 1,344 light-years", claim: "estimated", sourceIds: ["SRC-NASA-ORION"] },
      { label: "Type", value: "Emission nebula and star-forming region", claim: "confirmed", sourceIds: ["SRC-NASA-ORION"] },
      { label: "Constellation", value: "Orion", claim: "confirmed", sourceIds: ["SRC-NASA-ORION"] },
    ],
    discovery: "Known to observers before the invention of the telescope; catalogued by Charles Messier in 1769.",
    observation:
      "Hubble has imaged protoplanetary disks in the nebula, and infrared telescopes can see through much of its dust.",
    accent: "#F19A7B",
    gradient: "from-[#f19a7b]/40 via-[#7c4dff]/25 to-transparent",
    sourceIds: ["SRC-NASA-ORION"],
    lastVerified: VERIFIED,
  },
  {
    id: "crab-nebula",
    name: "Crab Nebula",
    catalogName: "M1",
    kind: "supernova-remnant",
    kindLabel: "Supernova remnant",
    constellation: "Taurus",
    distance: "About 6,500 light-years",
    summary:
      "The wreck of a star that exploded in 1054 CE, with a spinning neutron star at its centre.",
    overview: [
      "The Crab Nebula is the expanding remains of a supernova observed on Earth in 1054. Chinese and Japanese astronomers recorded a star bright enough to be seen in daylight for weeks.",
      "At its centre is a pulsar: a neutron star spinning about 30 times per second and sweeping beams of radiation across space. The pulsar's energy helps light up the surrounding gas.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 1 (NGC 1952)", claim: "confirmed", sourceIds: ["SRC-NASA-CRAB"] },
      { label: "Distance", value: "About 6,500 light-years", claim: "estimated", sourceIds: ["SRC-NASA-CRAB"] },
      { label: "Type", value: "Supernova remnant with a pulsar", claim: "confirmed", sourceIds: ["SRC-NASA-CRAB"] },
      { label: "Observed explosion", value: "1054 CE", claim: "confirmed", sourceIds: ["SRC-NASA-CRAB"] },
    ],
    discovery: "The 1054 supernova was recorded by astronomers in China and Japan; the nebula was later catalogued by Messier.",
    observation:
      "Hubble, Chandra and other observatories have mapped the remnant's filaments and the pulsar's wind nebula.",
    accent: "#7DD3FC",
    gradient: "from-[#7dd3fc]/40 via-[#f472b6]/20 to-transparent",
    sourceIds: ["SRC-NASA-CRAB"],
    lastVerified: VERIFIED,
  },
  {
    id: "andromeda-galaxy",
    name: "Andromeda Galaxy",
    catalogName: "M31",
    kind: "spiral-galaxy",
    kindLabel: "Spiral galaxy",
    constellation: "Andromeda",
    distance: "About 2.5 million light-years",
    summary:
      "The nearest large spiral galaxy to the Milky Way, and the most distant object easily seen with the unaided eye.",
    overview: [
      "Andromeda is a spiral galaxy containing roughly a trillion stars. It is the dominant member of the Local Group of galaxies, which also includes the Milky Way and dozens of smaller galaxies.",
      "Hubble observations of variable stars in Andromeda in the 1920s helped establish that galaxies lie far beyond the Milky Way. Andromeda and the Milky Way are moving toward each other and will interact in the distant future.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 31 (NGC 224)", claim: "confirmed", sourceIds: ["SRC-NASA-ANDROMEDA"] },
      { label: "Distance", value: "About 2.5 million light-years", claim: "estimated", sourceIds: ["SRC-NASA-ANDROMEDA"] },
      { label: "Type", value: "Spiral galaxy", claim: "confirmed", sourceIds: ["SRC-NASA-ANDROMEDA"] },
      { label: "Constellation", value: "Andromeda", claim: "confirmed", sourceIds: ["SRC-NASA-ANDROMEDA"] },
    ],
    discovery: "Recorded as a nebula for centuries; identified as a separate galaxy in the 1920s.",
    observation:
      "Visible to the naked eye from dark sites. Hubble and other telescopes resolve its stars, clusters and dust lanes.",
    accent: "#A5B4FC",
    gradient: "from-[#a5b4fc]/40 via-[#c4b5fd]/20 to-transparent",
    sourceIds: ["SRC-NASA-ANDROMEDA"],
    lastVerified: VERIFIED,
  },
  {
    id: "sagittarius-a",
    name: "Sagittarius A*",
    catalogName: "Sgr A*",
    kind: "black-hole",
    kindLabel: "Supermassive black hole",
    constellation: "Sagittarius",
    distance: "About 27,000 light-years",
    summary:
      "The supermassive black hole at the centre of the Milky Way, with a mass about four million times the Sun's.",
    overview: [
      "Sagittarius A* is the compact object at the heart of our galaxy. Stars near it orbit at enormous speeds, and their motions show that they are circling something extremely massive and dark.",
      "In 2022 the Event Horizon Telescope collaboration published an image of the environment around Sgr A*, built from radio observations made by telescopes around the world.",
    ],
    facts: [
      { label: "Location", value: "Centre of the Milky Way", claim: "confirmed", sourceIds: ["SRC-NASA-SGR-A"] },
      { label: "Distance", value: "About 27,000 light-years", claim: "estimated", sourceIds: ["SRC-NASA-SGR-A"] },
      { label: "Mass", value: "About 4 million solar masses", claim: "estimated", sourceIds: ["SRC-NASA-SGR-A"] },
      { label: "Type", value: "Supermassive black hole", claim: "confirmed", sourceIds: ["SRC-NASA-SGR-A"] },
    ],
    discovery: "Inferred from the orbits of stars at the galactic centre and later imaged in radio wavelengths.",
    observation:
      "The Event Horizon Telescope combines radio dishes across Earth to resolve the black hole's shadow.",
    accent: "#FBBF24",
    gradient: "from-[#fbbf24]/35 via-[#f97316]/20 to-transparent",
    sourceIds: ["SRC-NASA-SGR-A"],
    lastVerified: VERIFIED,
  },
  {
    id: "eagle-nebula",
    name: "Eagle Nebula",
    catalogName: "M16",
    kind: "star-forming-region",
    kindLabel: "Star-forming region",
    constellation: "Serpens",
    distance: "About 5,700 light-years",
    summary:
      "A star-forming region made famous by Hubble's Pillars of Creation image.",
    overview: [
      "The Eagle Nebula is a young star cluster embedded in a cloud of gas and dust. Its most famous feature, the Pillars of Creation, is a set of dense columns where new stars are forming.",
      "Radiation from nearby massive stars is eroding the pillars while also compressing gas inside them, triggering further star formation. Hubble and JWST have both imaged the structure in different wavelengths.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 16 (NGC 6611)", claim: "confirmed", sourceIds: ["SRC-NASA-PILLARS"] },
      { label: "Distance", value: "About 5,700 light-years", claim: "estimated", sourceIds: ["SRC-NASA-PILLARS"] },
      { label: "Type", value: "Emission nebula and open cluster", claim: "confirmed", sourceIds: ["SRC-NASA-PILLARS"] },
      { label: "Constellation", value: "Serpens", claim: "confirmed", sourceIds: ["SRC-NASA-PILLARS"] },
    ],
    discovery: "Catalogued by Charles Messier in 1764; the Pillars were imaged by Hubble in 1995.",
    observation:
      "Hubble's visible-light image shows dark silhouettes; infrared and JWST views reveal stars forming inside the dust.",
    accent: "#86EFAC",
    gradient: "from-[#86efac]/35 via-[#22d3ee]/20 to-transparent",
    sourceIds: ["SRC-NASA-PILLARS"],
    lastVerified: VERIFIED,
  },
  {
    id: "whirlpool-galaxy",
    name: "Whirlpool Galaxy",
    catalogName: "M51",
    kind: "spiral-galaxy",
    kindLabel: "Interacting spiral galaxy",
    constellation: "Canes Venatici",
    distance: "About 31 million light-years",
    summary:
      "A face-on spiral galaxy caught in a gravitational interaction with a smaller companion.",
    overview: [
      "The Whirlpool Galaxy is one of the best-known examples of a grand-design spiral. Its arms are laced with dust and bright regions of new star formation.",
      "A smaller companion galaxy, NGC 5195, is interacting with it. The encounter likely helped shape the prominent spiral structure.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 51 (NGC 5194)", claim: "confirmed", sourceIds: ["SRC-NASA-WHIRLPOOL"] },
      { label: "Distance", value: "About 31 million light-years", claim: "estimated", sourceIds: ["SRC-NASA-WHIRLPOOL"] },
      { label: "Type", value: "Interacting spiral galaxy", claim: "confirmed", sourceIds: ["SRC-NASA-WHIRLPOOL"] },
      { label: "Constellation", value: "Canes Venatici", claim: "confirmed", sourceIds: ["SRC-NASA-WHIRLPOOL"] },
    ],
    discovery: "Discovered by Charles Messier in 1773; its spiral structure was sketched in the 1840s.",
    observation:
      "A popular target for amateur telescopes; Hubble has mapped its star-forming knots and dust lanes.",
    accent: "#C4B5FD",
    gradient: "from-[#c4b5fd]/40 via-[#818cf8]/20 to-transparent",
    sourceIds: ["SRC-NASA-WHIRLPOOL"],
    lastVerified: VERIFIED,
  },
  {
    id: "sombrero-galaxy",
    name: "Sombrero Galaxy",
    catalogName: "M104",
    kind: "galaxy",
    kindLabel: "Spiral galaxy (edge-on)",
    constellation: "Virgo",
    distance: "About 31 million light-years",
    summary:
      "An edge-on galaxy with a dark dust lane that makes it look like a wide-brimmed hat.",
    overview: [
      "The Sombrero Galaxy is seen nearly edge-on, so its central bulge and dust lane combine into a distinctive hat shape. It hosts a supermassive black hole at its centre.",
      "Spitzer infrared observations showed a ring of dust and star formation around the galaxy's middle. The galaxy is a popular target for both amateur and professional astronomers.",
    ],
    facts: [
      { label: "Catalog", value: "Messier 104 (NGC 4594)", claim: "confirmed", sourceIds: ["SRC-NASA-SOMBRERO"] },
      { label: "Distance", value: "About 31 million light-years", claim: "estimated", sourceIds: ["SRC-NASA-SOMBRERO"] },
      { label: "Type", value: "Spiral galaxy seen edge-on", claim: "confirmed", sourceIds: ["SRC-NASA-SOMBRERO"] },
      { label: "Constellation", value: "Virgo", claim: "confirmed", sourceIds: ["SRC-NASA-SOMBRERO"] },
    ],
    discovery: "Discovered by Pierre Méchain in 1781 and independently by William Herschel.",
    observation:
      "Hubble and Spitzer have imaged its dust ring and central bulge in visible and infrared light.",
    accent: "#FCD34D",
    gradient: "from-[#fcd34d]/35 via-[#f59e0b]/20 to-transparent",
    sourceIds: ["SRC-NASA-SOMBRERO"],
    lastVerified: VERIFIED,
  },
  {
    id: "milky-way",
    name: "The Milky Way",
    catalogName: "Our galaxy",
    kind: "galaxy",
    kindLabel: "Barred spiral galaxy",
    constellation: "All constellations",
    distance: "We are inside it",
    summary:
      "The galaxy that contains the Sun, Earth and every star visible to the unaided eye.",
    overview: [
      "The Milky Way is a barred spiral galaxy containing hundreds of billions of stars. The Sun sits in one of its spiral arms, about 27,000 light-years from the centre.",
      "From inside the galaxy we see it as a band of light across the night sky. Dust clouds block our view of the centre in visible light, so astronomers use infrared and radio observations to map it.",
    ],
    facts: [
      { label: "Type", value: "Barred spiral galaxy", claim: "confirmed", sourceIds: ["SRC-NASA-MILKY-WAY"] },
      { label: "Diameter", value: "About 100,000 light-years", claim: "estimated", sourceIds: ["SRC-NASA-MILKY-WAY"] },
      { label: "Stars", value: "Hundreds of billions", claim: "estimated", sourceIds: ["SRC-NASA-MILKY-WAY"] },
      { label: "Sun's distance from centre", value: "About 27,000 light-years", claim: "estimated", sourceIds: ["SRC-NASA-MILKY-WAY"] },
    ],
    discovery: "Its nature as a galaxy was established in the 20th century; its structure is still being mapped.",
    observation:
      "Mapped by radio telescopes, infrared surveys and Gaia's measurements of billions of stars.",
    accent: "#93C5FD",
    gradient: "from-[#93c5fd]/35 via-[#c4b5fd]/20 to-transparent",
    sourceIds: ["SRC-NASA-MILKY-WAY"],
    lastVerified: VERIFIED,
  },
];

export const deepSkyMap = new Map(
  deepSkyObjects.map((object) => [object.id, object])
);

export function getDeepSkyObject(id: string) {
  return deepSkyMap.get(id);
}
