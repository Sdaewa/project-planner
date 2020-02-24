class ToolTip {

    constructor(closeNotFunc) {
        this.closeNot = closeNotFunc;
    }

    closeTooltip = () => {
        this.detach();
        this.closeNot();

    }

    detach() {
        this.element.remove();
        // this.element.parentElement.removeChild(this.element);
    }

    attach() {
        console.log('ToolTip...');
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'card';
        tooltipEl.textContent = 'TEST';
        tooltipEl.addEventListener('click', this.closeTooltip);
        this.element = tooltipEl;
        document.body.append(tooltipEl);
    }
};

class ProjectItem {

    hasActiveTooltip = false;

    constructor(id, updateProjectListsFunc, type) {
        this.id = id;
        this.updateProjectLists = updateProjectListsFunc
        this.connectSwitchBtn();
        this.connectMoreInfoBtn(type);
    }

    showMoreInfo() {
        if (this.hasActiveTooltip) {
            return;
        }
        const tooltip = new ToolTip(() => {
            this.hasActiveTooltip = false
        });
        tooltip.attach();

        this.hasActiveTooltip = true;
    }

    connectMoreInfoBtn() {
        const projectItemEl = document.getElementById(this.id);
        const moreInfoBtn = projectItemEl.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfo);
    }

    connectSwitchBtn(type) {
        const projectItemEl = document.getElementById(this.id);
        let switchBtn = projectItemEl.querySelector('button:last-of-type');
        switchBtn = DOMHelper.clearEventListener(switchBtn);
        switchBtn.textContent = type === 'active' ? 'Finish' : 'Activate';
        switchBtn.addEventListener('click', this.updateProjectLists.bind(null, this.id));
    }

    update(updateProjectListsFunc, type) {
        this.updateProjectLists = updateProjectListsFunc;
        this.connectSwitchBtn(type);
    }
};

class DOMHelper {

    static clearEventListener(element) {
        const clonedEl = element.cloneNode(true);
        element.replaceWith(clonedEl);
        return clonedEl;
    }

    static moveElement(elementId, newDestinationSelector) {
        const element = document.getElementById(elementId);
        const destinationElement = document.querySelector(newDestinationSelector);
        destinationElement.append(element);
    }
}
class ProjectList {

    projects = [];

    constructor(type, ) {
        this.type = type;
        const prjItems = document.querySelectorAll(`#${type}-projects li`);
        // console.log(prjItems);
        for (const prjItem of prjItems) {
            this.projects.push(new ProjectItem(prjItem.id, this.switchProject.bind(this), this.type));
        }
        console.log(this.projects);
    }

    setSwitchHandlerFunction(switchHandlerFunc) {
        this.switchHandler = switchHandlerFunc;

    }

    addProject(project) {
        // console.log(this);
        this.projects.push(project);
        DOMHelper.moveElement(project.id, `#${this.type}-projects ul`);
        project.update(this.switchProject.bind(this), this.type);
    }

    switchProject(projectId) {
        // console.log(this.projects.find(p => p.id === projectId));
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