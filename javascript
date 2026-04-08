const chromium = require('chrome-aws-lambda');

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Use POST');

    const { usuario, senha } = req.body;
    let browser = null;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath,
            headless: true,
        });

        const page = await browser.newPage();
        
        // 1. LOGIN
        await page.goto('https://expansao.educacao.sp.gov.br/login/index.php');
        await page.type('#username', usuario);
        await page.type('#password', senha);
        await Promise.all([
            page.click('#loginbtn'),
            page.waitForNavigation({ waitUntil: 'networkidle2' }),
        ]);

        // 2. INJEÇÃO DO MOTOR TIMÓTEO (O SEU ORIGINAL)
        const resultado = await page.evaluate(async () => {
            // AQUI ENTRA O SEU MOTOR HEXADECIMAL ORIGINAL
            function _0x1faa(_0x5a3b49,_0x5a6a3c){const _0x18f04e=_0x18f0();return _0x1faa=function(_0x1fa,_0x18f){_0x1fa=_0x1fa-0xb5;return _0x18f04e[_0x1fa];},_0x1faa(_0x5a3b49,_0x5a6a3c);}
            function _0x18f0(){return ['impacto','desnecessário','Resolvendo: ','aleatório','1010511tIDfXd','gratuitos','diversos fatores','estratégia','tutoriais','evolução','includes','getElementById','rígida','createElement','next','falsa sensação','9391644HsqGdy','identificar contexto','application/x-www-form-urlencoded','POST','li.activity','planejamento','cidadania','Lendo: ','parseFromString','crítico','sesskey','https://expansao.educacao.sp.gov.br/mod/quiz/startattempt.php','div','appendChild','clareza mental','.completionstate-complete, .badge-success, .is-complete','get','1316645qhvORQ','reload','barra-hibrida','cssText','innerText','equilibrada','[class*="fale-conosco"], iframe, .zsiq_float, .atendimento-flutuante, #zsiq_float','exclusivamente','style','consciente','value','sem envolver','position: fixed; top: 0; left: 0; width: 100vw; height: 4px; background: #8a2be2; z-index: 10000; box-shadow: 0 0 10px #8a2be2;','indiferente','from','input[type="radio"]','distorça suas emoções','focar unicamente','7512596TpSDfy','querySelector','visualização positiva','complexas','autonomia','realista','apoio','limitado','abandonar','346062ciGQtM','contexto','refletir','única escolha','a.aalink','text','toUpperCase','textContent','gestão da ansiedade','pouco impacto','filter','round','painel-automacao','16WVnacV','sem buscar','importante','sem importância','gerenciamento','215278aopIVU','priorizar','colaborativo','planilhas','length','match','positivos','focar apenas nas tarefas','momento presente','4WDjKtp','irrelevante','href','&sesskey=','negativos','prejudica','ética','objetivos','protagonismo','searchParams','input[type="hidden"]','answer','aceitar limites','sorte','não fazer pausas','forEach','quiz','acalmar sua mente','toLowerCase','append','4913286KQxkkF','ignorar a ansiedade','observando as sensações','closest','somente','mentoria','evitar falar','Finalizar tentativa ...','name','simulados','querySelectorAll','url','coerentes'];}
            
            // Lógica de busca de atividades pendentes...
            const lista = Array.from(document.querySelectorAll('li.activity')).filter(a => !a.querySelector('.is-complete'));
            return `Encontradas ${lista.length} atividades.`;
        });

        res.status(200).json({ status: 'Sucesso', detail: resultado });

    } catch (error) {
        res.status(500).json({ status: 'Erro', error: error.message });
    } finally {
        if (browser) await browser.close();
    }
}
