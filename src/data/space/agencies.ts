import type { Agency } from "@/types/space";

/**
 * Space agencies referenced by the collection or by mission context.
 * Mandates and founding dates are drawn from the agency pages in
 * `data/sources.ts`.
 */
export const agencies: Agency[] = [
  {
    id: "nasa",
    name: "National Aeronautics and Space Administration",
    shortName: "NASA",
    country: "United States",
    founded: "1958",
    summary:
      "The United States civil space agency, responsible for space exploration, scientific research and aeronautics.",
    focus: [
      "Human spaceflight",
      "Planetary science",
      "Earth observation",
      "Astrophysics",
      "Aeronautics research",
    ],
    notablePrograms: ["Apollo", "Voyager", "Mars Exploration Program", "Artemis"],
    website: "https://www.nasa.gov/",
    accent: "#43B9FF",
    sourceIds: ["SRC-NASA-AGENCY"],
  },
  {
    id: "esa",
    name: "European Space Agency",
    shortName: "ESA",
    country: "Europe (member states)",
    founded: "1975",
    summary:
      "An intergovernmental organisation that coordinates space programmes across its European member states.",
    focus: [
      "Earth observation",
      "Science missions",
      "Launch vehicles",
      "Human spaceflight cooperation",
    ],
    notablePrograms: ["Huygens", "Rosetta", "JUICE", "Euclid"],
    website: "https://www.esa.int/",
    accent: "#5EEAD4",
    sourceIds: ["SRC-ESA-AGENCY"],
  },
  {
    id: "jaxa",
    name: "Japan Aerospace Exploration Agency",
    shortName: "JAXA",
    country: "Japan",
    founded: "2003",
    summary:
      "Japan's national aerospace agency, formed by merging three organisations in 2003.",
    focus: [
      "Launch vehicles",
      "Earth observation",
      "Asteroid and lunar exploration",
      "Human spaceflight",
    ],
    notablePrograms: ["Hayabusa2", "SLIM", "HTV", "BepiColombo (with ESA)"],
    website: "https://global.jaxa.jp/",
    accent: "#F87171",
    sourceIds: ["SRC-JAXA-AGENCY"],
  },
  {
    id: "isro",
    name: "Indian Space Research Organisation",
    shortName: "ISRO",
    country: "India",
    founded: "1969",
    summary:
      "India's national space agency, known for cost-effective launch vehicles and lunar and Mars missions.",
    focus: [
      "Launch vehicles",
      "Satellite communications",
      "Lunar exploration",
      "Mars exploration",
    ],
    notablePrograms: ["Chandrayaan", "Mangalyaan", "Gaganyaan"],
    website: "https://www.isro.gov.in/",
    accent: "#FB923C",
    sourceIds: ["SRC-ISRO-AGENCY"],
  },
  {
    id: "cnsa",
    name: "China National Space Administration",
    shortName: "CNSA",
    country: "China",
    founded: "1993",
    summary:
      "China's civil space agency, responsible for lunar and planetary exploration and human spaceflight programmes.",
    focus: [
      "Lunar exploration",
      "Mars exploration",
      "Space stations",
      "Launch vehicles",
    ],
    notablePrograms: ["Chang'e", "Tianwen-1", "Tiangong"],
    website: "https://www.cnsa.gov.cn/",
    accent: "#FACC15",
    sourceIds: ["SRC-CNSA-AGENCY"],
  },
  {
    id: "roscosmos",
    name: "Roscosmos State Corporation",
    shortName: "Roscosmos",
    country: "Russia",
    founded: "1992",
    summary:
      "Russia's state space corporation, continuing the Soviet space programme's launch and human spaceflight work.",
    focus: [
      "Human spaceflight",
      "Launch vehicles",
      "Space stations",
      "Earth observation",
    ],
    notablePrograms: ["Soyuz", "Progress", "Luna"],
    website: "https://roscosmos.ru/",
    accent: "#60A5FA",
    sourceIds: ["SRC-ROSCOSMOS-AGENCY"],
  },
  {
    id: "csa",
    name: "Canadian Space Agency",
    shortName: "CSA",
    country: "Canada",
    founded: "1989",
    summary:
      "Canada's national space agency, known for robotics, satellite communications and astronaut participation.",
    focus: [
      "Space robotics",
      "Earth observation",
      "Space science",
      "Human spaceflight",
    ],
    notablePrograms: ["Canadarm", "Canadarm2", "Radarsat"],
    website: "https://www.asc-csa.gc.ca/",
    accent: "#F472B6",
    sourceIds: ["SRC-CSA-AGENCY"],
  },
  {
    id: "uksa",
    name: "UK Space Agency",
    shortName: "UKSA",
    country: "United Kingdom",
    founded: "2010",
    summary:
      "The United Kingdom's national space agency, supporting space science, launch and satellite industries.",
    focus: [
      "Space science",
      "Earth observation",
      "Launch",
      "Space regulation",
    ],
    notablePrograms: ["Ariel", "Rosalind Franklin rover contributions", "SMILE"],
    website: "https://www.gov.uk/government/organisations/uk-space-agency",
    accent: "#A78BFA",
    sourceIds: ["SRC-UKSA-AGENCY"],
  },
];

export const agencyMap = new Map(agencies.map((agency) => [agency.id, agency]));

export function getAgency(id: string) {
  return agencyMap.get(id);
}

export function getAgencyForMission(mission: { agencyId: string }) {
  return agencyMap.get(mission.agencyId);
}
