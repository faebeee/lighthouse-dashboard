import {Request} from "hapi";
import {ApplicationState} from "../interfaces/ApplicationState";
import ProjectService from "../service/ProjectService";

export default class ProjectController {
    projectService: ProjectService;

    constructor(projectService: ProjectService) {
        this.projectService = projectService
    }

    getAll = async (req: Request) => {
        const {branch} = req.params;
        const {token} = <ApplicationState>req.server.app;

        return this.projectService.getAll(branch, token);
    }

    invalidateCaches = async (req: Request) => {
        const {branch} = req.params;
        return await this.projectService.invalidateProjectsCache(branch);
    }

    getHistory = (req: Request) => {
        const {vcs, username, project, branch} = req.params;
        const {limit, token} = <ApplicationState>req.server.app;

        return this.projectService.getHistoryData(vcs, username, project, branch, token, limit);
    }
}