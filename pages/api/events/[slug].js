const { events } = require('./data.json');

export default function handler(req, res) {
    const singleEvent = events.filter(ev => ev.slug === req.query.slug);

    if (req.method === "GET") {
        res.status(200).json(singleEvent);
    }else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({message: `method ${req.method} is not allowed`});
    }
}
