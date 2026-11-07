import json,wave,numpy as np
from piper import PiperVoice, SynthesisConfig
V=PiperVoice.load("../tts/vits-piper-es_MX-claude-high/es_MX-claude-high.onnx",include_alignments=True)
cfg=SynthesisConfig(length_scale=0.84)
# (id, spoken text, display text with |n = number of spoken words a display token covers)
P=[
("h1","Cada semana en Colombia, más de trescientos ochenta niños y niñas","Cada semana en Colombia, más de 380|2 niños y niñas"),
("h2","son reportados con desnutrición aguda.","son reportados con desnutrición aguda."),
("p1","En dos mil veinticuatro fueron más de veinte mil casos.","En 2024|3 fueron más de 20.000|2 casos."),
("p2","Y uno de cada diez menores de cinco años no crece lo que debería.","Y uno de cada diez menores de cinco años no crece lo que debería."),
("p3","La Guajira, Chocó y Vichada, entre los más afectados.","La Guajira, Chocó y Vichada, entre los más afectados."),
("c0","¿Por qué pasa?","¿Por qué pasa?"),
("c1","Por la pobreza.","Por la pobreza."),
("c2","Por la falta de agua potable.","Por la falta de agua potable."),
("c3","Por centros de salud lejanos.","Por centros de salud lejanos."),
("c4","Por una alimentación que no alcanza.","Por una alimentación que no alcanza."),
("c5","Por el conflicto y el clima extremo.","Por el conflicto y el clima extremo."),
("c6","Hoy, uno de cada cinco hogares no come lo suficiente.","Hoy, uno de cada cinco hogares no come lo suficiente."),
("s0","Mira estas señales.","Mira estas señales."),
("s1","No sube de peso.","No sube de peso."),
("s2","Se cansa o está decaído.","Se cansa o está decaído."),
("s3","No crece como debería.","No crece como debería."),
("s4","Tiene hinchazón en pies o cara.","Tiene hinchazón en pies o cara."),
("s5","Si ves una, no esperes.","Si ves una, no esperes."),
("a1","Lactancia materna exclusiva hasta los seis meses.","Lactancia materna exclusiva hasta los 6 meses."),
("a2","Controles de crecimiento y desarrollo.","Controles de crecimiento y desarrollo."),
("a3","Ve a tu E P S o I P S, o llama gratis a la línea ciento cuarenta y uno del I C B F.","Ve a tu EPS|3 o IPS,|3 o llama gratis a la línea 141|4 del ICBF.|4"),
("e1","La desnutrición se puede prevenir.","La desnutrición se puede prevenir."),
("e2","Ningún niño debería crecer con hambre. Compártelo.","Ningún niño debería crecer con hambre. Compártelo."),
]
out=[]
for pid,spk,disp in P:
    chunks=list(V.synthesize(spk,cfg,include_alignments=True))
    sr=chunks[0].sample_rate
    audio=np.concatenate([c.audio_int16_array for c in chunks]).astype(np.float32)
    # word groups from alignments
    words=[];t=0
    for c in chunks:
        cur=None
        for al in c.phoneme_alignments:
            dur=al.num_samples/sr
            ph=al.phoneme
            if ph==" " or ph in "^$_.,;:!?¡¿—":
                if cur: words.append(cur); cur=None
            else:
                if cur is None: cur=[t,t]
                cur[1]=t+dur
            t+=dur
        if cur: words.append(cur)
    # trim
    env=np.abs(audio)>600; i=np.argmax(env); j=len(audio)-np.argmax(env[::-1])
    i=max(0,i-int(.02*sr)); j=min(len(audio),j+int(.05*sr)); off=i/sr
    b=audio[i:j]
    o=wave.open(f"vt_{pid}.wav","wb");o.setnchannels(1);o.setsampwidth(2);o.setframerate(sr);o.writeframes(b.astype(np.int16).tobytes())
    toks=[]
    for tok in disp.split():
        n=1
        if "|" in tok: tok,n=tok.split("|"); n=int(n)
        toks.append((tok,n))
    need=sum(n for _,n in toks)
    if need!=len(words):
        print("MISMATCH",pid,need,len(words),spk)
    dw=[];k=0
    for tok,n in toks:
        if need==len(words):
            s=words[k][0]; e=words[k+n-1][1]
        else:
            tot=len(b)/sr; s=tot*k/need+off; e=tot*(k+n)/need+off
        dw.append({"w":tok,"s":round(max(0,s-off),3),"e":round(e-off,3)}); k+=n
    out.append({"id":pid,"text":disp.replace("|2","").replace("|3","").replace("|4",""),"dur":round(len(b)/sr,3),"words":dw})
json.dump(out,open("vo.json","w"),ensure_ascii=False,indent=1)
print("total",sum(o['dur'] for o in out))
