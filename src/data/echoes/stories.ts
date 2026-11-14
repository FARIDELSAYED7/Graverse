import { apollo11LmStory } from "./apollo-11-lm-descent-stage";
import { apolloExperimentsStory } from "./apollo-lunar-surface-experiments";
import { dawnStory } from "./dawn";
import { ingenuityStory } from "./ingenuity";
import { insightStory } from "./insight";
import { keplerStory } from "./kepler";
import { lunarRovingVehicleStory } from "./lunar-roving-vehicle";
import { nearShoemakerStory } from "./near-shoemaker";
import { opportunityStory } from "./opportunity";
import { phoenixStory } from "./phoenix";
import { pioneer10Story } from "./pioneer-10";
import { pioneer11Story } from "./pioneer-11";
import { sojournerStory } from "./sojourner";
import { spiritStory } from "./spirit";
import { surveyorStory } from "./surveyor-landers";
import { viking1Story } from "./viking-1-lander";
import { viking2Story } from "./viking-2-lander";
import type { EchoStory } from "@/types/echo";

/**
 * Every ECHOES story, in the order they appear on the landing page.
 *
 * The first entry is the flagship: a complete, fully sourced, six-chapter
 * story with discoveries, quizzes, a challenge, a 3D model and real NASA
 * imagery and video.
 *
 * Covering all mission equipment from the NASA Space Apps Challenge resources:
 * - Apollo Lunar Modules (Apollo 11)
 * - Lunar Roving Vehicles (Apollo 15)
 * - ALSEP Scientific Packages
 * - Surveyor Landers (Surveyor 3)
 * - Sojourner Rover
 * - Spirit and Opportunity (Twin MER rovers)
 * - Viking 1 and 2 Landers
 * - Phoenix and InSight Landers
 * - Dawn Spacecraft
 * - NEAR Shoemaker
 * - Pioneer 10 and 11
 * - Ingenuity Mars Helicopter
 * - Kepler Space Telescope
 */
export const echoStories: EchoStory[] = [
  opportunityStory,
  sojournerStory,
  spiritStory,
  viking1Story,
  viking2Story,
  apollo11LmStory,
  lunarRovingVehicleStory,
  apolloExperimentsStory,
  surveyorStory,
  phoenixStory,
  insightStory,
  ingenuityStory,
  nearShoemakerStory,
  dawnStory,
  pioneer10Story,
  pioneer11Story,
  keplerStory,
];
