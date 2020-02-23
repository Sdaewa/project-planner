class ToolTip {

};

class ProjectItem {
    constructor(id) {
        this.id = id;
        this.connectSwitchBtn();
        this.connectMoreInfoBtn();
    }

    connectMoreInfoBtn() {

    }
    connectSwitchBtn() {
        const projectItemEl = document.getElementById(this.id);
        const switchBtn = projectItemEl.querySelector('button:last-of-type');
    }
};

class ProjectList {
    projects = [];
    constructor(type) {
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prjItems);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id));
        }
        console.log(this.projects);
    }
};

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
    }
};

App.init();