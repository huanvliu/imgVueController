import glob from 'glob';
import path from 'path';
import ImgModel from '../model/imgModel';

export default class ImgMetaLoad {
    public static load() {
        let imgs = glob.sync(path.resolve(__dirname, '../public/img/*.*{png,jpg}'));
        imgs.forEach(async item => {
            let filename = path.basename(item);
            let isExs = await ImgModel.find({ name: filename });
            if (isExs.length) {
                //console.log(`${filename} 已经存在`);
                return;
            }
            await ImgModel.insertMany({ name: filename });
        });
    }
}