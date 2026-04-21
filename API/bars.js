export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { token } = req.query;
  if (!token) return res.status(400).json({ error: 'Missing token' });

  const to   = Math.floor(Date.now() / 1000);
  const from = to - 86400 * 7;

  const url = `https://finnhub.io/api/v1/stock/candle?symbol=QQQ&resolution=15&from=${from}&to=${to}&token=${token}`;

  try {
    const response = await fetch(url);
    const data     = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
