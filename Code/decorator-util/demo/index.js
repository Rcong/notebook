import { injectFunc } from './index';

class View {

    @injectFunc((point, fm) => console.info(point, fm))
    click(point, fm){
        console.info(`click point: ${point}、fm: ${fm}`)
    }

}

const view = new View();
view.click('111.222', '123');

