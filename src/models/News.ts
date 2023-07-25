import { Schema, model, Document } from "mongoose";

export interface newsDto {
  title: string;
  type: string;
  content: string;
  author: string;
  created_at: number;
  created_by: string;
}

export interface INewsModel extends newsDto, Document {}

const newsSchema: Schema<newsDto> = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Number,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: true,
  },
});

const News = model<INewsModel>("News", newsSchema);
export default News;

export const getNews = () => News.find();
export const getNewsById = (id: string) => News.findById(id);
export const createNewsInDb = async (news: newsDto) => {
  try {
    const generatedNews = new News(news);
    const savedNews = await generatedNews.save();
    return savedNews.toObject();
  } catch (error) {
    return null;
  }
};
export const updateNewsInDb = async (id: string, news: newsDto) => {
  try {
    const newsFromDb = await getNewsById(id);
    if (!newsFromDb) return null;
    const updatedNews = newsFromDb.set(news);
    const savedNews = await updatedNews.save();
    return savedNews.toObject();
  } catch (error) {
    return null;
  }
};
export const deleteNewsById = (id: string) => News.findByIdAndDelete(id);
