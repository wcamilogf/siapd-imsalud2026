import json,wave,numpy as np
SR=44100;TL=json.load(open("timeline.json"));C=TL['cues'];END=TL['end'];N=int(END*SR)
rng=np.random.default_rng(3)
def T(d):return np.arange(int(d*SR))/SR
def lp(x,fc):  # one-pole lowpass
    a=np.exp(-2*np.pi*fc/SR);y=np.empty_like(x);z=0.0
    from scipy.signal import lfilter
    return lfilter([1-a],[1,-a],x)
def hp(x,fc):return x-lp(x,fc)
def add(buf,x,t0,g=1.0):
    i=int(t0*SR)
    if i<0: x=x[-i:];i=0
    j=min(len(buf),i+len(x));buf[i:j]+=x[:j-i]*g
def note(m):return 440*2**((m-69)/12)
def saw(f,t):return 2*((f*t)%1)-1
def env_adsr(n,a,r):
    e=np.ones(n);ai=int(a*SR);ri=int(r*SR)
    if ai: e[:ai]=np.linspace(0,1,ai)
    if ri: e[-ri:]*=np.linspace(1,0,ri)
    return e
music=np.zeros((N,2))
bar=2.4 # 100bpm 4/4
# ---- tension section: Am F Dm E (each 1 bar), pads
prog_t=[[57,60,64],[53,57,60],[50,53,57],[52,56,59]]
prog_h=[[48,52,55,60],[43,50,55,59],[45,52,57,60],[41,48,53,57]] # C G Am F
SPLIT=C['a1']-0.1
def pad(chord,d,bright):
    t=T(d);x=np.zeros(len(t))
    for m in chord:
        for det in(-0.08,0.08):x+=saw(note(m)*(1+det/100*3),t+rng.random())
    x=lp(x,bright);x*=env_adsr(len(t),0.6,0.8);return x/len(chord)/2
t0=0.0;k=0
while t0<SPLIT:
    d=min(bar,SPLIT-t0+0.8)
    br=500+900*min(1,t0/40)
    p=pad(prog_t[k%4],d+0.8,br);add(music[:,0],p,t0,0.22);add(music[:,1],np.roll(p,300),t0,0.22)
    # bass
    bt=T(bar);b=np.sin(2*np.pi*note(prog_t[k%4][0]-24)*bt)*env_adsr(len(bt),0.02,0.3)
    if t0>2.5: add(music[:,0],b,t0,0.25);add(music[:,1],b,t0,0.25)
    t0+=bar;k+=1
# heartbeat-ish pulse (tension): kick on beats 1 and "and" of 1
def kick(d=0.35,f0=110,f1=45,g=1):
    t=T(d);f=f1+(f0-f1)*np.exp(-t*25);ph=2*np.pi*np.cumsum(f)/SR;return np.sin(ph)*np.exp(-t*9)*g
def hat(d=0.06):
    t=T(d);return hp(rng.standard_normal(len(t)),6000)*np.exp(-t*70)
beat=bar/4
tt=0.0
while tt<END-1:
    if tt<SPLIT:
        if tt>2.6:
            if int(round(tt/beat))%4 in(0,):add(music[:,0],kick(),tt,0.5);add(music[:,1],kick(),tt,0.5);add(music[:,0],kick(g=.6),tt+0.22,0.35);add(music[:,1],kick(g=.6),tt+0.22,0.35)
        if tt>7.0:
            for s in(0,beat/2):h=hat();add(music[:,0],h,tt+s,0.06);add(music[:,1],h,tt+s+0.004,0.06)
    tt+=beat
# riser into solution
rd=SPLIT-(C['s5b']+0.6)
t=T(rd);r=lp(rng.standard_normal(len(t)),300)+0.0
nz=rng.standard_normal(len(t));from scipy.signal import lfilter
r=np.zeros(len(t));fc=np.linspace(400,6000,len(t))**1
# cheap sweep: multiple bands mix
for i,(a,b) in enumerate([(400,900),(900,2000),(2000,5000)]):
    seg=hp(lp(nz,b),a);w=np.clip((np.linspace(0,1,len(t))*3-i),0,1);r+=seg*w
r*=np.linspace(0,1,len(t))**2*0.5
add(music[:,0],r,C['s5b']+0.6,0.25);add(music[:,1],r,C['s5b']+0.6,0.25)
# ---- hope section
t0=SPLIT;k=0
def pluck(f,d=0.5):
    t=T(d);x=np.sin(2*np.pi*f*t)+0.35*np.sin(4*np.pi*f*t)+0.1*np.sin(6*np.pi*f*t);return x*np.exp(-t*7)*env_adsr(len(t),0.003,0.02)
while t0<END:
    ch=prog_h[k%4];d=min(bar,END-t0)
    p=pad(ch,d+0.8,2200);add(music[:,0],p,t0,0.22);add(music[:,1],np.roll(p,250),t0,0.22)
    bt=T(bar);b=np.sin(2*np.pi*note(ch[0]-12)*bt)*env_adsr(len(bt),0.02,0.4);add(music[:,0],b,t0,0.22);add(music[:,1],b,t0,0.22)
    arp=[ch[0]+12,ch[1]+12,ch[2]+12,ch[-1]+12,ch[2]+12,ch[1]+12,ch[2]+12,ch[-1]+19]
    for i in range(16):
        ts=t0+i*beat/4
        if ts>=END-0.6:break
        m=arp[i%8];pl=pluck(note(m));pan=0.5+0.35*np.sin(i)
        add(music[:,0],pl,ts,0.10*(1-pan)*2*min(1,(ts-SPLIT)/1.5));add(music[:,1],pl,ts,0.10*pan*2*min(1,(ts-SPLIT)/1.5))
    for i in range(4):
        ts=t0+i*beat
        if ts>END-1.2:break
        if ts>C['a2']-0.1:add(music[:,0],kick(f0=90,f1=48),ts,0.45);add(music[:,1],kick(f0=90,f1=48),ts,0.45)
        if ts>C['a3']-0.1 and i%2==1:
            cl=hp(rng.standard_normal(int(0.12*SR)),1500)*np.exp(-T(0.12)*30);add(music[:,0],cl,ts,0.10);add(music[:,1],cl,ts+0.01,0.10)
        if ts>C['a2']-0.1:
            for s in(beat/2,):h=hat();add(music[:,0],h,ts+s,0.05);add(music[:,1],h,ts+s,0.05)
    t0+=bar;k+=1
