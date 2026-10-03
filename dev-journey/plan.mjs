// Six-month development journey. Dates are ISO strings in Africa/Cairo.
export const START = "2026-10-03";
export const END = "2027-04-02";
export const PHASE_STARTS = ["2026-10-03","2026-11-03","2026-12-03","2027-01-03","2027-02-03","2027-03-03"];
export const PHASES = [
  { name:"Establish the baseline", label:"01 / BASELINE", gate:"Define one user journey, measurable acceptance criteria, and a reproducible baseline for every active product." },
  { name:"Prove the core workflow", label:"02 / PROOF", gate:"Demonstrate each project's core use case end-to-end with recorded evidence, not a README claim." },
  { name:"Put it in real hands", label:"03 / PILOT", gate:"Run controlled pilot sessions, document friction, and prioritize what blocks task completion." },
  { name:"Make failure recoverable", label:"04 / RELIABILITY", gate:"Cover the major error paths and ensure a repeatable release and rollback process." },
  { name:"Measure practical use", label:"05 / ADOPTION", gate:"Measure completed user outcomes and maintenance cost, then remove low-value complexity." },
  { name:"Ship or consciously pause", label:"06 / RELEASE", gate:"Publish release evidence for stable products; decide continue/pivot/pause for all ten." }
];
const GH = "https://github.com/imMamdouhaboammar/";
export const PROJECTS = [
  {id:"get-fable",name:"get-fable",repo:GH+"get-fable",tier:"MVP",objective:"A developer can install, complete a real task, and verify the result.",deliverables:[
    "Record three representative coding tasks and their pre-change baselines",
    "Reproduce and fix the largest onboarding or routing failure",
    "Complete three fresh-repository installs and collect traces",
    "Run failure/recovery and security regression suites",
    "Compare task completion and human intervention across five trials",
    "Publish a documented release with repeatable installation evidence"
  ]},
  {id:"motion",name:"motion-graphics-skills",repo:GH+"motion-graphics-skills",tier:"MVP",objective:"A new user can render high-quality videos from reproducible projects.",deliverables:[
    "Baseline three video references and define visual acceptance criteria",
    "Make one reference-matched animation pipeline repeatable",
    "Have a fresh user generate two videos using documentation alone",
    "Test missing assets, fonts, render failures, and deterministic outputs",
    "Compare reference fidelity and production effort for three renders",
    "Publish three verified showpieces with sources and complete render instructions"
  ]},
  {id:"kernel",name:"agent-kernel",repo:GH+"agent-kernel",tier:"MVP",objective:"Local agent context and governance survive real projects without unsafe surprises.",deliverables:[
    "Define approved memory scope and the three supported onboarding paths",
    "Verify fresh installs and uninstallation with no data loss",
    "Run multi-agent cross-session governance scenarios",
    "Prove policy-deny, rollback, and secrets exclusion behavior",
    "Measure repeat failures and context continuity on sample projects",
    "Release cross-platform evidence and a migration guide"
  ]},
  {id:"pymc",name:"PyMC Marketing MCP",repo:GH+"pymc-marketing-mcp",tier:"POC",objective:"Marketing decisions carry statistical diagnostics and reproducible evidence.",deliverables:[
    "Lock a reproducible data contract and known-unsafe scenarios",
    "Complete one scientifically checked MMM to decision workflow",
    "Pilot with an independent marketing dataset and explicit caveats",
    "Verify invalid data, non-convergence, recovery, and permission boundaries",
    "Benchmark decision reports and trace claims back to model artifacts",
    "Publish three reproducible cases, refusal demonstrations, and deployment guide"
  ]},
  {id:"autotok",name:"AutoTok",repo:GH+"tiktok-auto-uploader",tier:"POC",objective:"Authorized accounts can publish with clear status, retries, and audit logs.",deliverables:[
    "Separate supported publishing methods from unsupported or risky claims",
    "Prove one authorized publishing path and explain errors",
    "Complete a small account-owner-supervised pilot under platform rules",
    "Test idempotency, retries, session expiry, and recovery without duplicate posts",
    "Measure success/failure rates using real permitted operations",
    "Publish a compliant limited beta with documented constraints"
  ]},
  {id:"teola",name:"Teolaa",repo:GH+"Teolaa",tier:"POC",objective:"A client can move a UGC brief through creator delivery and approval.",deliverables:[
    "Map client, creator, and admin journeys with one critical flow",
    "Complete brief to creator handoff without manual database edits",
    "Pilot one full campaign lifecycle with consenting testers",
    "Test authorization, payment boundaries, upload errors, and retries",
    "Measure time to approved asset and manual intervention rate",
    "Release a bounded creator/client beta and known-limits register"
  ]},
  {id:"rafiq",name:"Rafiq-Bot",repo:GH+"Rafiq-Bot",tier:"POC",objective:"A private companion with reliable conversation and user-controlled memory.",deliverables:[
    "Specify consent, memory boundaries, retention, and deletion",
    "Run verified multilingual conversation and memory scenarios",
    "Pilot opt-in multi-day sessions with controlled test personas",
    "Test hallucinated memories, export, deletion, and provider outages",
    "Measure recall accuracy and user correction rates",
    "Release a privacy-reviewed pilot with explicit opt-in and delete controls"
  ]},
  {id:"delegate",name:"delegate-team",repo:GH+"delegate-team",tier:"POC",objective:"Agent handoffs complete tasks with bounded permissions and visible proof.",deliverables:[
    "Select five bounded delegation scenarios and success criteria",
    "Prove CLI routing and one end-to-end delegated task",
    "Test handoffs on independent repositories with operator approval",
    "Verify denied actions, timeouts, cancellation, and trace completeness",
    "Measure task completion, cost, and human handoffs on twenty runs",
    "Ship reproducible multi-agent examples and a stable compatibility matrix"
  ]},
  {id:"prepilot",name:"PrePilot",repo:GH+"prepilot-backend",secondaryRepo:GH+"prepilot-frontend",tier:"POC",objective:"An agency user can securely connect and finish one paid-media workflow.",deliverables:[
    "Choose one canonical backend/frontend pairing and freeze the contract",
    "Prove auth, workflow execution, result retrieval, and logout",
    "Pilot with three real-world agency briefs and human review",
    "Verify token storage, secrets exposure, rate limits, and recovery",
    "Measure time to usable output and unsupported user requests",
    "Ship one integrated beta with installation, support, and handoff docs"
  ]},
  {id:"x",name:"Oh-My-X-Tweets",repo:GH+"Oh-My-X-Tweets",tier:"CONCEPT",objective:"Schedule and post from authorized X accounts without exposing credentials.",deliverables:[
    "Audit exposed configuration and define safe credential handling",
    "Confirm supported X API permissions and build one secure publish path",
    "Pilot two owner-approved profiles and verify job outcomes",
    "Test token expiry, failures, deduplication, and secret handling",
    "Measure success rates against official API restrictions and cost",
    "Make an evidence-backed go/no-go decision for continued investment"
  ]}
];
export const PROJECT_BY_ID = Object.fromEntries(PROJECTS.map(p=>[p.id,p]));
const MVP = {1:"get-fable",2:"motion",3:"kernel",4:"get-fable",5:"motion",6:"kernel"};
const POC = {1:["pymc","teola"],2:["autotok","prepilot"],3:["rafiq","delegate"],4:["pymc","teola"],5:["autotok","prepilot"],6:["rafiq","delegate"]};
const ACTIONS = [
  "Inspect evidence and define the smallest acceptance test",
  "Implement one bounded change tied to the monthly gate",
  "Write or improve a regression test before changing behavior",
  "Run a fresh end-to-end check and capture failures",
  "Fix the most consequential blocker and document the trade-off",
  "Record a PR, test run, demo, or decision as evidence"
];
function parseISO(iso){if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return null;const d=new Date(iso+"T12:00:00Z");return Number.isNaN(d.getTime())||d.toISOString().slice(0,10)!==iso?null:d;}
export function isInRange(iso){return !!parseISO(iso)&&iso>=START&&iso<=END;}
export function phaseIndex(iso){if(!isInRange(iso))return -1;for(let i=PHASE_STARTS.length-1;i>=0;i--){if(iso>=PHASE_STARTS[i])return i;}return -1;}
export function dayPlan(iso){
  if(!isInRange(iso))return [];
  const weekday=parseISO(iso).getUTCDay(),phase=phaseIndex(iso);
  if(weekday===0)return [{id:iso+":review",date:iso,projectId:null,title:"Weekly review and recovery",task:"Review evidence, shift unfinished sessions, and protect the next week's focus.",minutes:30,phase}];
  const ids=[MVP[weekday],...POC[weekday],...(weekday===6?["x"]:[])];
  return ids.map((id,i)=>{const p=PROJECT_BY_ID[id];const action=ACTIONS[(Math.floor((parseISO(iso)-parseISO(START))/86400000/7)+i)%ACTIONS.length];return {id:iso+":"+id,date:iso,projectId:id,title:p.deliverables[phase],task:action,minutes:i===0?90:id==="x"?30:50,phase};});
}
export function daysBetweenInclusive(start=START,end=END){
  if(!parseISO(start)||!parseISO(end)||start>end)return [];
  const out=[];for(let d=parseISO(start);d<=parseISO(end);d.setUTCDate(d.getUTCDate()+1))out.push(d.toISOString().slice(0,10));return out;
}
export function allSessions(){return daysBetweenInclusive().flatMap(dayPlan);}
export function cairoToday(now=new Date()){
  const parts=new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Cairo",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
  const find=k=>parts.find(p=>p.type===k)?.value;
  return [find("year"),find("month"),find("day")].join("-");
}
export function monthMatrix(year,month){
  if(!Number.isInteger(year)||!Number.isInteger(month)||month<0||month>11)return [];
  const first=new Date(Date.UTC(year,month,1,12)),pad=(first.getUTCDay()+6)%7;
  const start=new Date(first);start.setUTCDate(start.getUTCDate()-pad);
  const days=[];for(let i=0;i<42;i++){const d=new Date(start);d.setUTCDate(start.getUTCDate()+i);days.push(d.toISOString().slice(0,10));}
  return days;
}
