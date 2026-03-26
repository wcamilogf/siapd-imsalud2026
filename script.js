const dbCron = {
    comunitarios: { febrero: "https://docs.google.com/spreadsheets/d/1dTRSIMywe4z4L5JJ5I7QBCnitTGabUfBONskoS9n5vQ/preview", marzo: "https://docs.google.com/spreadsheets/d/1lyHxzaFD0vWBek_o8Vao0B3Qih1TB0lUHQbtzdzWv3o/preview", abril: "https://docs.google.com/spreadsheets/d/1fSXmG-vO454yZBNWXSqN_f3D0Awfbx6GUDihw8JLZGk/preview", mayo: "https://docs.google.com/spreadsheets/d/1tuKzUAiyIDjzDelqcreiYLFlptQkfT7v0o9nRzblWX8/preview" },
    hogar: { cucuta: { febrero: "https://docs.google.com/spreadsheets/d/1qOETV0HLerW-UNiW_WmhilmnxP7aSJ2X2PTAJSZuN-E/preview", marzo: "https://docs.google.com/spreadsheets/d/1LGkuJU_vd5zW1sSnQLsezD-XpHNzWW_I4t8_ptwp2nM/preview", abril: "https://docs.google.com/spreadsheets/d/1rUNyoOA2fSt7m7zcQwyUetLcfL-sYrAhA5mcJhuzYx8/preview", mayo: "https://docs.google.com/spreadsheets/d/11eoR3QaxcDm2BNsnStgleqky6OlO1mcQu82I9erTCHE/preview" }, elzulia: { febrero: "https://docs.google.com/spreadsheets/d/1GBHTspfoHG7xVT2wb8MPNR4Xfr6FvL8iCAkvxs5k2Gw/preview", marzo: "https://docs.google.com/spreadsheets/d/10ySuYPbIPwaUrmR7sDQQqXcsnZdMPcpbftrrJbNYey8/preview", abril: "https://docs.google.com/spreadsheets/d/1kbT0NgS0YRQIIsCCcvxwAPhLJS7hH871OmBqAzhdUAw/preview", mayo: "https://docs.google.com/spreadsheets/d/1guwVn2MP95IQKJ2LYx7ErxhK3xAkma4GuUayx5vu2OM/preview" } }
};

const dbUDS = {
    cucuta: { folder: "https://drive.google.com/embeddedfolderview?id=1NlwX6_3qEqFkiEdPkkGlIyPA9HT2Yrqg#list", revision: { enero: "https://docs.google.com/spreadsheets/d/1FbywEHi15-lHP6oeCo0GprfRV_e5jhc8ZMEnqO2-mW4/preview", febrero: "https://docs.google.com/spreadsheets/d/1cWNcZHRpJ6x943NOhKRBun-MKEqJ19kQ6EwSzkNgw0o/preview", marzo: "https://docs.google.com/spreadsheets/d/1JKZPF_B_qu86J1axJDIMBA7E7EQq2jRJ8XoigvraB-M/preview", abril: "https://docs.google.com/spreadsheets/d/1dvLtOOxoD1ZcyGi0_i1L0anWISpT4FiQNQn4WSkR850/preview", mayo: "https://docs.google.com/spreadsheets/d/1fXlKJOlxW4pncJhmrlCvW2IOLLyNaHk4tsuUlWbg4CA/preview" } },
    elzulia: { folder: "https://drive.google.com/embeddedfolderview?id=1emodVMIpFxEz67gKWCjzTodv6IFMxdjm#list", revision: { enero: "https://docs.google.com/spreadsheets/d/1ItKdjDETiLlh0tUIyBKi0JsUuXHS4tCEpMG7jHtGB1g/preview", febrero: "https://docs.google.com/spreadsheets/d/1cZ9Nj9TA4l_50KrLKxXHnyBkcbfmBWhXRiidFoNFiKE/preview", marzo: "https://docs.google.com/spreadsheets/d/16zzktPgyUTIPj-kbztpYAVCfzPuWSihA7FWGT1EJCfU/preview", abril: "https://docs.google.com/spreadsheets/d/1bmJNvk51NNL_YhtMe-BeDjYmDlbf4vnsdgilKzCR_lk/preview", mayo: "https://docs.google.com/spreadsheets/d/1BLqi0jkBoWSU9XQ4m7gHyShntI0t0-sbXeHQ-t23qY4/preview" } }
};

