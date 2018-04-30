import * as tl from "vsts-task-lib/task";
import { IExecOptions, IExecSyncResult, ToolRunner } from 'vsts-task-lib/toolrunner';

enum Options {
    LastTag = "last-tag",
    Between = "between"
}

class ChangelogGenerator {

    private fromRev: string = "";
    private toRev: string = "HEAD";
    private pretty: string = "";
    private includeMerges: boolean = false;
    private dateFormat: string = "";

    private workingFolder: string;

    constructor() {
        this.workingFolder = tl.getVariable('System.DefaultWorkingDirectory');
        console.log(this.workingFolder);
        let option = tl.getInput("option", true) as Options;
        switch (option) {
            case Options.LastTag: {
                this.fromRev = this.getLastTag();
                this.toRev = "HEAD";
            }
            break;
            case Options.Between: {
                this.fromRev = tl.getInput("from_rev", true);
                this.toRev = tl.getInput("to_rev", true);
            }
            break;
        }
        this.pretty = tl.getInput("pretty", false);
        this.dateFormat = tl.getInput("date_format", false);
        this.includeMerges = tl.getBoolInput("include_merges", true);
    }

    public async run() {
        try {
            tl.setVariable("CHANGELOG", this.getChangelog());
            tl.setResult(tl.TaskResult.Succeeded, "Changelog was generated and saved to $(<Task>.CHANGELOG) variable");
        } catch (err) {
            tl.setResult(tl.TaskResult.Failed, tl.loc('TaskFailed', err.message));
        }
    }

    private getChangelog(): string {
        let args = ["-C", this.workingFolder, "log"];
        if (this.fromRev !== "") {
            args.push(this.fromRev + ".." + this.toRev);
        }
        if (!this.includeMerges) {
            args.push("--no-merges");
        }
        if (this.dateFormat !== null && this.dateFormat !== "") {
            args.push(`--date=${this.dateFormat}`);
        }
        if (this.pretty !== null && this.pretty !== "") {
            args.push(`--pretty=${this.pretty}`);
        }
        let res = this.execGit(args);
        if (res.code !== 0) {
            tl.error(`Could not get changelog: ${res.stderr}`);
        }
        return res.stdout;
    }

    private getLastTag(): string {
        let res = this.execGit(["-C", this.workingFolder, "describe", "--abbrev=0", "--tags"]);
        return res.stdout.trim();
    }

    execGit(gitArgs: string[], options?: IExecOptions): IExecSyncResult {
        let gitTool =  new ToolRunner(tl.which("git", true));
        gitTool.arg(gitArgs);
        options = options || <IExecOptions>{};
        try {
            let obj = gitTool.execSync(options);
            return obj;
        }
        catch (err) {
            tl.debug('execGit failed');
            tl.setResult(tl.TaskResult.Failed, tl.loc('GitFailed', err.message));
        }
        return;
    }
}

async function run() {
    let generator = new ChangelogGenerator();
    await generator.run();
}

run();