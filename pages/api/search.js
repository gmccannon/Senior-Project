export default async function handler(req, res) {
  const { query } = req.query;
  console.log('Received query:', query); // Log the received query

  // Mock search results
  const searchResults = [
    { title: 'Result 1', description: 'Description for result 1' },
    { title: 'Result 2', description: 'Description for result 2' },
    { title: 'Result 3', description: 'Description for result 3' },
  ];

  res.status(200).json({ results: searchResults });
}