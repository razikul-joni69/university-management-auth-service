import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "Success",
        data: "Auth Server Is Running",
    });
});

export default app;
