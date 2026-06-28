import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import { Database, GraduationCap, Search, ShieldCheck, Bot, FileText, GitCompare, MapPinned } from 'lucide-react';
import './style.css';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

type Page = 'overview'|'universities'|'research'|'database'|'sources'|'compare'|'essay';
const pages: {id:Page; label:string; icon:any}[] = [
  {id:'overview',label:'Overview',icon:GraduationCap},
  {id:'universities',label:'Universities',icon:Search},
  {id:'research',label:'Research AI',icon:Bot},
  {id:'database',label:'Database / ERD',icon:Database},
  {id:'sources',label:'Sources',icon:ShieldCheck},
  {id:'compare',label:'Compare',icon:GitCompare},
  {id:'essay',label:'Essay AI',icon:FileText},
];
const sampleUniversities = [
  {name:'Princeton University', city:'Princeton', state:'New Jersey', type:'Private', courses:['Computer Science','Economics','Public Policy']},
  {name:'Massachusetts Institute of Technology', city:'Cambridge', state:'Massachusetts', type:'Private', courses:['Computer Science','Aerospace Engineering','Mechanical Engineering']},
  {name:'University of Florida', city:'Gainesville', state:'Florida', type:'Public', courses:['Computer Science','Veterinary Medicine','Business']},
  {name:'University of Central Florida', city:'Orlando', state:'Florida', type:'Public', courses:['Computer Science','Cybersecurity','Engineering']},
];
function App(){
  const [page,setPage] = useState<Page>('overview');
  const [query,setQuery] = useState('');
  const connected = Boolean(supabase);
  function routeSearch(){ const q=query.toLowerCase(); if(q.includes('univer')) setPage('universities'); else if(q.includes('source')) setPage('sources'); else if(q.includes('research')||q.includes('transfer')||q.includes('data')) setPage('research'); else if(q.includes('compare')) setPage('compare'); else if(q.includes('essay')) setPage('essay'); else setPage('overview'); }
  return <div className="app"><aside className="sidebar"><div className="brand"><div className="logo">FB</div><div><h1>FutureBridge</h1><p>AI University Intelligence</p></div></div><nav>{pages.map(p=>{const Icon=p.icon; return <button key={p.id} onClick={()=>setPage(p.id)} className={page===p.id?'active':''}><Icon size={18}/>{p.label}</button>})}</nav><div className="status">Supabase: <b className={connected?'ok':'warn'}>{connected?'connected':'not configured'}</b></div></aside><main><div className="top"><div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')routeSearch()}} placeholder="Search universities, courses, transfer, sources..."/></div><span className="pill">v6.0 data engine</span></div>{page==='overview'&&<Overview/>}{page==='universities'&&<Universities/>}{page==='research'&&<Research/>}{page==='database'&&<DatabaseView/>}{page==='sources'&&<Sources/>}{page==='compare'&&<Compare/>}{page==='essay'&&<Essay/>}</main></div>
}
function Overview(){return <><section className="hero"><h2>Verified data first. AI research second. No invented facts.</h2><p>FutureBridge 6.0 is built around structured data, source tracking, confidence levels and AI-assisted university research.</p><div className="row"><button className="primary">Open Research AI</button><button>View database plan</button></div></section><div className="cards"><Card n="500+" t="universities planned"/><Card n="200+" t="courses planned"/><Card n="12" t="AI research modules"/><Card n="100%" t="important facts sourced"/></div></>}
function Card({n,t}:{n:string;t:string}){return <div className="card"><strong>{n}</strong><p>{t}</p></div>}
function Universities(){return <section className="panel"><h2>Universities</h2><p>Sample records. Production records come from Supabase and Research AI jobs.</p><div className="grid">{sampleUniversities.map(u=><div className="uni" key={u.name}><div className="campus"><MapPinned/></div><h3>{u.name}</h3><p>{u.city}, {u.state} • {u.type}</p><p>{u.courses.map(c=><span className="tag" key={c}>{c}</span>)}</p><button>Open verified profile</button></div>)}</div></section>}
function Research(){const [out,setOut]=useState(''); function generate(){setOut(JSON.stringify({university:'University of Florida',course:'Computer Science',agents:['University Research AI','Course Research AI','Cost AI','Transfer AI','Career AI','Data Validator AI'],required_sources:['Official website','Academic Catalog','Common Data Set','College Scorecard','IPEDS','BLS','O*NET'],rule:'If not publicly disclosed, store as Not officially disclosed. Never invent.'},null,2))} return <div className="two"><section className="panel"><h2>Research AI Job Builder</h2><p>Create a research job. Later this will call Tavily/Firecrawl/OpenAI and save verified data.</p><button className="primary" onClick={generate}>Generate research job</button></section><section className="panel"><pre>{out||'No job generated yet.'}</pre></section></div>}
function DatabaseView(){return <section className="panel"><h2>Database / ERD</h2><pre>{`universities\n ├─ programs\n │   ├─ program_costs\n │   ├─ program_requirements\n │   ├─ roadmaps\n │   ├─ careers\n │   └─ program_companies\n ├─ admissions\n ├─ transfer_admissions\n ├─ costs\n ├─ rankings\n ├─ scholarships\n ├─ housing\n ├─ campus_life\n ├─ essay_profiles\n └─ sources`}</pre></section>}
function Sources(){return <section className="panel"><h2>Sources</h2><table><tbody>{['Official university website','College Scorecard','IPEDS/NCES','BLS','O*NET','Common Data Set'].map(s=><tr key={s}><td>{s}</td><td><span className="tag">trusted</span></td></tr>)}</tbody></table></section>}
function Compare(){return <section className="panel"><h2>Compare</h2><p>Compares universities by source-backed fields. Dynamic charts come next.</p><table><tbody><tr><td>Cost</td><td>Official COA or program estimate</td></tr><tr><td>Transfer</td><td>Official transfer page</td></tr><tr><td>Salary</td><td>BLS/O*NET/Scorecard</td></tr></tbody></table></section>}
function Essay(){return <section className="panel"><h2>Essay AI</h2><textarea placeholder="Paste essay here..."></textarea><button className="primary">Analyze with university profile</button><p>Future module: compatibility score, university values, rewrite, missing topics, prompt coverage.</p></section>}
createRoot(document.getElementById('root')!).render(<App />);
