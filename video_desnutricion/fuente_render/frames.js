const {chromium}=require('playwright');const {spawn}=require('child_process');
const [a,b,out]=[+process.argv[2],+process.argv[3],process.argv[4]];
(async()=>{const br=await chromium.launch({args:['--allow-file-access-from-files']});const p=await br.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/render.html');await p.evaluate(()=>window.ready);
const ff=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-framerate','30','-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','17','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
for(let f=a;f<b;f++){const d=await p.evaluate(t=>window.frameJPEG(t,0.95),f/30);
 if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));
 if(f%150==0)console.log(out,f);}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await br.close();console.log('done',out)})();
