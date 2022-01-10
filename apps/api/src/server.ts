import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import http from "http";
import { errorHandler, dbConnect } from "shared";
import routes from "./api";

const app = express();
dbConnect();

app.use((_: Request, res: Response, next: NextFunction) => {
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Credentials, Set-Cookie, Authorization"
	);
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

// Routes
app.use("/", routes);
app.get("/", (_: Request, res: Response) =>
	res.status(200).send({ success: true })
);
app.get("/health", (_: Request, res: Response) =>
	res.status(200).send({ success: true, service: "api" })
);
app.get("*", (_: Request, res: Response) => res.status(404).send("Not Found"));
app.use(errorHandler);

const server = () => {
	const httpServer = http.createServer(app);

	httpServer.on("listening", () => {
		console.info(
			`api listening on port ${process.env.SERVER_PORT}...`
		);
	});

	return httpServer;
};

export { app };
export default server;
