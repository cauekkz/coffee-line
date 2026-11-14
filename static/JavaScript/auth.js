// Cadastro e login 100% front-end: os dados ficam salvos no localStorage do navegador.
const Auth = (() => {
    const CHAVE_USUARIOS = 'coffeline:usuarios'
    const CHAVE_SESSAO = 'coffeline:sessao'

    function ler(chave, padrao) {
        try { return JSON.parse(localStorage.getItem(chave)) ?? padrao }
        catch { return padrao }
    }
    function gravar(chave, valor) {
        try { localStorage.setItem(chave, JSON.stringify(valor)); return true }
        catch { return false }
    }

    // nunca guardar a senha em texto puro, nem numa demo
    async function hash(texto) {
        if (window.crypto && crypto.subtle) {
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto))
            return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
        }
        let h = 5381
        for (const c of texto) h = ((h << 5) + h + c.charCodeAt(0)) | 0
        return 'djb2-' + (h >>> 0).toString(16)
    }

    return {
        usuarioAtual() { return ler(CHAVE_SESSAO, null) },

        async cadastrar(dados) {
            const usuarios = ler(CHAVE_USUARIOS, {})
            const email = dados.email.trim().toLowerCase()
            if (usuarios[email]) return { ok: false, erro: 'Esse email já tem cadastro. Faça login na página inicial.' }
            const { senha, ...resto } = dados
            usuarios[email] = { ...resto, email, senha: await hash(senha), criadoEm: new Date().toISOString() }
            if (!gravar(CHAVE_USUARIOS, usuarios)) return { ok: false, erro: 'Não foi possível salvar o cadastro neste navegador.' }
            gravar(CHAVE_SESSAO, { nome: dados.name, email, plano: dados.plano })
            return { ok: true }
        },

        async entrar(email, senha) {
            const usuarios = ler(CHAVE_USUARIOS, {})
            const u = usuarios[email.trim().toLowerCase()]
            if (!u || u.senha !== await hash(senha)) return { ok: false, erro: 'Email ou senha incorretos.' }
            gravar(CHAVE_SESSAO, { nome: u.name, email: u.email, plano: u.plano })
            return { ok: true, usuario: { nome: u.name, plano: u.plano } }
        },

        sair() { try { localStorage.removeItem(CHAVE_SESSAO) } catch {} }
    }
})()
