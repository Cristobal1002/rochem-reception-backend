const currentVersion = 'v1'
import {receptions} from "./receptions.routes.js";

export const routes = (server) => {
    server.use(`/api/${currentVersion}/receptions`, receptions);
}