document.addEventListener('DOMContentLoaded', () => {
    const accessInput = document.getElementById('access-password');
    const loginErr = document.getElementById('login-error');
    const login = () => {
        if(accessInput.value === "SIAPD2026*"){ sessionStorage.setItem('accesoSIAPD','true'); document.getElementById('login-screen').style.display='none'; document.getElementById('main-content').style.display='block'; }
        else { loginErr.classList.replace('invisible','visible'); }
    };
    accessInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') login(); });
    document.getElementById('btn-login').onclick = login;
    if(sessionStorage.getItem('accesoSIAPD') === 'true'){ document.getElementById('login-screen').style.display='none'; document.getElementById('main-content').style.display='block'; }

    // NAVEGACIÓN UNIVERSAL
    document.querySelectorAll('.btn-navegacion').forEach(btn => btn.onclick = (e) => {
        e.preventDefault(); const target = btn.getAttribute('href').substring(1);
        document.querySelectorAll('.seccion-contenido').forEach(s => s.classList.remove('activa'));
        document.getElementById(target).classList.add('activa');
        window.scrollTo(0,0);
    });

    // CRONOGRAMAS
    const sTipo = document.getElementById('select-tipo-cron'), sUds = document.getElementById('select-uds-cron'), sMes = document.getElementById('select-mes-cron'), btnC = document.getElementById('btn-link-cron');
    function upCron(){
        let url = "";
        if(sTipo.value === 'comunitarios') { url = dbCron.comunitarios[sMes.value] || ""; }
        else if(sTipo.value === 'hogar' && sUds.value) { url = dbCron.hogar[sUds.value][sMes.value] || ""; }
        if(url){ document.getElementById('frame-cron').src = url; btnC.href = url.replace('/preview','/edit'); document.getElementById('visor-cron').classList.remove('hidden'); }
        else { document.getElementById('visor-cron').classList.add('hidden'); }
    }
    sTipo.onchange = () => { sUds.classList.toggle('hidden', sTipo.value !== 'hogar'); sMes.classList.toggle('hidden', !sTipo.value); sUds.value = ""; sMes.value = ""; upCron(); };
    sUds.onchange = () => { sMes.value = ""; upCron(); };
    sMes.onchange = upCron;

    // UDS TABS
    document.querySelectorAll('.tab-button-uds').forEach(btn => btn.onclick = () => {
        document.querySelectorAll('.tab-button-uds').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.uds-panel').forEach(p => { p.classList.remove('block'); p.classList.add('hidden'); });
        btn.classList.add('active');
        document.getElementById(`panel-uds-${btn.dataset.uds}`).classList.replace('hidden','block');
    });

    // UDS CARPETAS
    document.querySelectorAll('.btn-carpeta-directa').forEach(btn => btn.onclick = (e) => {
        const uds = e.target.dataset.uds;
        const url = dbUDS[uds].folder;
        const frame = document.getElementById(`frame-uds-${uds}`);
        e.target.closest('.uds-panel').querySelector('.select-uds-doc').value = "";
        frame.className = "visor-grande-carpetas";
        frame.src = url;
        document.getElementById(`btn-uds-${uds}`).href = url.replace('embeddedfolderview?id=','drive/folders/').replace('#list','');
        document.getElementById(`visor-uds-${uds}`).classList.remove('hidden');
    });

    // UDS REVISIÓN
    document.querySelectorAll('.select-uds-doc').forEach(sel => sel.onchange = (e) => {
        const uds = e.target.dataset.uds, val = e.target.value;
        if(val){
            const url = dbUDS[uds].revision[val];
            const frame = document.getElementById(`frame-uds-${uds}`);
            frame.className = "visor-zoom-pro";
            frame.src = url;
            document.getElementById(`btn-uds-${uds}`).href = url.replace('/preview','/edit');
            document.getElementById(`visor-uds-${uds}`).classList.remove('hidden');
        } else { document.getElementById(`visor-uds-${uds}`).classList.add('hidden'); }
    });
});