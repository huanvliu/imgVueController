import { prop, Typegoose, ModelType, InstanceType, arrayProp, index } from 'typegoose';
import * as mongoose from 'mongoose';

class Img extends Typegoose {

    @prop({ index: true, unique: true })
    name: string

    @prop({ default: 0 })
    status: number
}

const ImgModel = new Img().getModelForClass(Img, { schemaOptions: { timestamps: true } });

export default ImgModel;