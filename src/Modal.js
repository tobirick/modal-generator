import { ModalTheme } from './ModalTheme';

export class Modal {
    constructor(settings) {
        this.clickOpenElement = settings.clickOpenElement || undefined;
        this.clickCloseElement = settings.clickCloseElement || undefined;
        this.modalClass = settings.modalClass;
        this.targetContainer = settings.targetContainer;
        this.html = typeof settings.html === 'object' ? settings.html.outerHTML : settings.html;
        this.closeOnClickOutSide = settings.closeOnClickOutSide || false;
        this.defaultStyle = false;
        this.modalTheme = undefined;
        this.themes = [];
        this.modalOpen = false;
        this.overlayStyles = {
            'z-index': 9,
            'background': 'rgba(37,50,81,0.4)',
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'right': 0,
            'bottom': 0
        }

        this.setEventListeners();
    }

    setEventListeners() {

        if(this.closeOnClickOutSide) {
            document.querySelector('body').addEventListener('click', (e) => {
                const modal = document.querySelector(this.modalClass);
                if(this.modalOpen && e.target !== modal && !isChildOf(e.target, modal )) {
                    this.closeModal();
                }
            });
        }
        this.clickCloseElement && document.querySelector(this.clickCloseElement).addEventListener('click', this.closeModal.bind(this));
        document.querySelector('body').addEventListener('click', this.toggleModal.bind(this));
    }

    createModal() {
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        overlay.style.cssText = makeStyle(this.overlayStyles);
        const modal = document.createElement('div');
        modal.classList.add(this.modalClass.slice(1));
        const container = document.createElement('div');
        container.classList.add('container');
        const close = document.createElement('a');
        close.classList.add('close-modal');
        close.appendChild(document.createTextNode('Close'));
        overlay.appendChild(modal);
        modal.appendChild(close);
        modal.appendChild(container);
        modal.querySelector('.container').innerHTML = this.html;
        if(this.defaultStyle || this.modalTheme) {
            const styleAttributes = this.styles ? this.styles : this.modalTheme;
            modal.style.cssText = makeStyle(styleAttributes);
        }
        this.readyModal = modal;
    }

    toggleModal(e) {
        if(e.target.classList.contains(this.clickOpenElement && this.clickOpenElement.slice(1))) {
            this.openModal();
        } else if (e.target.classList.contains('close-modal')) {
            this.closeModal();
        }
    }

    closeModal() {
        document.querySelector(this.modalClass).parentNode.remove();
        this.modalOpen = false;
    }

    openModal() {
        document.querySelector(this.targetContainer).insertAdjacentHTML('afterbegin', this.readyModal.parentNode.outerHTML);
        this.modalOpen = true;
    }

    setDefaultStyle(styles) {
        if (styles) {
            this.defaultStyle = true;
            this.styles = styles;
            this.createModal();
        }
        return this;
    }

    useTheme(theme) {
        if(this.defaultStyles) {
            throw new Error("You already used the function setDefaultStyles");
            return;
        }
        this.modalTheme = this.themes[theme];
        this.createModal();
        
        return this;
    }

    createTheme(themeName, styles) {
        const theme = new ModalTheme(themeName, styles);
        this.themes[theme.themeName] = theme.styles;
        return this;
    }
}

const makeStyle = (styles) => Object.keys(styles).reduce((prev, key) => prev += `${key}:${styles[key]};`,'');

const isChildOf = (child, parent) => {
    if (child.parentNode === parent) {
        return true;
    } else if (child.parentNode === null) {
        return false;
    } else {
        return isChildOf(child.parentNode, parent);
    }
}