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
        /*
        this.themes['dark'] = {
            'color': 'red',
            'background-color': 'blue'
        };
        this.themes['white'] = {
            'color': 'white',
            'background-color': 'black'
        }
        */

        this.setEventListeners();
    }

    setEventListeners() {
        this.clickCloseElement && document.querySelector(this.clickCloseElement).addEventListener('click', this.closeModal.bind(this));
        document.querySelector('body').addEventListener('click', this.toggleModal.bind(this));

        /*
        document.querySelector(this.modalClass).addEventListener('click', (e) => {
            e.stopPropagation();
        });
        */

        if(this.closeOnClickOutSide) {
            document.querySelector('body').addEventListener('click', (e) => {
                if(this.modalOpen && !e.target.classList.contains(this.modalClass.slice(1)) && !e.target.classList.contains(this.clickOpenElement && this.clickOpenElement.slice(1))) {
                    this.closeModal();
                }
            });
        }
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

    /*
    openModal() {
        try {
            document.querySelector(this.targetContainer).insertAdjacentHTML('afterbegin', this.readyModal.outerHTML);
        } catch (e) {
            throw new Error("Please use the function createModal if you set no theme or styles");
        }
    }

    closeModal(e) {
        console.log(e.target);
        try {
            document.querySelector(this.modalClass).remove();
        } catch (e) {
            throw new Error("Please use the function createModal if you set no theme or styles");
        }
    }
    */
    toggleModal(e) {
        if(e.target.classList.contains(this.clickOpenElement && this.clickOpenElement.slice(1))) {
            document.querySelector(this.targetContainer).insertAdjacentHTML('afterbegin', this.readyModal.parentNode.outerHTML);
            this.modalOpen = true;
        } else if (e.target.classList.contains('close-modal')) {
            document.querySelector(this.modalClass).parentNode.remove();
            this.modalOpen = false;
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