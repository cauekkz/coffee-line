// Sign-up and login 100% on the front end: data is saved in the browser's localStorage.
const Auth = (() => {
    const USERS_KEY = 'coffeeline:users'
    const SESSION_KEY = 'coffeeline:session'

    function read(key, fallback) {
        try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
        catch { return fallback }
    }
    function write(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); return true }
        catch { return false }
    }

    // never store the password in plain text, not even in a demo
    async function hash(text) {
        if (window.crypto && crypto.subtle) {
            const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
            return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
        }
        let h = 5381
        for (const c of text) h = ((h << 5) + h + c.charCodeAt(0)) | 0
        return 'djb2-' + (h >>> 0).toString(16)
    }

    return {
        currentUser() { return read(SESSION_KEY, null) },

        async signUp(data) {
            const users = read(USERS_KEY, {})
            const email = data.email.trim().toLowerCase()
            if (users[email]) return { ok: false, error: 'This email is already registered. Log in on the home page.' }
            const { password, ...rest } = data
            users[email] = { ...rest, email, password: await hash(password), createdAt: new Date().toISOString() }
            if (!write(USERS_KEY, users)) return { ok: false, error: "Couldn't save your sign-up in this browser." }
            write(SESSION_KEY, { name: data.name, email, plan: data.plan })
            return { ok: true }
        },

        async logIn(email, password) {
            const users = read(USERS_KEY, {})
            const u = users[email.trim().toLowerCase()]
            if (!u || u.password !== await hash(password)) return { ok: false, error: 'Wrong email or password.' }
            write(SESSION_KEY, { name: u.name, email: u.email, plan: u.plan })
            return { ok: true, user: { name: u.name, plan: u.plan } }
        },

        logOut() { try { localStorage.removeItem(SESSION_KEY) } catch {} }
    }
})()
