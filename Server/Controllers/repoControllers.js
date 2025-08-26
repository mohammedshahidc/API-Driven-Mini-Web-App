import Repo from "../Models/reposchema.js";
import axios from "axios";
import customeError from "../Utils/customError.js";

export const fetchAdnSaveRepo = async (req, res) => {
  const { keyword } = req.query;

  if (!keyword || keyword.trim() === "") {
    throw new customeError("Keyword is required", 400);
  }
  const response = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`);

  if (!response || !response.data || !Array.isArray(response.data.items)) {
    throw new customeError("Invalid response from GitHub API", 500);
  }

  const items = response.data.items.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    description: repo.description || "No description available",
  }));

  await Repo.insertMany(items, { ordered: false }).catch((err) => {
    if (err.code === 11000) {
      console.log("Duplicate entries skipped");
    } else {
      throw new customeError("Database insert failed", 500);
    }
  });

  res.status(200).json({
    error: false,
    message: "Repositories fetched and saved successfully",
    data: items,
  });
};


export const getAllrepos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    const total = await Repo.countDocuments();
  
    const repos = await Repo.find()
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);
  
    if (!repos || repos.length === 0) {
      throw new customeError("No repositories found", 404);
    }
  
    res.status(200).json({
      error: false,
      message: "Repositories fetched successfully",
      data: repos,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  };
  