// Dentro do seu index.html, na função iniciar()
const res = await fetch('/api/rodar', { // Verifique se não tem ".js" aqui, o rewrite do vercel.json cuida disso
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: user.value, senha: pass.value })
});
