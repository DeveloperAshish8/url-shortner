import express from "express";
import { urlModel } from "../models/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const fullUrl = req.body.fullUrl;
    const user = (req as any).user;
    const urlFound = await urlModel.find({ fullUrl, owner: user._id });
    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
    } else {
      const shortUrl = await urlModel.create({ fullUrl, owner: user._id });
      res.status(201).send(shortUrl);
    }
  } catch (error) {
    res.send(500).send({ message: "Something went wrong" });
  }
};

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = (req as any).user;
    const shortUrls = await urlModel
      .find({ owner: user._id })
      .sort({ createdAt: -1 });
    if (shortUrls.length < 0) {
      res.status(404).send({ message: "Urls not found" });
    } else {
      res.status(200).send(shortUrls);
    }
  } catch (error) {
    res.send(500).send({ message: "Something went wrong" });
  }
};
export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    if (!shortUrl) {
      res.status(404).send({ message: "URl not found" });
    } else {
      shortUrl.clicks++;
      await shortUrl.save();
      res.redirect(shortUrl.fullUrl);
    }
  } catch (error) {
    res.status(501).send({ message: "Something went wrong" });
  }
};
export const deleteUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = (req as any).user;
    const shortUrl = await urlModel.findOneAndDelete({
      _id: req.params.id,
      owner: user._id,
    });
    if (shortUrl) {
      res.status(200).send({ message: "Deleted Success" });
    }
  } catch (error) {
    res.status(501).send({ message: "Something went wrong" });
  }
};
