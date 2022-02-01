// test => /api/get_directions?origin=-0.155626,-78.463816&destiny=-0.314861,-78.44347

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { origin, destiny } = req.query
    fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destiny}&key=AIzaSyD08wAcsWg_pXQ04M2i-l9XpqX3gopb6U8&language=es-419&mode=walking`)
      .then(response => response.json())
      .then(data =>
        res.status(200).json(data)
      );

  } else {
    res.status(405).json({ name: 'Method Not Allowed' })
  }

}
