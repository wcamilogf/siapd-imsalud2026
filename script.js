const dbCron = {
    comunitarios: {
        febrero: "https://docs.google.com/spreadsheets/d/1dTRSIMywe4z4L5JJ5I7QBCnitTGabUfBONskoS9n5vQ/preview",
        marzo: "https://docs.google.com/spreadsheets/d/1lyHxzaFD0vWBek_o8Vao0B3Qih1TB0lUHQbtzdzWv3o/preview",
        abril: "https://docs.google.com/spreadsheets/d/1fSXmG-vO454yZBNWXSqN_f3D0Awfbx6GUDihw8JLZGk/preview",
        mayo: "https://docs.google.com/spreadsheets/d/1tuKzUAiyIDjzDelqcreiYLFlptQkfT7v0o9nRzblWX8/preview"
    },
    hogar: {
        cucuta: {
            febrero: "https://docs.google.com/spreadsheets/d/1qOETV0HLerW-UNiW_WmhilmnxP7aSJ2X2PTAJSZuN-E/preview",
            marzo: "https://docs.google.com/spreadsheets/d/1LGkuJU_vd5zW1sSnQLsezD-XpHNzWW_I4t8_ptwp2nM/preview",
            abril: "https://docs.google.com/spreadsheets/d/1rUNyoOA2fSt7m7zcQwyUetLcfL-sYrAhA5mcJhuzYx8/preview",
            mayo: "https://docs.google.com/spreadsheets/d/11eoR3QaxcDm2BNsnStgleqky6OlO1mcQu82I9erTCHE/preview"
        },
        elzulia: {
            febrero: "https://docs.google.com/spreadsheets/d/1GBHTspfoHG7xVT2wb8MPNR4Xfr6FvL8iCAkvxs5k2Gw/preview",
            marzo: "https://docs.google.com/spreadsheets/d/10ySuYPbIPwaUrmR7sDQQqXcsnZdMPcpbftrrJbNYey8/preview",
            abril: "https://docs.google.com/spreadsheets/d/1kbT0NgS0YRQIIsCCcvxwAPhLJS7hH871OmBqAzhdUAw/preview",
            mayo: "https://docs.google.com/spreadsheets/d/1guwVn2MP95IQKJ2LYx7ErxhK3xAkma4GuUayx5vu2OM/preview"
        }
    }
};

