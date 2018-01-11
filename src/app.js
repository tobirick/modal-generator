import { Modal } from './Modal';


const html = document.createElement('div');
html.appendChild(document.createTextNode('test test test'));

const modalSettings= {
    modalClass: '.modalClassTest',
    targetContainer: '#content',
    html,
    closeOnClickOutSide: true
};
const testModal = new Modal(modalSettings);
const styles = {
    'color': '#222',
    'background-color': '#eee',
    'position': 'absolute',
    'left': 0,
    'top': 0,
    'width': '65%',
    'height': '50%',
    'left': '50%',
    'top': '50%',
    'transform': 'translate(-50%, -50%)'
}

testModal.createTheme('test', styles)
    .useTheme('test');

testModal.openModal();

/*
TODO:
- useOverlay ( true / false )
- overlayStyles
*/
