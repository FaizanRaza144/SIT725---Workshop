import express from 'express';
const router = express.Router();

const projects = [
  { id: 1, name: "Project Alpha" },
  { id: 2, name: "Project Beta" }
];

router.get('/', (req, res) => {
  res.status(200).json(projects);
});

export default router;
