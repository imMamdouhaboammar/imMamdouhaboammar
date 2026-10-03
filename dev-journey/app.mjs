import {START,END,PHASES,PHASE_STARTS,PROJECTS,PROJECT_BY_ID,dayPlan,phaseIndex,monthMatrix,isInRange,cairoToday,allSessions} from "./plan.mjs";

const $=id=>document.getElementById(id);
const sessions=allSessions();
const sessionIds=new Set(sessions.map(s=>s.id));
const gateIds=new Set(PROJECTS.flatMap(p=>PHASES.map((_,i)=>p.id+":"+i)));
const STORE="mamdouh-dev-journey-v1";
const MONTH_FIRST=2026*12+9;
const MONTH_LAST=2027*12+3;
const today=cairoToday();
const clamp=d=>d<START?START:d>END?END:d;
const urlDay=new URL(location.href).searchParams.get("day");
let selected=isInRange(urlDay)?urlDay:clamp(today);
let monthCursor=Number(selected.slice(0,4))*12+Number(selected.slice(5,7))-1;
let filter="ALL";
let storageAvailable=true;
const empty=()=>({version:1,checked:{},notes:{},evidence:{},gates:{}});
const validEvidence=value=>{if(typeof value!=="string"||value.length>1200)return false;try{const u=new URL(value);return u.protocol==="https:"&&!u.username&&!u.password;}catch{return false;}};
function clean(raw){
 if(!raw||raw.version!==1||typeof raw!=="object"||Array.isArray(raw))throw Error("Unsupported progress format");
 const safe=empty();
 for(const [k,v] of Object.entries(raw.checked||{}))if(sessionIds.has(k)&&v===true)safe.checked[k]=true;
 for(const [k,v] of Object.entries(raw.gates||{}))if(gateIds.has(k)&&v===true)safe.gates[k]=true;
 for(const [k,v] of Object.entries(raw.notes||{}))if(isInRange(k)&&typeof v==="string")safe.notes[k]=v.slice(0,2000);
 for(const [k,v] of Object.entries(raw.evidence||{}))if(sessionIds.has(k)&&validEvidence(v))safe.evidence[k]=v;
 return safe;
}
function load(){
 try{const raw=localStorage.getItem(STORE);return raw?clean(JSON.parse(raw)):empty();}
 catch(e){if(e instanceof DOMException)storageAvailable=false;return empty();}
}
let state=load();
function persist(message){
 try{localStorage.setItem(STORE,JSON.stringify(state));storageAvailable=true;status(message||"Saved locally");}
 catch{storageAvailable=false;status("Storage unavailable. Export a JSON backup to keep your progress.");}
}
function status(message){$("save-status").textContent=message;}
function node(tag,cl,text){const e=document.createElement(tag);if(cl)e.className=cl;if(text!==undefined)e.textContent=text;return e;}
function formatDate(date,opts){return new Intl.DateTimeFormat("en-GB",{timeZone:"UTC",...opts}).format(new Date(date+"T12:00:00Z"));}
function monthIndexToDate(m){const y=Math.floor(m/12),month=(m%12)+1;return y+"-"+String(month).padStart(2,"0")+"-01";}
function inFilter(item){return item.projectId===null?filter==="ALL":filter==="ALL"||PROJECT_BY_ID[item.projectId].tier===filter;}
function shownProjects(){return PROJECTS.filter(p=>filter==="ALL"||p.tier===filter);}
function duration(minutes){return Math.floor(minutes/60)?Math.floor(minutes/60)+"H"+(minutes%60?" "+minutes%60+"M":""):minutes+"M";}
function setDate(day){if(!isInRange(day))return;selected=day;monthCursor=Number(day.slice(0,4))*12+Number(day.slice(5,7))-1;const u=new URL(location.href);u.searchParams.set("day",day);history.replaceState(null,"",u.pathname+u.search+u.hash);render();}
function setMonth(dir){
 const next=monthCursor+dir;if(next<MONTH_FIRST||next>MONTH_LAST)return;
 const iso=monthIndexToDate(next),ym=iso.slice(0,7);
 const matching=selected.startsWith(ym)?selected:clamp(iso);
 setDate(matching);
}
function renderMetrics(){
 const done=sessions.filter(x=>x.projectId&&state.checked[x.id]).length,projectSessions=sessions.filter(x=>x.projectId).length;
 $("metric-done").replaceChildren(document.createTextNode(String(done)+" "),node("small","","/ "+projectSessions));
 const percent=Math.round(done/projectSessions*100);
 $("progress-percent").textContent=percent+"%";$("progress-fill").style.width=percent+"%";$("progressbar").setAttribute("aria-valuenow",String(percent));
 const now=clamp(today),phase=phaseIndex(now);
 $("metric-phase").replaceChildren(document.createTextNode(String(phase+1).padStart(2,"0")+" "),node("small","","/ 06"));
 $("metric-phase-name").textContent=PHASES[phase].name;
 const dt=new Date(now+"T12:00:00Z"),weekday=(dt.getUTCDay()+6)%7;dt.setUTCDate(dt.getUTCDate()-weekday);
 const start=dt.toISOString().slice(0,10),endDate=new Date(dt);endDate.setUTCDate(endDate.getUTCDate()+6);
 const end=endDate.toISOString().slice(0,10);
 const week=sessions.filter(t=>t.projectId&&t.date>=start&&t.date<=end);
 const checked=week.filter(t=>state.checked[t.id]).length;
 $("metric-week").replaceChildren(document.createTextNode(String(checked)+" "),node("small","","/ "+week.length));
 const left=Math.max(0,Math.ceil((new Date(END+"T12:00:00Z")-new Date(today+"T12:00:00Z"))/86400000));
 $("metric-left").textContent=String(left);
}
function renderPhases(){
 const parent=$("phase-list");parent.replaceChildren();
 PHASES.forEach((phase,i)=>{
   const b=node("button","phase-button"+(phaseIndex(selected)===i?" active":""),"");
   b.type="button";b.setAttribute("aria-current",phaseIndex(selected)===i?"step":"false");
   b.append(node("strong","",String(i+1).padStart(2,"0")),node("span","",phase.name));
   b.addEventListener("click",()=>setDate(PHASE_STARTS[i]));parent.append(b);
 });
}
function renderFilters(){
 for(const b of $("filters").querySelectorAll("button[data-filter]")){
   const on=b.dataset.filter===filter;b.classList.toggle("active",on);b.setAttribute("aria-pressed",String(on));
 }
}
function renderCalendar(){
 const ym=monthIndexToDate(monthCursor),year=Number(ym.slice(0,4)),month=Number(ym.slice(5,7))-1;
 $("month-title").textContent=formatDate(ym,{month:"long",year:"numeric"});
 $("prev-month").disabled=monthCursor<=MONTH_FIRST;$("next-month").disabled=monthCursor>=MONTH_LAST;
 const grid=$("calendar-grid");grid.replaceChildren();
 for(const date of monthMatrix(year,month)){
   const outside=date.slice(0,7)!==ym.slice(0,7)||!isInRange(date);
   const plan=outside?[]:dayPlan(date).filter(t=>t.projectId&&inFilter(t));
   const done=plan.filter(t=>state.checked[t.id]).length;
   const b=node("button","day"+(outside?" off":"")+(date===selected?" selected":"")+(date===today?" today":"")+(new Date(date+"T12:00:00Z").getUTCDay()===0?" rest":""));
   b.type="button";b.disabled=outside;
   const label=date+" · "+plan.length+" project sessions · "+done+" completed";
   b.setAttribute("aria-label",label);if(date===selected)b.setAttribute("aria-pressed","true");else b.setAttribute("aria-pressed","false");
   const n=node("span","day-num",String(Number(date.slice(8,10))));if(date===today&&!outside)n.append(node("sup","","TODAY"));b.append(n);
   const marks=node("span","marks");
   for(const item of plan){const dot=node("i","dot-"+PROJECT_BY_ID[item.projectId].tier.toLowerCase());dot.setAttribute("aria-hidden","true");marks.append(dot);}
   if(done&&plan.length)marks.append(node("span","small-done",done+"/"+plan.length));
   b.append(marks);
   if(!outside)b.addEventListener("click",()=>setDate(date));
   grid.append(b);
 }
}
function renderAgenda(){
 const phase=phaseIndex(selected),day=dayPlan(selected).filter(inFilter);
 $("selected-date").textContent=formatDate(selected,{weekday:"short",day:"2-digit",month:"short",year:"numeric"}).toUpperCase();
 const sunday=new Date(selected+"T12:00:00Z").getUTCDay()===0;
 $("agenda-title").textContent=sunday?"Weekly review":"Daily assignment";
 $("day-label").textContent=sunday?"REFLECT / RESET":PHASES[phase].label;
 $("day-description").textContent=sunday?"Recover the week without adding feature work.":PHASES[phase].gate;
 $("day-estimate").textContent=duration(day.reduce((n,t)=>n+t.minutes,0));
 const parent=$("agenda-items");parent.replaceChildren();
 if(!day.length)parent.append(node("div","empty","No sessions from this workstream on this date. Change the filter or choose another day."));
 for(const entry of day){
   if(!entry.projectId){
     const c=node("div","task-card review-card");c.append(node("p","rest-heading",entry.title),node("p","rest-copy",entry.task));const check=makeCheck(entry.id,!!state.checked[entry.id],c);c.prepend(check);parent.append(c);continue;
   }
   const project=PROJECT_BY_ID[entry.projectId],card=node("article","task-card"+(state.checked[entry.id]?" done":""));
   const main=node("div","task-main"),check=makeCheck(entry.id,!!state.checked[entry.id],card);
   const content=node("div","task-content"),top=node("div","task-top");
   const link=node("a","task-name",project.name);link.href=project.repo;link.target="_blank";link.rel="noopener noreferrer";
   top.append(link,node("span","tier-pill "+project.tier,project.tier),node("span","task-minutes",duration(entry.minutes)));
   content.append(top,node("p","task-title",entry.title),node("p","task-action",entry.task));
   const ev=node("div","task-evidence"),label=node("label","","EVIDENCE URL");
   const input=node("input");input.type="url";input.placeholder="https://github.com/.../pull/123";input.maxLength=1200;
   input.value=state.evidence[entry.id]||"";input.id="evidence-"+entry.projectId+"-"+selected;label.htmlFor=input.id;
   const evLink=node("a","","OPEN ↗");evLink.target="_blank";evLink.rel="noopener noreferrer";
   const updateLink=()=>{const url=state.evidence[entry.id];evLink.hidden=!url;if(url)evLink.href=url;else evLink.removeAttribute("href");};updateLink();
   input.addEventListener("change",()=>{
     const v=input.value.trim();
     if(v&&!validEvidence(v)){input.setCustomValidity("Use a valid HTTPS URL without embedded credentials.");input.reportValidity();status("Evidence must be an HTTPS URL.");return;}
     input.setCustomValidity("");if(v)state.evidence[entry.id]=v;else delete state.evidence[entry.id];
     updateLink();persist("Evidence saved locally");
   });
   ev.append(label,input,evLink);content.append(ev);main.append(check,content);card.append(main);parent.append(card);
 }
 $("day-notes").value=state.notes[selected]||"";
}
function makeCheck(key,isChecked,card){
 const checkbox=node("input","task-check");checkbox.type="checkbox";checkbox.checked=isChecked;
 checkbox.setAttribute("aria-label","Mark "+key+" completed");
 checkbox.addEventListener("change",()=>{if(checkbox.checked)state.checked[key]=true;else delete state.checked[key];card.classList.toggle("done",checkbox.checked);persist("Session status saved locally");renderMetrics();renderCalendar();});
 return checkbox;
}
function renderGates(){
 const phase=phaseIndex(selected),items=shownProjects(),parent=$("gate-items");parent.replaceChildren();
 $("gate-description").textContent=PHASES[phase].gate+" Mark targets only when supported by a test, user result, or explicit decision.";
 const count=items.filter(p=>state.gates[p.id+":"+phase]).length;$("gate-count").textContent=count+" / "+items.length+" VERIFIED";
 for(const p of items){
   const key=p.id+":"+phase,checked=!!state.gates[key],card=node("article","gate-card"+(checked?" verified":""));
   const box=node("input");box.type="checkbox";box.checked=checked;box.setAttribute("aria-label","Verified "+p.name+" phase "+(phase+1));
   const content=node("div");const link=node("a","",p.name);link.href=p.repo;link.target="_blank";link.rel="noopener noreferrer";
   content.append(link,node("p","",p.deliverables[phase]));
   box.addEventListener("change",()=>{if(box.checked)state.gates[key]=true;else delete state.gates[key];persist("Milestone decision saved locally");renderGates();});
   card.append(box,content);parent.append(card);
 }
}
function render(){renderMetrics();renderPhases();renderFilters();renderCalendar();renderAgenda();renderGates();}
$("prev-month").addEventListener("click",()=>setMonth(-1));
$("next-month").addEventListener("click",()=>setMonth(1));
$("today-button").addEventListener("click",()=>setDate(clamp(cairoToday())));
$("filters").addEventListener("click",event=>{const b=event.target.closest("button[data-filter]");if(!b)return;filter=b.dataset.filter;render();});
$("day-notes").addEventListener("input",event=>{if(event.target.value)state.notes[selected]=event.target.value;else delete state.notes[selected];persist("Notes saved locally");});
$("copy-plan").addEventListener("click",async()=>{
 const lines=[selected+" · "+PHASES[phaseIndex(selected)].name,...dayPlan(selected).filter(inFilter).map(t=>"- "+(t.projectId?PROJECT_BY_ID[t.projectId].name:"Review")+": "+t.title+" ("+t.minutes+"min)")];
 try{await navigator.clipboard.writeText(lines.join("\n"));status("Day plan copied");}
 catch{status("Clipboard permission unavailable; use Export JSON for a backup.");}
});
$("export-button").addEventListener("click",()=>{
 const out={...state,exportedAt:new Date().toISOString(),source:"Mamdouh Dev Journey"};
 const blob=new Blob([JSON.stringify(out,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob),a=node("a");
 a.href=url;a.download="dev-journey-"+cairoToday()+".json";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);status("JSON backup downloaded");
});
$("import-button").addEventListener("click",()=>$("import-file").click());
$("import-file").addEventListener("change",async event=>{
 const file=event.target.files?.[0];if(!file)return;
 try{if(file.size>250000)throw Error("File is larger than the expected progress snapshot");
 const next=clean(JSON.parse(await file.text()));
 if(!window.confirm("Replace this browser's progress with the selected JSON backup?"))return;
 state=next;persist("Backup imported and stored locally");render();
 }catch(e){status("Import rejected: "+e.message);}
 finally{event.target.value="";}
});
render();
if(!storageAvailable)status("Storage is blocked in this browser. Use Export JSON to keep progress.");
