// The root id isn't so major what is it string
const ROOT_ID = 'ext-root-node';
const VISIBLE_MODE = {
    TRUE: 'block',
    FALSE: 'none',
};

function createRootNode() {

    // We need iframe to encapsulation the app from a client window
    const rootNode = document.createElement('iframe');
    // Customise root element
    rootNode.id = ROOT_ID;
    rootNode.src = chrome.runtime.getURL('./content/index.html');
    let isVisible = false;

    // Init app visible
    function setDisplay() {
        if (isVisible) {
            rootNode.style.display = VISIBLE_MODE.TRUE;
        } else {
            rootNode.style.display = VISIBLE_MODE.FALSE;
        }
    }

    // Some helper functions
    function changeVisibilityMode(mode) {
        isVisible = mode;
        setDisplay();
    }

    function toggle() {
        changeVisibilityMode(!isVisible);
        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }

    // Handler for closing popup
    function handleClickOutside(e) {
        if (!rootNode.contains(e.target)) {
            changeVisibilityMode(false);
        }
    }

    setDisplay();

    // Bind chrome actions
    chrome.runtime.onMessage.addListener(request => {
        console.log(request);
        if (request.message === 'clicked_browser_action') {
            toggle();
        }
    });

    return rootNode;
}

const ROOT_NODE = createRootNode();
document.body.appendChild(ROOT_NODE);