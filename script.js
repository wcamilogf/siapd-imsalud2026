const dbCron = {
    comunitarios: { febrero: "https://docs.google.com/spreadsheets/d/1dTRSIMywe4z4L5JJ5I7QBCnitTGabUfBONskoS9n5vQ/preview", marzo: "https://docs.google.com/spreadsheets/d/1lyHxzaFD0vWBek_o8Vao0B3Qih1TB0lUHQbtzdzWv3o/preview", abril: "https://docs.google.com/spreadsheets/d/1fSXmG-vO454yZBNWXSqN_f3D0Awfbx6GUDihw8JLZGk/preview", mayo: "https://docs.google.com/spreadsheets/d/1tuKzUAiyIDjzDelqcreiYLFlptQkfT7v0o9nRzblWX8/preview" },
    hogar: { cucuta: { febrero: "https://docs.google.com/spreadsheets/d/1qOETV0HLerW-UNiW_WmhilmnxP7aSJ2X2PTAJSZuN-E/preview", marzo: "https://docs.google.com/spreadsheets/d/1LGkuJU_vd5zW1sSnQLsezD-XpHNzWW_I4t8_ptwp2nM/preview", abril: "https://docs.google.com/spreadsheets/d/1rUNyoOA2fSt7m7zcQwyUetLcfL-sYrAhA5mcJhuzYx8/preview", mayo: "https://docs.google.com/spreadsheets/d/11eoR3QaxcDm2BNsnStgleqky6OlO1mcQu82I9erTCHE/preview" }, elzulia: { febrero: "https://docs.google.com/spreadsheets/d/1GBHTspfoHG7xVT2wb8MPNR4Xfr6FvL8iCAkvxs5k2Gw/preview", marzo: "https://docs.google.com/spreadsheets/d/10ySuYPbIPwaUrmR7sDQQqXcsnZdMPcpbftrrJbNYey8/preview", abril: "https://docs.google.com/spreadsheets/d/1kbT0NgS0YRQIIsCCcvxwAPhLJS7hH871OmBqAzhdUAw/preview", mayo: "https://docs.google.com/spreadsheets/d/1guwVn2MP95IQKJ2LYx7ErxhK3xAkma4GuUayx5vu2OM/preview" } }
};
const dbUDS = {
    cucuta: { reporte: { enero: "https://drive.google.com/embeddedfolderview?id=11tVoID-EbUh4juA7LiKUxacOgQENIVNs#list", febrero: "https://drive.google.com/embeddedfolderview?id=1MopE3MIiDFvxhyId30dTLoeBCAitTr1R#list", marzo: "https://drive.google.com/embeddedfolderview?id=1hQ7_matbKhGNCbHPbb3DPFqS8fqPykFg#list", abril: "https://drive.google.com/embeddedfolderview?id=1on2xhSvoQ2e0OkcZrJH5QzTobkf9qZku#list", mayo: "https://drive.google.com/embeddedfolderview?id=1IvHO1mv88DP_HMptIV0Sq72Qg6clANna#list" }, revision: { enero: "https://docs.google.com/spreadsheets/d/1FbywEHi15-lHP6oeCo0GprfRV_e5jhc8ZMEnqO2-mW4/preview", febrero: "https://docs.google.com/spreadsheets/d/1cWNcZHRpJ6x943NOhKRBun-MKEqJ19kQ6EwSzkNgw0o/preview", marzo: "https://docs.google.com/spreadsheets/d/1JKZPF_B_qu86J1axJDIMBA7E7EQq2jRJ8XoigvraB-M/preview", abril: "https://docs.google.com/spreadsheets/d/1dvLtOOxoD1ZcyGi0_i1L0anWISpT4FiQNQn4WSkR850/preview", mayo: "https://docs.google.com/spreadsheets/d/1fXlKJOlxW4pncJhmrlCvW2IOLLyNaHk4tsuUlWbg4CA/preview" } },
    elzulia: { reporte: { enero: "https://drive.google.com/embeddedfolderview?id=1MX7Wd1jIO4MzAdgBW7EgDN7_Rn14C7cP#list", febrero: "https://drive.google.com/embeddedfolderview?id=1pjkJN08cY5yW44ZAzIn8mJkC52ryFgNw#list", marzo: "https://drive.google.com/embeddedfolderview?id=1S46x-z6mRm-xOXy90_AMgJfNZGYKi8jh#list", abril: "https://drive.google.com/embeddedfolderview?id=1RG_4uvmVHCQSUOMGLe3pzo6YRJsKC5yj#list", mayo: "https://drive.google.com/embeddedfolderview?id=1MqyppRcwGZIbaIfmoP8cyqJfWWos3P3l#list" }, revision: { enero: "https://docs.google.com/spreadsheets/d/1ItKdjDETiLlh0tUIyBKi0JsUuXHS4tCEpMG7jHtGB1g/preview", febrero: "https://docs.google.com/spreadsheets/d/1cWNcZHRpJ6x943NOhKRBun-MKEqJ19kQ6EwSzkNgw0o/preview", marzo: "https://docs.google.com/spreadsheets/d/16zzktPgyUTIPj-kbztpYAVCfzPuWSihA7FWGT1EJCfU/preview", abril: "https://docs.google.com/spreadsheets/d/1bmJNvk51NNL_YhtMe-BeDjYmDlbf4vnsdgilKzCR_lk/preview", mayo: "https://docs.google.com/spreadsheets/d/1BLqi0jkBoWSU9XQ4m7gHyShntI0t0-sbXeHQ-t23qY4/preview" } }
};

