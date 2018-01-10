import { Modal } from './Modal';

const modalSettings= {
    clickOpenElement: '.open-modal',
    modalClass: '.modalClassTest',
    targetContainer: '#content',
    html: '<h1>Das ist ein Test</h1>'
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