# final fade
fe=int(1.2*SR);music[-fe:]*=np.linspace(1,0,fe)[:,None]
fi=int(0.3*SR);music[:fi]*=np.linspace(0,1,fi)[:,None]
# ---- voice track
vo=np.zeros(N)
from scipy.signal import resample_poly
for ph in TL['phrases']:
    w=wave.open(f"vt_{ph['id']}.wav");a=np.frombuffer(w.readframes(w.getnframes()),np.int16).astype(np.float64)/32768
    a=resample_poly(a,2,1)  # 22050->44100
    add(vo,a,ph['start'],1.0)
# light EQ: presence + warmth
vo=vo+0.25*hp(vo,2500)-0.1*lp(vo,120)
vo=vo/np.max(np.abs(vo))*0.80
# ducking envelope
e=lp(np.abs(vo),8);e=e/np.max(e);duck=1-0.72*np.clip(e*4,0,1);duck=lp(duck,4)
music*=duck[:,None]
# ---- SFX
sfx=np.zeros((N,2))
def impact(g=1.0):
    t=T(1.2);sub=kick(1.2,140,38)*1.0;n=lp(rng.standard_normal(len(t)),900)*np.exp(-t*14)*0.8
    tail=lp(rng.standard_normal(len(t)),2500)*np.exp(-t*4)*0.08;return (sub+n+tail)*g
def whoosh(d=0.4):
    t=T(d);n=rng.standard_normal(len(t));x=np.zeros(len(t))
    e=np.sin(np.pi*np.linspace(0,1,len(t)))**2
    lo=lp(n,800);mid=hp(lp(n,3000),800);hi=hp(n,3000);u=np.linspace(0,1,len(t))
    x=lo*(1-u)+mid*np.sin(np.pi*u)+hi*u;return x*e*0.6
def pop(f=880,d=0.09):t=T(d);fr=f*(1+0.6*np.exp(-t*60));return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*45)
def tick():t=T(0.03);return np.sin(2*np.pi*2600*t)*np.exp(-t*220)
def bell(f=1320,d=1.2):t=T(d);return (np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*2.76*t)*np.exp(-t*6))*np.exp(-t*3.5)
def st(x,t0,g,pan=0.5):add(sfx[:,0],x,t0,g*(1-pan)*2*0.5+g*0.5*0);add(sfx[:,1],x,t0,g*pan*2*0.5+0) ;None
def both(x,t0,g):add(sfx[:,0],x,t0,g);add(sfx[:,1],x,t0,g)
for k in['hook_cada','hook_num','hook_dnt','cases_num','chron_1','why','homes_num','s5b','e1p']:both(impact(),C[k]-0.02,0.55)
both(impact(0.6),TL['phrases'][0]['words'][1]['s']-0.02,0.4)
for k in['a3l','share']:both(bell(1046),C[k],0.18);both(bell(1568),C[k]+0.08,0.12)
for s in TL['scenes'][1:]:both(whoosh(),s['s']-0.2,0.35)
def ticks(t0,dur,n=16):
    for i in range(n):
        u=i/n;tt=t0+dur*(-np.log2(1-u*0.999))/10 if False else t0+dur*(1-(1-u)**2.2)
        both(tick(),tt,0.22)
ticks(C['hook_num']-0.1,1.0);ticks(C['cases_num']-0.4,1.1);ticks(C['homes_num']-0.1,1.0,12)
for i,k in enumerate(['c1','c2','c3','c4','c5','c5b']):both(pop(700+60*i),C[k]-0.1,0.3)
for k in['s1','s2','s3','s4']:both(pop(620),C[k]-0.1,0.3);both(pop(1200,0.07),C[k]+0.27,0.22)
for i in range(10):both(pop(900+40*i,0.06),C['chron_1']+0.15+i*0.07,0.12)
for k in['map_g','map_c','map_v']:both(bell(1760,0.8),C[k],0.12);both(impact(0.4),C[k],0.25)
for i in range(5):both(pop(800,0.07),TL['scenes'][6]['s']+0.42+i*0.08,0.15)
both(bell(1318,1.5),C['a1'],0.10)
for i,u in enumerate([0.2,0.45,0.75]):both(pop(1300+i*200,0.08),C['a2']+0.15+u*1.6,0.18)
# ---- mix
mix=music*0.6+sfx*0.6+np.stack([vo,vo],1)*1.0
mix/=np.max(np.abs(mix))*1.05
out=(mix*32767).astype(np.int16)
w=wave.open("mix.wav","wb");w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(out.tobytes())
print("ok",END,out.shape)
m=music*0.6;s=sfx*0.6;v=vo
def db(x):return 20*np.log10(np.sqrt((x**2).mean())+1e-9)
spk=duck<0.5
print("voice",db(v[spk]),"music under voice",db(m[spk,0]),"music gaps",db(m[~spk,0]),"sfx",db(s[:,0]))