document.addEventListener('DOMContentLoaded', () => {
    // SEGURIDAD
    const CLAVE = "SIAPD2026*";
    const login = () => {
        if(document.getElementById('access-password').value === CLAVE){
            sessionStorage.setItem('accesoSIAPD','true');
            document.getElementById('login-screen').style.display='none';
            document.getElementById('main-content').style.display='block';
        } else { document.getElementById('login-error').classList.remove('hidden'); }
    };
    if(sessionStorage.getItem('accesoSIAPD') === 'true'){ document.getElementById('login-screen').style.display='none'; document.getElementById('main-content').style.display='block'; }
    document.getElementById('btn-login').onclick = login;
    document.getElementById('access-password').onkeypress = (e) => { if(e.key === 'Enter') login(); };

    // NAVEGACIÓN PC Y MÓVIL
    document.querySelectorAll('.btn-navegacion').forEach(btn => btn.onclick = (e) => {
        e.preventDefault();
        const target = btn.getAttribute('href').substring(1);
        document.querySelectorAll('.seccion-contenido').forEach(s => s.classList.remove('activa'));
        document.getElementById(target).classList.add('activa');
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        window.scrollTo(0,0);
    });

    document.getElementById('menuToggle').onclick = () => { document.getElementById('sidebar').classList.add('active'); document.getElementById('overlay').classList.add('active'); };
    document.getElementById('closeSidebar').onclick = () => { document.getElementById('sidebar').classList.remove('active'); document.getElementById('overlay').classList.remove('active'); };
    document.getElementById('overlay').onclick = () => { document.getElementById('sidebar').classList.remove('active'); document.getElementById('overlay').classList.remove('active'); };

    // CRONOGRAMAS
    const sTipo = document.getElementById('select-tipo-cron'), sUds = document.getElementById('select-uds-cron'), sMes = document.getElementById('select-mes-cron'), btnC = document.getElementById('btn-link-cron');
    function upCron(){
        let url = (sTipo.value==='comunitarios') ? dbCron.comunitarios[sMes.value] : (sTipo.value==='hogar'&&sUds.value) ? dbCron.hogar[sUds.value][sMes.value] : "";
        if(url){ document.getElementById('frame-cron').src=url; btnC.href=url.replace('/preview','/edit'); document.getElementById('visor-cron').classList.remove('hidden'); }
    }
    sTipo.onchange = () => { sUds.classList.toggle('hidden', sTipo.value!=='hogar'); sMes.classList.toggle('hidden', !sTipo.value); upCron(); };
    sUds.onchange = sMes.onchange = upCron;

    // UDS
    document.querySelectorAll('.tab-button-uds').forEach(btn => btn.onclick = () => {
        document.querySelectorAll('.tab-button-uds').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.uds-panel').forEach(p => p.classList.add('hidden'));
        btn.classList.add('active');
        document.getElementById(`panel-uds-${btn.dataset.uds}`).classList.remove('hidden');
    });

    document.querySelectorAll('.select-uds-doc').forEach(sel => sel.onchange = () => {
        const uds=sel.dataset.uds, tipo=sel.dataset.tipo, mes=sel.value, panel=sel.closest('.uds-panel');
        panel.querySelectorAll('.select-uds-doc').forEach(s => { if(s!==sel) s.value=""; });
        if(mes){
            const url = dbUDS[uds][tipo][mes]; document.getElementById(`frame-uds-${uds}`).src = url;
            const btnLink = document.getElementById(`btn-uds-${uds}`);
            btnLink.href = tipo==='revision' ? url.replace('/preview','/edit') : url.replace('embeddedfolderview?id=','drive/folders/').replace('#list','');
            document.getElementById(`visor-uds-${uds}`).classList.remove('hidden');
        } else { document.getElementById(`visor-uds-${uds}`).classList.add('hidden'); }
    });
});