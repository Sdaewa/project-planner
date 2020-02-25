class Component {

    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
            this.hostElement = document.getElementById(hostElementId);
        } else {
            this.hostElement = document.body;
        }
        this.insertBefore = insertBefore;
    }

    detach() {
        if (this.element) {
            this.element.remove();
        }
    }

    attach() {
        // console.log('ToolTip...');
        this.hostElement.insertAdjacentElement(this.insertBefore ? 'beforebegin' : 'beforeend', this.element);
    }
};

class ToolTip extends Component {

    constructor(closeNotFunc, text, hostElementId) {
        super(hostElementId);
        this.closeNot = closeNotFunc;
        this.text = text;
        this.render();
    }

    closeTooltip = () => {
        this.detach();
        this.closeNot();
    }

    render() {
        const tooltipEl = document.createElement('div');
        tooltipEl.className = 'card';
        const tooltipTemplate = document.getElementById('tooltip');
        const tooltipBody = document.importNode(tooltipTemplate.content, true);
        tooltipBody.querySelector('p').textContent = this.text;
        tooltipEl.append(tooltipBody);
        // console.log(this.hostElementId.getBoundingClientRect());
        const hostElpositionLeft = this.hostElement.offsetLeft;
        const hostElpositionTop = this.hostElement.offsetTop;
        const hostElpositionHeight = this.hostElement.clientHeight;
        const parentElementScroll = this.hostElement.parentElement.scrollTop;

        const x = hostElpositionLeft + 20;
        const y = hostElpositionTop + hostElpositionHeight - parentElementScroll - 10;

        tooltipEl.style.position = 'absolute';
        tooltipEl.style.left = x + 'px';
        tooltipEl.style.top = y + 'px';

        tooltipEl.addEventListener('click', this.closeTooltip);
        this.element = tooltipEl;
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
        const projectElement = document.getElementById(this.id);
        const tooltipText = projectElement.dataset.extraInfo;
        console.log(projectElement.dataset);
        const tooltip = new ToolTip(() => {
            this.hasActiveTooltip = false
        }, tooltipText, this.id);
        tooltip.attach();

        this.hasActiveTooltip = true;
    }

    connectMoreInfoBtn() {
        const projectItemEl = document.getElementById(this.id);
        const moreInfoBtn = projectItemEl.querySelector('button:first-of-type');
        moreInfoBtn.addEventListener('click', this.showMoreInfo.bind(this));
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
        element.scrollIntoView({
            behavior: "smooth"
        });
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

        // const someScript = document.createElement('script');
        // someScript.textContent = 'alert("TEST")';
        // document.head.append(someScript);
    }
};

App.init();