class ToolTip {

};

class ProjectItem {
    constructor(id, updateProjectListsFunc) {
        this.id = id;
        this.updateProjectLists = updateProjectListsFunc
        this.connectSwitchBtn();
        this.connectMoreInfoBtn();
    }

    connectMoreInfoBtn() {

    }
    connectSwitchBtn() {
        const projectItemEl = document.getElementById(this.id);
        const switchBtn = projectItemEl.querySelector('button:last-of-type');
        switchBtn.addEventListener('click', this.updateProjectLists);
    }
};

class ProjectList {
    projects = [];
    constructor(type, ) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prjItems);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this)));
        }
        console.log(this.projects);
    }

    setSwitchHandlerFunction(switchHandlerFunc) {
        this.switchHandler = switchHandlerFunc;

    }
    addProject() {
        console.log(this);
    }
    switchProject(projectId) {
        this.switchHandler(this.projects.find(p => p.id === projectId));
        this.projects - this.projects.filter(p => p.id !== projectId);
        // const projeIndex = this.projects.findIndex(p => p.id === projectId);
        // this.projects.splice(projeIndex, 1);
    }
};

class App {
    static init() {
        const activeProjectList = new ProjectList('active');
        const finishedProjectList = new ProjectList('finished');
        activeProjectList.setSwitchHandlerFunction(finishedProjectList.addProject.bind(finishedProjectList));
        finishedProjectList.setSwitchHandlerFunction(activeProjectList.addProject.bind(activeProjectList));
    }
};

App.init();