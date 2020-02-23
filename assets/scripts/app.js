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
        switchBtn.addEventListener('click', )
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

    addProject() {

    }
    switchProject(projectId) {
        const projeIndex = this.projects.findIndex(p => p.id === projectId);
        this.projects.splice(projeIndex, 1);
    }
};

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
    }
};

App.init();