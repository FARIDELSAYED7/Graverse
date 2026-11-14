import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { Presentation, PresentationFile } from '@oai/artifact-tool';

const workspaceDir = '/Users/faridelsayed/orca/Graverse';
const skillDir = '/Users/faridelsayed/.codex/plugins/cache/openai-primary-runtime/presentations/26.1112.11217/skills/presentations';
const buildDir = path.join(workspaceDir, '.codex-build/graverse-presentation');
const assets = path.join(buildDir, 'assets');
const outDir = path.join(workspaceDir, '.codex-output');
const finalPath = path.join(outDir, 'graverse-nasa-space-apps-2026-final.pptx');
const candidatePath = path.join(buildDir, 'candidate.pptx');
const font = 'Arial';
const imageData = {};

const C = {
  space: '#070B18', navy: '#0D1730', panel: '#111F3C', paper: '#F7F8FC',
  white: '#FFFFFF', muted: '#B8C4DC', dim: '#7F91B3', red: '#FC3D21',
  cyan: '#7CD9FF', gold: '#F2BE57', mars: '#C76443', line: '#2A3A5E'
};

function box(slide, x, y, w, h, fill, radius = 'rounded-xl', line = 'none') {
  return slide.shapes.add({ geometry: radius === 0 ? 'rect' : 'roundRect', position: { left:x, top:y, width:w, height:h }, fill, line: line === 'none' ? { style:'solid', fill:'none', width:0 } : {style:'solid', fill:line, width:1}, ...(radius === 0 ? {} : {borderRadius:radius}) });
}
function text(slide, value, x, y, w, h, size, color = C.white, bold = false, opts = {}) {
  const shape = slide.shapes.add({ geometry:'textbox', position:{left:x,top:y,width:w,height:h}, fill:'none', line:{style:'solid',fill:'none',width:0} });
  shape.text = value;
  shape.text.style = { fontFamily:font, fontSize:size, color, bold, breakLine: false, ...opts };
  return shape;
}
function line(slide, x, y, w, color = C.red, h = 3) { return slide.shapes.add({ geometry:'rect', position:{left:x,top:y,width:w,height:h}, fill:color, line:{style:'solid',fill:'none',width:0} }); }
function img(slide, name, x, y, w, h, alt, crop) { return slide.images.add({ blob:imageData[name], contentType:'image/png', alt, fit:'cover', position:{left:x,top:y,width:w,height:h}, ...(crop ? {crop} : {}), geometry:'roundRect', borderRadius:'rounded-xl' }); }
function base(slide, n, section) {
  slide.background.fill = C.space;
  line(slide, 56, 42, 42);
  text(slide, section.toUpperCase(), 112, 30, 420, 26, 13, C.cyan, true);
  text(slide, String(n).padStart(2,'0'), 1164, 30, 60, 26, 13, C.dim, true, {align:'right'});
  text(slide, 'GRAVERSE  |  NASA Space Apps Challenge 2026', 56, 670, 700, 18, 11, C.dim);
}
function title(slide, value, subtitle) {
  text(slide, value, 56, 82, 720, 98, 36, C.white, true);
  if (subtitle) text(slide, subtitle, 56, 180, 700, 42, 18, C.muted);
}
function note(slide, lines) { slide.speakerNotes.text = lines; slide.speakerNotes.setVisible(true); }
function stat(slide, x, y, num, label, accent=C.cyan) {
  text(slide, num, x, y, 170, 42, 30, accent, true);
  text(slide, label, x, y+42, 170, 36, 14, C.muted);
}

