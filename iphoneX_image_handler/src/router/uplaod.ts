import Koa from "koa";
import { Controller, Http } from '../decorator/http';
import Redis from '../service/redis';
import { ResSuccess, ResError } from '../util/response';
import appService from '../service/Service';
import log from '../util/log';
import fs from 'fs';
import ImgModel from '../model/imgModel';
import imgMeta from '../service/imgMetaLoad';

@Controller("/api/web")
export default class ExampleRouter {

    @Http({
        url: "/upload",
        method: "post",
        validate: {
            name: {
                type: String,
                required: true
            }
        }
    })
    async upload(ctx: Koa.Context) {
        let {name, ...express} = ctx.request.body;
        fs.appendFileSync(`./jsons/${name}.json`, `${JSON.stringify(express)} \n`);
        await ImgModel.update({ name: name }, { $set: { status: 1 } });
        ctx.body = new ResSuccess();
    }

    @Http({
        url: "/reset",
        method: "post",
        validate: {
            name: {
                type: String,
                required: true
            }
        }
    })
    async reset(ctx: Koa.Context) {
        let data = ctx.request.body;
        await ImgModel.update({ name: data.name }, { $set: { status: 0 } });
        ctx.body = new ResSuccess();
    }

    @Http({
        url: "/resetAll",
        method: "post",
        validate: {
         
        }
    })
    async resetAll(ctx: Koa.Context) {
        await ImgModel.remove({});
        await imgMeta.load();
        ctx.body = new ResSuccess();
    }

    @Http({
        url: "/load",
        method: "post",
        validate: {
            
        }
    })
    async load(ctx: Koa.Context) {
        imgMeta.load();
        ctx.body = new ResSuccess();
    }
}
