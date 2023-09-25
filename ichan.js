// RECODE BY ICHANZX
        case "1gb": {
            if (!isROwner) return global.dfail("rowner", m, conn)
            let t = text.split(",");
            if (t.length < 2) return m.reply(`
> Perintah :\n${_p + command} nomor/tag`);
            let nomor = t[0]
			
			let name = t[1];
			let memo = '1024'
			let egg = eggs
			let loc = locs
			let memo_disk = memo.split`/`;
			let cpu = '40'

            //let password
            let u = m.quoted ? m.quoted.sender : t[0] ? t[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net" : m.mentionedJid[0];
            let dms = nomor + "@s.whatsapp.net";

            if (!u) return m.reply(`*Format salah!*

> Perintah : ${_p + command} nomer/tag`);
            let d = (await conn.onWhatsApp(u.split`@`[0]))[0] || {}
            let profil = d.exists ? crypto.randomBytes(2).toString("hex") : t[2]
            let password = name + "001"

            let f = await fetch(domain + "/api/application/users", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                },
                "body": JSON.stringify({
                    "email": name + profil.toString() + "@gmail.com", // Email
                    "username": name + profil.toString(), // Username
                    "first_name": name + profil.toString(), // Nama Depan
                    "last_name": name, // Nama Belakang
                    "language": "en", // Bahasa
                    "password": password // Password
                })
            })
            let data = await f.json();
            if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
            let user = data.attributes
			await conn.sendMessage(u, {
                text: `*===[ Pesanan Panel ]===*\n
Id: ${user.id}                
Username: ${user.username}
Password: ${password}
Login: ${webPage}
Aktif : 1 Bulan
`,})
			
			let f1 = await fetch(domain + "/api/application/nests/6/eggs/" + egg, {
                "method": "GET",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey
                }
            })
            let dataa = await f1.json();
            //console.log(data.attributes.startup)
            let startup_cmd = "${CMD_RUN}"

            let f3 = await fetch(domain + "/api/application/servers", {
                "method": "POST",
                "headers": {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + apikey,
                },
                "body": JSON.stringify({
                    "name": name,
                    "description": `${user.created_at}`,
                    "user": user.id,
                    "egg": parseInt(egg),
                    "docker_image": "ghcr.io/parkervcp/yolks:nodejs_18",
                    "startup": startup_cmd,
                    "environment": {
                        "INST": "npm",
                        "USER_UPLOAD": "0",
                        "AUTO_UPDATE": "0",
                        "CMD_RUN": "node index.js"
                    },
                    "limits": {
                        "memory": 1024,
                        "swap": 0,
                        "disk": 1024,
                        "io": 500,
                        "cpu": cpu
                    },
                    "feature_limits": {
                        "databases": 0,
                        "backups": 1,
                        "allocations": 0
                    },
                    // "allocation": {
                    //     "default": 36
                    // }
                    deploy: {
                        locations: [parseInt(loc)],
                        dedicated_ip: false,
                        port_range: [],
                    },
                })
            })
            let res = await f3.json()
            if (res.errors) return m.reply(JSON.stringify(res.errors[0], null, 2))
            let server = res.attributes
            await m.reply(`*== [ Info Server Dibuat ] ==*

Type: ${res.object}
ID: ${server.id}
Name: ${server.name}
Description: ${server.description}
Memory: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} Mb
Disk: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} Mb
Cpu: ${server.limits.cpu}%
Dibuat: ${server.created_at}
Expired: 1 Bulan`)
        }