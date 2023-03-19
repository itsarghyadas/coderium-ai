import express from "express";

const WebhookHandler = (req, res, next) => {
  express.raw({ type: "application/json" })(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

export default WebhookHandler;
