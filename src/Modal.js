import { ModalTheme } from './ModalTheme';

export class Modal {
    constructor(settings) {
        this.clickOpenElement = settings.clickOpenElement;
        this.clickCloseElement = settings.clickCloseElement;
        this.modalClass = settings.modalClass;
        this.targetContainer = settings.targetContainer;
        this.html = settings.html;
        this.defaultStyle = false;
        this.modalTheme = undefined;
        this.themes = [];
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
        //document.querySelector(this.clickOpenElement).addEventListener('click', this.openModal.bind(this));
        document.querySelector('body').addEventListener('click', this.toggleModal.bind(this));
    }

    createModal() {
        const modal = document.createElement('div');
        modal.classList.add(this.modalClass.slice(1));
        const container = document.createElement('div');
        container.classList.add('container');
        const close = document.createElement('a');
        close.classList.add('close-modal');
        close.appendChild(document.createTextNode('Close'));
        modal.appendChild(close);
        modal.appendChild(container);
        modal.querySelector('.container').innerHTML = this.html;
        if(this.defaultStyle || this.modalTheme) {
            const styleAttributes = this.styles ? this.styles : this.modalTheme;
            let styles = '';
            for(let s in styleAttributes) {
                styles += `${s}:${styleAttributes[s]};`;
            }

            modal.style.cssText = styles;
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
        if(e.target.classList.contains(this.clickOpenElement.slice(1))) {
            document.querySelector(this.targetContainer).insertAdjacentHTML('afterbegin', this.readyModal.outerHTML);
        } else if (e.target.classList.contains('close-modal')) {
            document.querySelector(this.modalClass).remove();
        }
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