import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { email, password } = await req?.json();
  const PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAuVKpjSGRN71p/QswR/pl63cNnz/c1yKFMivg4uqDPvR26VIO
TSQ6WJYn/jOPxmT6lAHd4KVNJ3trGXWcvlKvrE62Lm33SM3iCoyRLalMXj8W3Mm7
7SKMi7gEwVvo7dNHHdDiY9HG52w/KzlAb+Zpmoj4vgxbThtUtnOmhpE8Q6tUcQMG
7au2tljKJ7ygQZ0NA5NXD+5E8qEEKf0S6I8jV8n/nkEWp89CW09MOSq3XptyPVXH
NA8IAYwk7TtGgdTQzNlcPKKI7tMUuL4lMMd+9JnhWm0zwEphX/qufqDAke+wY8kl
zKuRzI25Mf0sfrx/MGyMUXdW7tEKT15MU/1JJQIDAQABAoIBAQCeFf6ebnDzDHf6
LG4uKFKCzxbmrtKTDlZy2u1GhGga7uz00VNzyKCg6s4I0TEnOwJp+UGtHTU4pdZR
bHud+ujyYl6UMqgMCdx1xT0ep1mG1+iHxOqzOZKMqRgdXWrQXTdAHuzP26YBydwE
4hyul+2jro4JiH7mnPfhf7wg9Ilk6rE5to1zyL9J2FyJELA/hiBFRR+hWgMqkpiv
5TEgqhMqSPEwulFO2kehUCGuVXa7yXEpSBgfF2bjSV4sl/FtS7ywHDXMrWwfc4TB
C61rgfK75tDxIxvCFG6WoraFnEnRuHIylFT/H0reSXA/6ECCisCEocxsqCYaA0eT
4Jv1RioBAoGBAN4586rtb9+Y36iaUtqVVQh+c6jTj7nzss6YgbU1/4fVfskAuhn7
zfCV8o7LeUwY74uGIvMvJM0upLDYC8nx6ULU4m0Ki9hqsCV1X2r1V3LOXIHCGMI7
Hs7kx/BqLT1HtrNeNPI0cfq+bir08ShJQFPWEiud+/JivFHzXQzV5FaBAoGBANV8
7QKTqicewcc9UUIe7vw618FwVMJpHAOGSngf7MyqPNZJ8zYptegwtXnEyxSebePW
KXK6jjmC05djd2E/BfZ+ep05ViPIxpNrkspyPpFw+pdUIt/FzNSDUNTpCDq93neY
/XAhKPHZTQLHBmaC8OI2VhGGUuxE7qVgvlU9XYilAoGBAMIw2ApUo/87Qq699IsI
FZ9viLhN73mqSGUahbYJcruLR9hz5yxPix2imqxHiD6ER8eftqjVWI5oJQhYMq0M
1S5Og3KP1baPPE/vais4K2uqgtHs/9+y8/ANod4nmlLDeRbyysegJr3bbL/i/V2b
7TeViJlO29xqhXADfxt5SaiBAoGBAJ2BGF9BUFSiVXbIH044Ajtmsk1Nscrovzk+
d2yeqRbqNg4m6t+38DQI06qt7OIebJaeJ2A0kL+PbMoRIT9GvwB3mcCrT4kBFLgo
sljX5p9pCghhk4UiqpbS9uzNrDuiXyI/ZiO24z1jA3UcHvW8fzl1uxQc1MrppGOw
t1ut9XbdAoGAQ7hvfeA0JstZET1y57j8dvuawy9UKpeCAeUDQ5DvS0g376MlZMjH
VUcSKQuq74BXlGXlRdspi1weO0l4LeMZBQ68u9tB3XDwvD6YwVMtBdo/VanPCd1g
9LHINTNA/QT3pN8GGMsaLpkxX2rFC2kcJRnt50jrPmnimPQ6rSxzw4I=
-----END RSA PRIVATE KEY-----
`;

  const users = [{ id: 1, email: "user@example.com", password: "password123" }];

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user)
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const payload = {
    iss: "http://localhost:3000",
    sub: user.id.toString(),
    aud: "EpicGame",
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 3600,
  };

  const token = jwt.sign(payload, PRIVATE_KEY, {
    algorithm: "RS256",
    keyid: "0",
  });

  cookies().set("token", token);

  return NextResponse.json({ token }, { status: 200 });
}
