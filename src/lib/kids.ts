import {
  destinationMeta,
  destinationOrder,
  getArtifactById,
  hardwareTypeSingular,
} from "@/data/artifacts";
import {
  juniorArtifactIds,
  juniorQuizSeeds,
} from "@/data/kids";
import type { Artifact, HardwareType } from "@/types/artifact";
import type { JuniorQuizQuestion } from "@/types/kids";

const destinationLabels = destinationOrder.map(
  (destination) => destinationMeta[destination].name
);

const placePhrases: Record<Artifact["destinationGroup"], string> = {
  moon: "on the Moon",
  mars: "on Mars",
  "deep-space": "in Deep Space",
};

const hardwareOptionTypes: HardwareType[] = [
  "rover",
  "lander",
  "orbiter",
  "probe",
  "aircraft",
];

function rotate<T>(items: T[], offset: number): T[] {
  if (items.length === 0) return items;
  const safeOffset = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
}

function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function requiredArtifact(id: string): Artifact {
  const artifact = getArtifactById(id);
  if (!artifact) {
    throw new Error(`Junior Explorers references an unknown artifact: ${id}`);
  }
  return artifact;
}

export function getJuniorArtifacts(): Artifact[] {
  return juniorArtifactIds.map(requiredArtifact);
}

/**
 * Builds a deterministic quiz from the canonical artifact records. The same
 * function runs during the static build, so the answer order is stable and the
 * client never needs to guess at a fact.
 */
export function buildJuniorQuizQuestions(): JuniorQuizQuestion[] {
  return juniorQuizSeeds.map((seed, index) => {
    const artifact = requiredArtifact(seed.artifactId);

    if (seed.kind === "destination") {
      return {
        id: `destination:${artifact.id}`,
        prompt: `Where did ${artifact.name} travel?`,
        options: destinationLabels,
        correctIndex: destinationOrder.indexOf(artifact.destinationGroup),
        explanation: `The record lists ${artifact.name} ${placePhrases[artifact.destinationGroup]}.`,
        artifactId: artifact.id,
        artifactName: artifact.name,
        artifactHref: `/museum/${artifact.id}`,
      };
    }

    if (seed.kind === "hardware") {
      if (!hardwareOptionTypes.includes(artifact.hardwareType)) {
        throw new Error(
          `Junior Explorers quiz needs a wider hardware option set for ${artifact.name}.`
        );
      }
      const correctLabel = hardwareTypeSingular[artifact.hardwareType];
      const distractors = rotate(
        hardwareOptionTypes.filter((type) => type !== artifact.hardwareType),
        index
      ).slice(0, 3);
      const options = rotate(
        [artifact.hardwareType, ...distractors],
        index % 4
      ).map((type) => hardwareTypeSingular[type]);

      return {
        id: `hardware:${artifact.id}`,
        prompt: `What kind of machine is ${artifact.name}?`,
        options,
        correctIndex: options.indexOf(correctLabel),
        explanation: `The record lists ${artifact.name} as ${article(
          correctLabel.toLowerCase()
        )} ${correctLabel.toLowerCase()}.`,
        artifactId: artifact.id,
        artifactName: artifact.name,
        artifactHref: `/museum/${artifact.id}`,
      };
    }

    const optionIds = seed.optionArtifactIds ?? [];
    if (!optionIds.includes(artifact.id)) {
      throw new Error(
        `Junior Explorers milestone question must include its own artifact: ${artifact.id}`
      );
    }
    const optionArtifacts = rotate(optionIds.map(requiredArtifact), index);
    const labels = optionArtifacts.map(
      (option) => option.primaryMilestone.label
    );
    if (new Set(labels).size !== labels.length) {
      throw new Error(
        `Junior Explorers milestone question has duplicate answers for ${artifact.id}.`
      );
    }

    return {
      id: `milestone:${artifact.id}`,
      prompt: `What did ${artifact.name} do on ${artifact.primaryMilestone.dateLabel}?`,
      options: labels,
      correctIndex: optionArtifacts.findIndex(
        (option) => option.id === artifact.id
      ),
      explanation: `The record lists “${artifact.primaryMilestone.label}” for ${artifact.name} on ${artifact.primaryMilestone.dateLabel}.`,
      artifactId: artifact.id,
      artifactName: artifact.name,
      artifactHref: `/museum/${artifact.id}`,
    };
  });
}