const dbUDS = {
    cucuta: {
        reporte: {
            enero: "https://drive.google.com/embeddedfolderview?id=11tVoID-EbUh4juA7LiKUxacOgQENIVNs#list",
            febrero: "https://drive.google.com/embeddedfolderview?id=1MopE3MIiDFvxhyId30dTLoeBCAitTr1R#list",
            marzo: "https://drive.google.com/embeddedfolderview?id=1hQ7_matbKhGNCbHPbb3DPFqS8fqPykFg#list",
            abril: "https://drive.google.com/embeddedfolderview?id=1on2xhSvoQ2e0OkcZrJH5QzTobkf9qZku#list",
            mayo: "https://drive.google.com/embeddedfolderview?id=1IvHO1mv88DP_HMptIV0Sq72Qg6clANna#list"
        },
        revision: {
            enero: "https://docs.google.com/spreadsheets/d/1FbywEHi15-lHP6oeCo0GprfRV_e5jhc8ZMEnqO2-mW4/preview",
            febrero: "https://docs.google.com/spreadsheets/d/1cWNcZHRpJ6x943NOhKRBun-MKEqJ19kQ6EwSzkNgw0o/preview",
            marzo: "https://docs.google.com/spreadsheets/d/1JKZPF_B_qu86J1axJDIMBA7E7EQq2jRJ8XoigvraB-M/preview",
            abril: "https://docs.google.com/spreadsheets/d/1dvLtOOxoD1ZcyGi0_i1L0anWISpT4FiQNQn4WSkR850/preview",
            mayo: "https://docs.google.com/spreadsheets/d/1fXlKJOlxW4pncJhmrlCvW2IOLLyNaHk4tsuUlWbg4CA/preview"
        }
    },
    elzulia: {
        reporte: {
            enero: "https://drive.google.com/embeddedfolderview?id=1MX7Wd1jIO4MzAdgBW7EgDN7_Rn14C7cP#list",
            febrero: "https://drive.google.com/embeddedfolderview?id=1pjkJN08cY5yW44ZAzIn8mJkC52ryFgNw#list",
            marzo: "https://drive.google.com/embeddedfolderview?id=1S46x-z6mRm-xOXy90_AMgJfNZGYKi8jh#list",
            abril: "https://drive.google.com/embeddedfolderview?id=1RG_4uvmVHCQSUOMGLe3pzo6YRJsKC5yj#list",
            mayo: "https://drive.google.com/embeddedfolderview?id=1MqyppRcwGZIbaIfmoP8cyqJfWWos3P3l#list"
        },
        revision: {
            enero: "https://docs.google.com/spreadsheets/d/1ItKdjDETiLlh0tUIyBKi0JsUuXHS4tCEpMG7jHtGB1g/preview",
            febrero: "https://docs.google.com/spreadsheets/d/1cZ9Nj9TA4l_50KrLKxXHnyBkcbfmBWhXRiidFoNFiKE/preview",
            marzo: "https://docs.google.com/spreadsheets/d/16zzktPgyUTIPj-kbztpYAVCfzPuWSihA7FWGT1EJCfU/preview",
            abril: "https://docs.google.com/spreadsheets/d/1bmJNvk51NNL_YhtMe-BeDjYmDlbf4vnsdgilKzCR_lk/preview",
            mayo: "https://docs.google.com/spreadsheets/d/1BLqi0jkBoWSU9XQ4m7gHyShntI0t0-sbXeHQ-t23qY4/preview"
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // NAVEGACIÓN GENERAL
    const btnNav = document.querySelectorAll('.btn-navegacion');
    const sections = document.querySelectorAll('.seccion-contenido');
    btnNav.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('href').substring(1);
        sections.forEach(s => s.classList.remove('activa'));
        document.getElementById(targetId).classList.add('activa');
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        window.scrollTo(0,0);
    }));

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    // LÓGICA CRONOGRAMAS
    const sTipoCron = document.getElementById('select-tipo-cron');
    const sUdsCron = document.getElementById('select-uds-cron');
    const sMesCron = document.getElementById('select-mes-cron');
    
    function updateCron() {
        const tipo = sTipoCron.value;
        const uds = sUdsCron.value;
        const mes = sMesCron.value;
        let url = "";
        if(tipo === 'comunitarios' && mes) url = dbCron.comunitarios[mes];
        if(tipo === 'hogar' && uds && mes) url = dbCron.hogar[uds][mes];
        if(url) {
            document.getElementById('frame-cron').src = url;
            document.getElementById('visor-cron').classList.remove('hidden');
        } else {
            document.getElementById('visor-cron').classList.add('hidden');
        }
    }
    sTipoCron.addEventListener('change', () => {
        sUdsCron.classList.toggle('hidden', sTipoCron.value !== 'hogar');
        sMesCron.classList.toggle('hidden', !sTipoCron.value);
        updateCron();
    });
    sUdsCron.addEventListener('change', updateCron);
    sMesCron.addEventListener('change', updateCron);

    // LÓGICA UDS (CAMBIO DE PESTAÑAS)
    const tabBtns = document.querySelectorAll('.tab-button');
    const udsSections = document.querySelectorAll('.uds-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            udsSections.forEach(s => s.classList.add('hidden'));
            udsSections.forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const targetPanel = document.getElementById(`uds-${btn.dataset.uds}`);
            targetPanel.classList.remove('hidden');
            targetPanel.classList.add('active');
        });
    });

    // SELECTORES DE DOCUMENTOS UDS
    const selectoresUDS = document.querySelectorAll('.select-uds-doc');
    selectoresUDS.forEach(select => {
        select.addEventListener('change', (e) => {
            const uds = e.target.dataset.uds;
            const tipo = e.target.dataset.tipo;
            const mes = e.target.value;
            const panel = e.target.closest('.uds-section');
            const visor = panel.querySelector('.visor-uds');
            const frame = panel.querySelector('.frame-uds');

            // Limpiar el otro selector de la misma UDS
            panel.querySelectorAll('.select-uds-doc').forEach(s => {
                if(s !== e.target) s.value = "";
            });

            if (mes) {
                frame.src = dbUDS[uds][tipo][mes];
                visor.classList.remove('hidden');
            } else {
                visor.classList.add('hidden');
            }
        });
    });
});