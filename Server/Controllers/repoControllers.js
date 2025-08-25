import Repo from "../Models/reposchema.js";
import axios from 'axios'
import customeError from "../Utils/customError.js";

export const fetchAdnSaveRepo = async (req, res) => {
    const { keyword } = req.body
    if (!keyword) {
        throw new customeError("Keyword is required", 400)
    }
    const resp = await axios.get(`https://api.github.com/search/repositories?q=${keyword}`)
    const data = await resp.data;
    if (!data) {
        throw new customeError('Invalid response from GitHub API', 400)
    }
    const items = data.items.map(repo => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
    }));

    await Repo.insertMany(items);
    res.status(200).json({ error: false, message: "item posted sucessfully", data: items })
}

export const getAllrepos = async (req, res) => {
    const repos = await Repo.find();
    if (!repos) {
        throw new customeError("items not found", 400)
    }
    res.status(200).json({ error: false, message: "item fetched sucessfully", data: repos })
}