async function main() {
  await fs.mkdir(outDir, { recursive:true });
  for (const name of ['museum.png','artifact.png','explorer.png','academy.png']) imageData[name] = await fs.readFile(path.join(assets,name));
  const deck = Presentation.create({ slideSize:{width:1280,height:720} });

  // 1: Cover
  { const s=deck.slides.add(); s.background.fill=C.space;
    box(s, 0, 0, 1280, 720, C.space, 0);
    img(s, 'museum.png', 632, 0, 648, 720, 'GRAVERSE museum interface');
    box(s, 632, 0, 648, 720, {color:C.space, transparency:38}, 0);
    line(s, 64, 112, 60); text(s, 'NASA SPACE APPS CHALLENGE 2026', 140, 99, 460, 26, 16, C.cyan, true);
    text(s, 'GRAVERSE', 64, 160, 600, 82, 63, C.white, true);
    text(s, 'Every silent machine has a story', 64, 254, 580, 42, 26, C.white, false);
    text(s, 'A source-linked digital museum, explorer, and learning experience for the hardware humanity left in space.', 64, 324, 520, 80, 20, C.muted);
    box(s,64,554,258,58,C.red); text(s,'[TEAM NAME]',84,570,215,24,15,C.white,true);
    text(s,'Challenge: Abandoned but not Forgotten',64,633,500,24,14,C.muted);
    note(s,['Project cover. Visual: local GRAVERSE Museum screenshot.','Project facts: README.md; GRAVERSE competition brief.']);
  }

  // 2: Problem
  { const s=deck.slides.add(); base(s,2,'The problem'); title(s,'When a mission ends, its story should not disappear','Young space enthusiasts need a way into the history, science, and fate of the machines left behind.');
    box(s,56,236,370,340,C.navy); box(s,454,236,370,340,C.navy); box(s,852,236,370,340,C.navy);
    text(s,'01',84,264,80,35,25,C.red,true); text(s,'Scattered evidence',84,315,285,40,24,C.white,true); text(s,'A single artifact can be spread across mission pages, archives, technical reports, and image libraries.',84,375,285,125,18,C.muted);
    text(s,'02',482,264,80,35,25,C.red,true); text(s,'Dense language',482,315,285,40,24,C.white,true); text(s,'Technical material often answers experts’ questions before it helps a student form a human connection.',482,375,285,125,18,C.muted);
    text(s,'03',880,264,80,35,25,C.red,true); text(s,'One status hides many fates',880,315,285,58,24,C.white,true); text(s,'“Mission complete” can mean inactive hardware, a deliberate impact, an intact artifact, or an instrument still in use.',880,375,285,125,18,C.muted);
    text(s,'The opportunity: turn a silent object into a verified story that explains why it mattered and what it left behind.',56,612,1090,32,21,C.white,true);
    note(s,['Challenge framing based on NASA Space Apps prompt supplied by the user and README.md.','No performance or learning-impact claims are made.']);
  }

  // 3: Solution
  { const s=deck.slides.add(); base(s,3,'Our solution'); title(s,'One verified collection, three ways in','GRAVERSE gives the same source-linked records a story-first, data-first, and age-appropriate path.');
    img(s,'museum.png',56,230,510,300,'GRAVERSE Museum landing page');
    line(s,56,548,510,C.red,2); text(s,'Museum  |  cinematic, story-first records',56,564,510,25,15,C.muted,true);
    box(s,610,230,570,300,C.navy); text(s,'The core insight',650,266,470,34,25,C.cyan,true);
    text(s,'A mission’s lifecycle and the physical hardware’s lifecycle are two different questions.',650,324,470,75,25,C.white,true);
    text(s,'GRAVERSE keeps both answers visible, preserves original source wording, and links the record to the evidence behind it.',650,425,450,70,18,C.muted);
    stat(s,610,568,'33','source-linked hardware records',C.cyan); stat(s,810,568,'27','missions derived from the collection',C.gold); stat(s,1010,568,'111','registered sources',C.red);
    note(s,['Product screenshots captured from local GRAVERSE website.','Counts from docs/DATA_AND_PROVENANCE.md and docs/GRAVERSE_COMPETITION_BRIEF_AR.md.']);
  }

  // 4: Story experience
  { const s=deck.slides.add(); base(s,4,'Storytelling experience'); title(s,'A record becomes a journey','Visitors do not just browse a spacecraft. They follow its purpose, discoveries, and fate.');
    img(s,'artifact.png',760,210,460,366,'Apollo 11 descent stage artifact record');
    const xs=[56,256,456]; const heads=['Meet the artifact','Follow the mission','Understand what remains']; const nums=['01','02','03']; const bodies=['What is it? Why did people build it?','What did it do, and what science did it enable?','What happened to the physical object after the mission?'];
    xs.forEach((x,i)=>{ box(s,x,264,170,210,C.navy); text(s,nums[i],x+24,288,60,28,20,C.red,true); text(s,heads[i],x+24,336,120,55,19,C.white,true); text(s,bodies[i],x+24,421,122,70,14,C.muted); });
    line(s,226,365,30,C.red,2); line(s,426,365,30,C.red,2);
    text(s,'Mission status and hardware status stay side by side, so the story stays accurate.',56,540,610,48,22,C.white,true);
    text(s,'Example shown: Apollo 11 Lunar Module descent stage record.',760,594,460,23,13,C.dim);
    note(s,['Product screenshot captured from /museum/apollo-11-lm-descent-stage.','Narrative template and status separation described in README.md.']);
  }

  // 5: Features
  { const s=deck.slides.add(); base(s,5,'Key features'); title(s,'The experience is built around exploration','Real project surfaces provide different ways to learn from the same source-linked collection.');
    img(s,'explorer.png',56,225,550,260,'GRAVERSE Explorer filtered for Mars'); img(s,'academy.png',674,225,550,260,'GRAVERSE Space Academy');
    text(s,'EXPLORER',56,510,200,20,14,C.cyan,true); text(s,'136-event timeline, destination views, artifact views, filters, and shareable URL state.',56,543,550,45,17,C.muted);
    text(s,'SPACE ACADEMY',674,510,250,20,14,C.gold,true); text(s,'Four learning journeys, twelve lessons, quizzes, plain-language learning, and three age bands for ages 5–12.',674,543,530,48,17,C.muted);
    note(s,['Product screenshots captured from local /explorer and /academy routes.','Feature counts from README.md and docs/DATA_AND_PROVENANCE.md.']);
  }

  // 6: Why works
  { const s=deck.slides.add(); base(s,6,'Why GRAVERSE works'); title(s,'Storytelling carries accuracy forward','GRAVERSE makes the difficult part of the challenge visible: meaningful stories without losing scientific integrity.');
    const rows=[
      ['Evidence stays attached','Each important claim links to a registered public source, and unknown values remain Unknown.'],
      ['One dataset, many learning paths','Museum, Explorer, Academy, stories, and explainers point back to the same records.'],
      ['Different ages, shared truth','The Academy adapts the route and language for ages 5–12 without changing the evidence.'],
      ['Accessible by design','Text alternatives, keyboard controls, reduced-motion support, and English/Arabic interface support widen participation.']
    ];
    rows.forEach((r,i)=>{ const y=224+i*96; box(s,56,y,1166,76,i===0?C.panel:C.navy); text(s,r[0],84,y+16,300,25,19,i===0?C.cyan:C.white,true); text(s,r[1],408,y+15,770,42,17,C.muted); });
    text(s,'The result is a curated archive that is engaging enough to explore and transparent enough to inspect.',56,636,1050,30,20,C.white,true);
    note(s,['Accuracy and accessibility statements based on docs/DATA_AND_PROVENANCE.md and docs/ACCESSIBILITY.md.','Do not characterize the project as NASA-certified, exhaustive, or a live telemetry feed.']);
  }

  // 7: Vision
  { const s=deck.slides.add(); base(s,7,'Impact and future vision');
    text(s,'Their missions ended.',56,125,850,70,47,C.white,true); text(s,'Their stories continue.',56,192,850,70,47,C.red,true);
    text(s,'GRAVERSE gives students, educators, and curious explorers one trustworthy place to meet the machines that changed what humanity knows about space.',56,292,660,95,23,C.muted);
    box(s,56,440,1050,88,C.navy); text(s,'Next: grow the curated collection, expand classroom-ready learning paths, add more narrated stories, and deepen multilingual access while keeping every claim source-linked.',84,463,990,46,19,C.white);
    box(s,56,578,305,58,C.red); text(s,'Explore GRAVERSE',82,595,220,24,17,C.white,true);
    text(s,'[PROJECT WEBSITE URL]',56,630,420,24,15,C.cyan,true);
    text(s,'NASA Space Apps Challenge 2026  |  [TEAM NAME]',850,612,350,44,14,C.muted,false,{align:'right'});
    note(s,['Closing slide. Future items are proposals, not implemented claims.','Project framing from README.md.']);
  }

  await (await PresentationFile.exportPptx(deck)).save(candidatePath);
  const { finalizePresentation } = await import(pathToFileURL(path.join(skillDir,'container_tools/artifact_tool_utils.mjs')).href);
  const result = await finalizePresentation({
    explicitTotalSlideCount:7,
    requiredNativeTableOwnerSlides:[],
    requiredNativeChartOwnerSlides:[],
    workspaceDir,
    candidatePath,
    finalPath,
    pythonExecutable:'/Users/faridelsayed/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3',
    integrityValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_package_integrity.py'),
    layoutValidatorPath:path.join(skillDir,'container_tools/inspect_presentation_layout_geometry.py'),
    layoutArgs:['--expected-slide-size-emu','12192000,6858000','--validate-bullet-geometry','--validate-heading-fit'],
    fontPolicy:{basis:'design',families:[font]},
    verifyArtifactToolImport:true,
    receiptPath:path.join(buildDir,'validation-final.json'),
  });
  console.log(JSON.stringify({finalPath,result},null,2));
}
main().catch(e=>{console.error(e);process.exitCode=1;});
