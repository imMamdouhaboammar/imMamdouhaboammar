import test from "node:test";
import assert from "node:assert/strict";
import {START,END,PROJECTS,PHASES,dayPlan,daysBetweenInclusive,allSessions,phaseIndex,monthMatrix,isInRange,cairoToday} from "../plan.mjs";
test("six calendar months have inclusive boundaries and 182 days",()=>{
 assert.equal(START,"2026-10-03");assert.equal(END,"2027-04-02");
 assert.equal(daysBetweenInclusive().length,182);
 assert.equal(daysBetweenInclusive()[181],END);
 assert.equal(PHASES.length,6);
 for(const d of ["2026-10-03","2026-11-03","2026-12-03","2027-01-03","2027-02-03","2027-03-03"])assert.ok(phaseIndex(d)>=0);
 assert.equal(phaseIndex("2027-04-03"),-1);
});
test("all ten products have unique ids, links and six explicit gates",()=>{
 assert.equal(PROJECTS.length,10);assert.equal(new Set(PROJECTS.map(p=>p.id)).size,10);
 for(const p of PROJECTS){assert.equal(p.deliverables.length,6);assert.ok(p.objective.length>20);assert.match(p.repo,/^https:\/\/github.com\//);}
});
test("Saturday start shows agent-kernel, Rafiq, delegate-team and X",()=>{
 assert.deepEqual(dayPlan(START).map(t=>t.projectId),["kernel","rafiq","delegate","x"]);
});
test("weekly allocations: MVP two sessions each, POC two each, X one, Sunday review",()=>{
 const week=daysBetweenInclusive("2026-10-05","2026-10-11").flatMap(dayPlan);
 for(const id of ["get-fable","motion","kernel","pymc","teola","autotok","prepilot","rafiq","delegate"]){assert.equal(week.filter(t=>t.projectId===id).length,2,id);}
 assert.equal(week.filter(t=>t.projectId==="x").length,1);
 assert.equal(week.filter(t=>t.projectId===null).length,1);
});
test("entire plan has 494 sessions plus 26 recovery reviews",()=>{
 const sessions=allSessions();assert.equal(sessions.filter(t=>t.projectId).length,494);
 assert.equal(sessions.filter(t=>!t.projectId).length,26);
 assert.equal(new Set(sessions.map(s=>s.id)).size,sessions.length);
});
test("correct phase boundaries including February and leap-safe dates",()=>{
 assert.equal(phaseIndex("2026-11-02"),0);assert.equal(phaseIndex("2026-11-03"),1);
 assert.equal(phaseIndex("2027-03-02"),4);assert.equal(phaseIndex("2027-03-03"),5);
 assert.equal(isInRange("2027-02-29"),false);
 assert.deepEqual(dayPlan("2027-04-03"),[]);
});
test("month matrix uses Monday start and displays outside-date placeholders",()=>{
 const m=monthMatrix(2026,9);assert.equal(m.length,42);assert.equal(m[0],"2026-09-28");assert.equal(m[5],START);
});
test("today follows Cairo day at UTC midnight",()=>{
 assert.equal(cairoToday(new Date("2026-10-02T22:15:00Z")),"2026-10-03");
});
