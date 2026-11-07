import json
V=json.load(open("vo.json"))
gap={"h2":0.06,"p1":0.28,"p2":0.18,"p3":0.18,"c0":0.32,"c1":0.16,"s0":0.32,"a1":0.34,"a2":0.16,"a3":0.16,"e1":0.34,"e2":0.12}
t=0.18; ph={}
for v in V:
    t+=gap.get(v['id'],0.09)
    v['start']=round(t,3); v['end']=round(t+v['dur'],3)
    for w in v['words']: w['s']=round(w['s']+t,3); w['e']=round(w['e']+t,3)
    ph[v['id']]=v; t=v['end']
END=59.5
def S(i):return ph[i]['start']
def W(i,k):return ph[i]['words'][k]['s']
scenes=[("hook",0,S("p1")),("cases",S("p1"),S("p2")),("chronic",S("p2"),S("p3")),("map",S("p3"),S("c0")),
("why",S("c0"),S("c1")),("causes",S("c1"),S("c6")),("homes",S("c6"),S("s0")),("signs",S("s0"),S("a1")),
("lact",S("a1"),S("a2")),("growth",S("a2"),S("a3")),("help",S("a3"),S("e1")),("end",S("e1"),END)]
scenes=[{"n":n,"s":round(a-0.12 if i else 0,3),"e":round((b-0.12) if i<len(scenes)-1 else END,3)} for i,(n,a,b) in enumerate(scenes)]
cues={
 "hook_cada":W("h1",0),"hook_col":W("h1",3),"hook_num":W("h1",6),"hook_kids":W("h1",7),"hook_dnt":W("h2",3),
 "cases_num":W("p1",5),"chron_1":W("p2",1),"chron_crece":W("p2",9),
 "map_g":W("p3",0),"map_c":W("p3",2),"map_v":W("p3",4),
 "why":S("c0"),"c1":S("c1"),"c2":S("c2"),"c3":S("c3"),"c4":S("c4"),"c5":S("c5"),"c5b":W("c5",4),
 "homes_num":W("c6",3),"s0":S("s0"),"s1":S("s1"),"s2":S("s2"),"s3":S("s3"),"s4":S("s4"),"s5":S("s5"),"s5b":W("s5",3),
 "a1":S("a1"),"a1m":W("a1",5),"a2":S("a2"),"a3":S("a3"),"a3l":W("a3",11),"e1":S("e1"),"e1p":W("e1",4),"e2":S("e2"),"share":W("e2",6),
}
json.dump({"end":END,"phrases":V,"scenes":scenes,"cues":cues},open("timeline.json","w"),ensure_ascii=False,indent=1)
print("END",END,"vo_end",t)
for s in scenes: print(s)
