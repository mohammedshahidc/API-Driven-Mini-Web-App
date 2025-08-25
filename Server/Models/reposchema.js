import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
    name: { type: String, required: true },       
    url: { type: String, required: true },        
    description: { type: String },       
    stars: { type: Number },             
    language: { type: String },       
    owner: {                                    
      login: String,
      avatar_url: String
    },
    createdAt: { type: Date, default: Date.now } 
  });

  const Repo=mongoose.model('Repo',RepoSchema)
  export default Repo
  